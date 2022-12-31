declare module 'rehype-figure' {
  interface RehypeFigureOptions {
    className?: string
  }

  /**
   *
   * @type {import('unified').Plugin<[RehypeFigureOptions?]|void[], Root>}
   */
  export default function rehypeFigure(
    options?: void | RehypeFigureOptions | undefined
  )
}
