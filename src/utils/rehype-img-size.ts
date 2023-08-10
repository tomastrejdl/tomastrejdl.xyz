import path from 'path'
import { visit } from 'unist-util-visit'
import sizeOf from 'image-size'

interface Options {
  dir: string
}
export type { Options }

export default setImageSize

/**
 * Handles:
 * "//"
 * "http://"
 * "https://"
 * "ftp://"
 */
const absolutePathRegex = /^(?:[a-z]+:)?\/\//

function getImageSize(src: string, dir: string) {
  if (absolutePathRegex.exec(src)) {
    return
  }
  // Treat `/` as a relative path, according to the server
  const shouldJoin = !path.isAbsolute(src) || src.startsWith('/')

  if (dir && shouldJoin) {
    src = path.join(dir, src)
  }
  return sizeOf(src)
}

function setImageSize(options: Options) {
  const opts = options || {}
  const dir = opts.dir
  return transformer

  function transformer(tree: any, file: any) {
    visit(tree, 'element', visitor)
    function visitor(node: any) {
      if (node.tagName === 'img') {
        const src = node.properties.src
        const dimensions = getImageSize(src, dir)
        if (dimensions) {
          node.properties.width = dimensions.width
          node.properties.height = dimensions.height
        }
      }
    }
  }
}
