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
import sizeOf from 'image-size'
import rehypeFigure from 'rehype-figure'

const CONTENT_TYPES = ['blog', 'projects'] as const
type ContentType = typeof CONTENT_TYPES[number]

const notion = new Client({ auth: env.NOTION_TOKEN })
const n2m = new NotionToMarkdown({ notionClient: notion })

const tagsSchema = z.object({ name: z.string() }).array().min(1)
const richTextSchema = z.object({ plain_text: z.string() }).array().min(1)
const dateSchema = z.object({
  start: z.string(),
  end: z.string().nullish(),
  time_zone: z.string().nullish(),
})

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
    'Project duration': z.object({ date: dateSchema }),
  }),
})

export const getAllPublished = async (contentType: ContentType) => {
  const items = await notion.databases.query({
    database_id: env.NOTION_DATABASE_ID,
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
        direction: 'ascending',
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

  const coverImage = (await fetchImages([item.cover.file.url])).at(0)

  if (!coverImage) throw Error('No cover image found for item: ' + item.id)

  return {
    id: item.id,
    title: item.properties.Name.title.at(0)?.plain_text,
    cover: {
      url: coverImage.newUrl,
      width: coverImage.width,
      height: coverImage.height,
      alt:
        item.properties.Name.title.at(0)?.plain_text + ' article cover image',
    },
    tags: getTags(item.properties.Tags.multi_select),
    description: item.properties.Description.rich_text.at(0)?.plain_text,
    created_time: getToday(item.created_time),
    last_edited_time: getToday(item.last_edited_time),
    slug: item.properties.Slug.rich_text.at(0)?.plain_text,
    projectName: item.properties.Slug.rich_text
      .at(0)
      ?.plain_text.split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
    projectDuration: item.properties['Project duration'].date,
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
    database_id: env.NOTION_DATABASE_ID,
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
    throw Error(`Item ${slug} not found in database ${env.NOTION_DATABASE_ID}`)

  const validatedItem = itemSchema.parse(item)

  const metadata = await getPageMetaData(validatedItem)
  const mdblocks = await n2m.pageToMarkdown(item.id)
  let mdString = n2m.toMarkdownString(mdblocks)

  const getImagesFromBlock = (block: MdBlock): string[] => {
    const imageUrls: string[] = []
    if (block.type === 'image') {
      imageUrls.push(
        ...block.parent
          .split('\n')
          .map((p) => p.slice(block.parent.indexOf('(') + 1, -1))
          .filter((url) => url.length > 5)
      )
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

  const mdxSource = await serialize(mdString, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeAutolinkHeadings,
        rehypeCodeTitles,
        rehypeSlug,
        [rehypeImgSize, { dir: 'public' }],
        rehypeFigure,
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

  const urls: Array<{
    oldUrl: string
    newUrl: string
    width: number
    height: number
  }> = []

  for (const url of imageUrls) {
    const imageFileNameFromUrl = url.slice(97, url.indexOf('?'))
    const filePath = join(
      process.cwd(),
      'public',
      '_images',
      imageFileNameFromUrl
    )

    if (
      !readdirSync(join(process.cwd(), 'public', '_images')).includes(
        imageFileNameFromUrl
      )
    ) {
      const res = await fetch(url)

      if (!res.ok) throw Error('Fetch error')
      const contentType = res.headers?.get('Content-Type')?.split('/')
      if (
        contentType == undefined ||
        contentType[0] == undefined ||
        contentType[1] == undefined
      )
        throw Error('Wront Content-Type')

      const [fileType] = contentType
      if (fileType !== 'image') throw Error('File is not an image')

      await new Promise((resolve) => {
        res.body?.pipe(createWriteStream(filePath)).on('close', resolve)
      })
    }
    const { width, height } = sizeOf(filePath)

    if (!width || !height)
      throw Error('Error: Could not get size of image' + imageFileNameFromUrl)

    urls.push({
      oldUrl: url,
      newUrl: `/_images/${imageFileNameFromUrl}`,
      width,
      height,
    })
  }

  return urls
}
