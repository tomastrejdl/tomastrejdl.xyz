import { Client } from '@notionhq/client'
import { serialize } from 'next-mdx-remote/serialize'
import { NotionToMarkdown } from 'notion-to-md'
import type { MdBlock } from 'notion-to-md/build/types'
import { z } from 'zod'
import { env } from '../../env/server.mjs'
import remarkGfm from 'remark-gfm'
import { createWriteStream, mkdirSync, readdirSync } from 'fs'
import fetch from 'node-fetch'
import { join } from 'path'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeSlug from 'rehype-slug'
import rehypeImgSize from 'rehype-img-size'
import sizeOf from 'image-size'
import rehypeFigure from 'rehype-figure'
import {
  fetchFigmaImages,
  getFigmaImageUrlsFromNotionMDBlocks,
  getFileAndNodeIdFromFigmaUrl,
  getImagesFromFigma,
} from './figma'
import rehypeToc from '@jsdevtools/rehype-toc'
import { getPlaiceholder } from 'plaiceholder'
import rehypeImageBlurData from '../../utils/rehype-image-blur-data'
import readingTime from 'reading-time'

const CONTENT_TYPES = ['blog', 'projects'] as const
type ContentType = typeof CONTENT_TYPES[number]

export interface FetchedImage {
  oldUrl: string
  newUrl: string
  width: number
  height: number
}

const notion = new Client({ auth: env.NOTION_TOKEN })
const n2m = new NotionToMarkdown({ notionClient: notion })

const tagsSchema = z.object({ name: z.string() }).array().min(1)
const richTextSchema = z
  .object({
    plain_text: z.string(),
    annotations: z.object({
      bold: z.boolean(),
      italic: z.boolean(),
      strikethrough: z.boolean(),
      underline: z.boolean(),
      code: z.boolean(),
      color: z.enum([
        'default',
        'gray',
        'brown',
        'orange',
        'yellow',
        'green',
        'blue',
        'purple',
        'pink',
        'red',
        'gray_background',
        'brown_background',
        'orange_background',
        'yellow_background',
        'green_background',
        'blue_background',
        'purple_background',
        'pink_background',
        'red_background',
      ]),
    }),
  })
  .array()
  .min(1)
const dateSchema = z.object({
  start: z.string(),
  end: z.string().nullish(),
  time_zone: z.string().nullish(),
})

const itemSchema = z.object({
  id: z.string(),
  created_time: z.string().datetime(),
  last_edited_time: z.string().datetime(),
  cover: z.object({ file: z.object({ url: z.string() }) }).nullish(),
  properties: z.object({
    Published: z.object({ checkbox: z.boolean() }),
    Name: z.object({ title: richTextSchema }),
    Slug: z.object({ rich_text: richTextSchema }),
    Description: z.object({ rich_text: richTextSchema }),
    Type: z.object({ select: z.object({ name: z.enum(CONTENT_TYPES) }) }),
    Tags: z.object({ multi_select: tagsSchema }),
    'Project duration': z.object({ date: dateSchema }),
    Role: z.object({ rich_text: richTextSchema }),
    'AI Summary': z.object({ rich_text: richTextSchema }),
    'Cover image Figma Node URL': z.object({ url: z.string() }),
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
  const { fileId, nodeId } = getFileAndNodeIdFromFigmaUrl(
    item.properties['Cover image Figma Node URL'].url
  )
  const renderedCoverImageURL = (
    await getImagesFromFigma({ [fileId]: [nodeId] })
  ).at(0)

  if (!renderedCoverImageURL)
    throw Error('No cover image Figma Node URL found for item: ' + item.id)

  item.properties['Cover image Figma Node URL'].url
  const coverImage = (await fetchFigmaImages([renderedCoverImageURL])).at(0)

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
      blurDataURL: (await getPlaiceholder(coverImage.newUrl)).base64,
    },
    tags: getTags(item.properties.Tags.multi_select),
    description: {
      plainText: joinRichText(item.properties.Description.rich_text),
      mdx: await serializeMd(
        annotateAndJoin(item.properties.Description.rich_text)
      ),
    },
    created_time: getToday(item.created_time),
    last_edited_time: getToday(item.last_edited_time),
    slug: joinRichText(item.properties.Slug.rich_text),
    projectName: joinRichText(item.properties.Slug.rich_text).replaceAll(
      '-',
      ' '
    ),
    projectDuration: item.properties['Project duration'].date,
    role: joinRichText(item.properties.Role.rich_text),
    aiSummary: joinRichText(item.properties['AI Summary'].rich_text),
  }
}

export type NotionCMSItemMedatada = Awaited<ReturnType<typeof getPageMetaData>>

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
  const itemReadingTime = readingTime(mdString)

  const getImagesFromBlock = (block: MdBlock): string[] => {
    const imageUrls: string[] = []
    if (block.type === 'image') {
      imageUrls.push(
        ...block.parent
          .split('\n')
          .map((p) => {
            const urlFromMd = p.split('](').at(1)?.slice(0, -1)
            if (urlFromMd) return urlFromMd
            else throw new Error('No url found in image md block')
          })
          .filter((url) => url.length > 5)
      )
    }
    if (block.children)
      imageUrls.push(
        ...block.children.map((child) => getImagesFromBlock(child)).flat()
      )

    return imageUrls
  }

  // Images
  const imageUrls = mdblocks.map((block) => getImagesFromBlock(block)).flat()
  const newImageUrls = await fetchImages(imageUrls)
  newImageUrls.forEach(
    ({ oldUrl, newUrl }) => (mdString = mdString.replace(oldUrl, newUrl))
  )

  // Figma embeds
  const { figmaImageUrls, originalLinks } =
    await getFigmaImageUrlsFromNotionMDBlocks(mdblocks)

  // FIXME: This is a hotfix for the Figma API, which seems to return nodeIds in two diffferent formats
  // The nodeId should start with two digits followed by a colon, but sometimes it's two digits followed by a dash
  const hotfixedOriginalLinks = []
  for (const originalLink of originalLinks) {
    hotfixedOriginalLinks.push({
      ...originalLink,
      nodeId: originalLink.nodeId.replace(/-/g, ':'),
    })
  }

  for (const { renderedImageUrl, nodeId, nodeName } of figmaImageUrls) {
    mdString = mdString.replace(
      `[link_preview](${
        hotfixedOriginalLinks.find((link) => link.nodeId === nodeId)
          ?.originalUrl
      })`,
      `![${nodeName}](${renderedImageUrl})`
    )
  }

  const newFigmaImageUrls = await fetchFigmaImages(figmaImageUrls)

  newFigmaImageUrls.forEach(
    ({ oldUrl, newUrl }) => (mdString = mdString.replace(oldUrl, newUrl))
  )

  const mdxSource = await serializeMd(mdString)

  return {
    metadata: {
      ...metadata,
      itemReadingTime,
    },
    mdxSource,
  }
}

async function fetchImages(imageUrls: string[]) {
  mkdirSync(join(process.cwd(), 'public', '_images'), { recursive: true })

  const urls: FetchedImage[] = []

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
        throw Error('Wrong Content-Type')

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

function serializeMd(mdString: string) {
  return serialize(mdString, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeCodeTitles,
        [rehypeImgSize, { dir: 'public' }],
        rehypeFigure,
        [rehypeToc, { headings: ['h2'] }],
        rehypeImageBlurData,
      ],
      development: false, // FIXME: When this resolves https://github.com/hashicorp/next-mdx-remote/issues/307
    },
  })
}

function annotateAndJoin(richText: z.infer<typeof richTextSchema>): string {
  return richText
    .map((richTextBlock) =>
      n2m.annotatePlainText(richTextBlock.plain_text, richTextBlock.annotations)
    )
    .join('')
}

function joinRichText(richText: z.infer<typeof richTextSchema>): string {
  return richText.map((richTextBlock) => richTextBlock.plain_text).join('')
}
