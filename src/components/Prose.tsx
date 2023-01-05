export default function Prose({
  children,
  as = 'div',
}: React.PropsWithChildren<{ as?: React.ElementType }>) {
  const RenderAs = as
  return (
    <RenderAs className="prose prose-neutral mx-auto w-full max-w-prose prose-h1:text-2xl prose-h2:text-xl prose-h2:font-medium prose-h3:text-lg prose-h3:font-medium prose-a:underline prose-a:decoration-dotted prose-a:decoration-2 prose-a:underline-offset-4 hover:prose-a:text-neutral-500 dark:prose-invert dark:prose-a:border-current dark:hover:prose-a:text-neutral-300 sm:prose-h1:text-3xl lg:prose-h1:text-4xl">
      {children}
    </RenderAs>
  )
}
