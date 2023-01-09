import { getPlaiceholder } from 'plaiceholder'
import { type Node } from 'unist'
import { visit } from 'unist-util-visit'

type ImageNode = {
  type: 'element'
  tagName: 'img'
  properties: {
    src: string
    height?: number
    width?: number
    blurDataURL?: string
    placeholder?: 'blur' | 'empty'
  }
}

function isImageNode(node: Node): node is ImageNode {
  const img = node as ImageNode
  return (
    img.type === 'element' &&
    img.tagName === 'img' &&
    img.properties &&
    typeof img.properties.src === 'string'
  )
}

async function addProps(node: ImageNode): Promise<void> {
  node.properties.placeholder = 'blur'
  node.properties.blurDataURL = (
    await getPlaiceholder(node.properties.src)
  ).base64
}

const rehypeImageBlurData = () => {
  return async function transformer(tree: Node): Promise<Node> {
    const images: ImageNode[] = []

    visit(tree, 'element', (node) => {
      if (isImageNode(node)) {
        images.push(node)
      }
    })

    for (const image of images) await addProps(image)

    return tree
  }
}

export default rehypeImageBlurData
