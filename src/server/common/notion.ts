import { Client } from '@notionhq/client'
import { serialize } from 'next-mdx-remote/serialize'
import { NotionToMarkdown } from 'notion-to-md'
import type { MdBlock } from 'notion-to-md/build/types'
import { z } from 'zod'
import { env } from '../../env/server.mjs'
import remarkGfm from 'remark-gfm'
import type { ImageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { createWriteStream, mkdirSync, readdirSync } from 'fs'
import fetch from 'node-fetch'
import { join } from 'path'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeSlug from 'rehype-slug'
import rehypeImgSize from 'rehype-img-size'

const CONTENT_TYPES = ['blog', 'projects'] as const
type ContentType = typeof CONTENT_TYPES[number]

const notion = new Client({ auth: env.NOTION_TOKEN })
const n2m = new NotionToMarkdown({ notionClient: notion })

const tagsSchema = z.object({ name: z.string() }).array().min(1)

const richTextSchema = z.object({ plain_text: z.string() }).array().min(1)

const itemSchema = z.object({
  id: z.string(),
  created_time: z.string().datetime(),
  last_edited_time: z.string().datetime(),
  cover: z.object({ file: z.object({ url: z.string() }) }),
  properties: z.object({
    Published: z.object({ checkbox: z.boolean() }),
    Name: z.object({ title: richTextSchema }),
    Slug: z.object({ rich_text: richTextSchema }),
    Description: z.object({ rich_text: richTextSchema }),
    Type: z.object({ select: z.object({ name: z.enum(CONTENT_TYPES) }) }),
    Tags: z.object({ multi_select: tagsSchema }),
  }),
})

export const getAllPublished = async (contentType: ContentType) => {
  const items = await notion.databases.query({
    database_id: env.DATABASE_ID,
    filter: {
      and: [
        {
          property: 'Type',
          select: {
            equals: contentType,
          },
        },
        {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
      ],
    },
    sorts: [
      {
        property: 'Created time',
        direction: 'descending',
      },
    ],
  })

  const allItems = items.results

  const validatedItems = z.array(itemSchema).parse(allItems)

  return Promise.all(validatedItems.map((item) => getPageMetaData(item)))
}

const getPageMetaData = async (item: z.infer<typeof itemSchema>) => {
  const getTags = (tags: z.infer<typeof tagsSchema>) => {
    const allTags = tags.map((tag) => {
      return tag.name
    })

    return allTags
  }

  const newCoverUrl = (await fetchImages([item.cover.file.url])).at(0)?.newUrl

  return {
    id: item.id,
    title: item.properties.Name.title.at(0)?.plain_text,
    cover: newCoverUrl,
    tags: getTags(item.properties.Tags.multi_select),
    description: item.properties.Description.rich_text.at(0)?.plain_text,
    date: getToday(item.last_edited_time),
    slug: item.properties.Slug.rich_text.at(0)?.plain_text,
  }
}

function getToday(dateString: string) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  let date = new Date()

  if (dateString) {
    date = new Date(dateString)
  }

  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  const today = `${month} ${day}, ${year}`

  return today
}

export const getSingleItem = async (contentType: ContentType, slug: string) => {
  const response = await notion.databases.query({
    database_id: env.DATABASE_ID,
    filter: {
      and: [
        {
          property: 'Type',
          select: {
            equals: contentType,
          },
        },
        {
          property: 'Slug',
          formula: {
            string: {
              equals: slug,
            },
          },
        },
      ],
    },
  })

  const item = response.results[0]
  if (!item)
    throw Error(`Item ${slug} not found in database ${env.DATABASE_ID}`)

  const validatedItem = itemSchema.parse(item)

  const metadata = await getPageMetaData(validatedItem)
  const mdblocks = await n2m.pageToMarkdown(item.id)
  let mdString = n2m.toMarkdownString(mdblocks)

  if (env.NODE_ENV === 'production') {
    const getImagesFromBlock = (block: MdBlock): string[] => {
      const imageUrls: string[] = []
      if (block.type === 'image') {
        imageUrls.push(block.parent.slice(4, -1))
      }
      if (block.children)
        imageUrls.push(
          ...block.children.map((child) => getImagesFromBlock(child)).flat()
        )

      return imageUrls
    }

    const imageUrls = mdblocks.map((block) => getImagesFromBlock(block)).flat()

    const newImageUrls = await fetchImages(imageUrls)

    newImageUrls.forEach(
      ({ oldUrl, newUrl }) => (mdString = mdString.replace(oldUrl, newUrl))
    )
  }

  console.log('\nprocess.cwd: ', process.cwd())
  console.log('current dir: ', readdirSync('.'))
  console.log('public dir: ', readdirSync('./public'))
  console.log('_images dir: ', readdirSync('./public/_images'))

  const mdxSource = await serialize(mdString, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeAutolinkHeadings,
        rehypeCodeTitles,
        rehypeSlug,
        [rehypeImgSize, { dir: 'public' }],
      ],
      development: false, // FIXME: When this resolves https://github.com/hashicorp/next-mdx-remote/issues/307
    },
  })

  return {
    metadata,
    mdxSource,
  }
}

export const getChangelogImageSrc = async (blockId: string) => {
  const block = (await notion.blocks.retrieve({
    block_id: blockId,
  })) as ImageBlockObjectResponse

  if (block.type !== 'image') {
    throw new Error('Block is not an image')
  }

  const image = block.image

  if (image.type === 'external') return image.external.url
  else return image.file.url
}

async function fetchImages(imageUrls: string[]) {
  mkdirSync(join(process.cwd(), 'public', '_images'), { recursive: true })

  const promises: Promise<{ oldUrl: string; newUrl: string }>[] = []

  imageUrls.map((url) => {
    promises.push(
      fetch(url).then((res) => {
        if (!res.ok) throw Error('Fetch error')
        const contentType = res.headers?.get('Content-Type')?.split('/')
        if (
          contentType == undefined ||
          contentType[0] == undefined ||
          contentType[1] == undefined
        )
          throw Error('Wront Content-Type')

        const [fileType, fileExtention] = contentType
        if (fileType !== 'image') throw Error('File is not an image')

        const fileName = url.slice(97, url.indexOf(fileExtention) - 1)

        res.body?.pipe(
          createWriteStream(
            join(
              process.cwd(),
              'public',
              '_images',
              `${fileName}.${fileExtention}`
            )
          )
        )

        return {
          oldUrl: url,
          newUrl: `/_images/${fileName}.${fileExtention}`,
        }
      })
    )
  })

  return Promise.all(promises)
}