import * as Figma from 'figma-js'
import { createWriteStream, mkdirSync, readdirSync } from 'fs'
import type { MdBlock } from 'notion-to-md/build/types'
import { join } from 'path'
import { env } from '../../env/server.mjs'
import sizeOf from 'image-size'
import fetch from 'node-fetch'
import type { FetchedImage } from './notion'

// Figma node URL example
// https://www.figma.com/file/gMG1hRWjNISBoUxQBqoxkt/tomastrejdl.xyz?node-id=39%3A2006&t=jBoeq6rPjn01aU1p-4

const figma = Figma.Client({
  personalAccessToken: env.FIGMA_TOKEN,
})

interface RenderedFigmaImage {
  fileId: string
  nodeId: string
  nodeName: string
  figmaFileUrl: string
  renderedImageUrl: string
}

export async function getImagesFromFigma(imageIds: {
  [fileId: string]: string[]
}) {
  const renderedFigmaImages: RenderedFigmaImage[] = []

  for (const [fileId, nodeIds] of Object.entries(imageIds)) {
    const res = await figma.fileImages(fileId, {
      ids: nodeIds,
      format: 'png',
    })
    const images = res.data.images

    // Check for non existing images
    Object.entries(images)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, image]) => image === null)
      .forEach(([nodeId]) => {
        throw new Error(
          `Node ${nodeId} not found in Figma file ${fileId}. Cannot render image.`
        )
      })

    const nodes = (await figma.fileNodes(fileId, { ids: nodeIds })).data.nodes
    const nodeNames = Object.entries(nodes).map(([nodeId, nodeData]) => ({
      nodeId,
      nodeName: nodeData?.document.name,
    }))

    Object.entries(images).forEach(([nodeId, imageUrl]) => {
      renderedFigmaImages.push({
        fileId,
        nodeId,
        nodeName:
          nodeNames.find((node) => node.nodeId === nodeId)?.nodeName ?? '',
        figmaFileUrl: `https://www.figma.com/file/${fileId}?node-id=${nodeId}`,
        renderedImageUrl: imageUrl,
      })
    })
  }
  return renderedFigmaImages
}

export async function getFigmaImageUrlsFromNotionMDBlocks(mdblocks: MdBlock[]) {
  const figmaImageIdsAll: { [fileId: string]: string[] } = {}
  const originalLinksAll: { nodeId: string; originalUrl: string }[] = []

  mdblocks.forEach((block) => {
    const { figmaImageIds, originalLinks } =
      getFigmaImageIdsFromNotionBlock(block)
    for (const [fileId, nodeIds] of Object.entries(figmaImageIds)) {
      if (figmaImageIdsAll[fileId]) figmaImageIdsAll[fileId]?.push(...nodeIds)
      else figmaImageIdsAll[fileId] = nodeIds
    }
    originalLinksAll.push(...originalLinks)
  })

  const figmaImageUrls = await getImagesFromFigma(figmaImageIdsAll)

  return { figmaImageUrls, originalLinks: originalLinksAll }
}

export function getFileAndNodeIdFromFigmaUrl(figmaUrl: URL | string): {
  fileId: string
  nodeId: string
} {
  if (typeof figmaUrl == 'string') figmaUrl = new URL(figmaUrl)

  const fileId = figmaUrl.pathname.split('/')[2]
  const nodeId = figmaUrl.searchParams.get('node-id')

  if (!fileId || !nodeId) throw Error('Figma link is not valid')

  return {
    fileId,
    nodeId,
  }
}

export function getFigmaImageIdsFromNotionBlock(block: MdBlock) {
  const figmaImageIds: { [fileId: string]: string[] } = {}
  const originalLinks: { nodeId: string; originalUrl: string }[] = []
  if (block.type === 'link_preview') {
    const url = new URL(block.parent.slice(block.parent.indexOf('http'), -1))

    if (url.hostname === 'www.figma.com') {
      const { fileId, nodeId } = getFileAndNodeIdFromFigmaUrl(url)
      if (figmaImageIds[fileId]) figmaImageIds[fileId]?.push(nodeId)
      else figmaImageIds[fileId] = [nodeId]

      originalLinks.push({ nodeId, originalUrl: url.toString() })
    }
  }
  if (block.children) {
    block.children.forEach((child) => {
      const imageIdsFromBlock = getFigmaImageIdsFromNotionBlock(child)
      for (const [fileId, nodeIds] of Object.entries(
        imageIdsFromBlock.figmaImageIds
      )) {
        if (figmaImageIds[fileId]) figmaImageIds[fileId]?.push(...nodeIds)
        else figmaImageIds[fileId] = nodeIds
      }
      originalLinks.push(...imageIdsFromBlock.originalLinks)
    })
  }

  return { figmaImageIds, originalLinks }
}

export async function fetchFigmaImages(
  renderedFigmaImages: RenderedFigmaImage[]
) {
  mkdirSync(join(process.cwd(), 'public', '_images'), { recursive: true })

  const urls: FetchedImage[] = []

  for (const { renderedImageUrl, nodeName } of renderedFigmaImages) {
    const imageFileName = nodeName.replaceAll(' ', '_')
    if (imageFileName) {
      const filePath = join(process.cwd(), 'public', '_images', imageFileName)

      if (
        !readdirSync(join(process.cwd(), 'public', '_images')).includes(
          `${imageFileName}.png`
        )
      ) {
        const res = await fetch(renderedImageUrl)

        if (!res.ok) throw Error('Fetch error')

        await new Promise((resolve) => {
          res.body
            ?.pipe(createWriteStream(`${filePath}.png`))
            .on('close', resolve)
        })
      }
      const { width, height } = sizeOf(`${filePath}.png`)

      if (!width || !height)
        throw Error('Error: Could not get size of image' + imageFileName)

      urls.push({
        oldUrl: renderedImageUrl,
        newUrl: `/_images/${imageFileName}.png`,
        width,
        height,
      })
    } else throw Error('Image file name is not valid')
  }

  return urls
}
