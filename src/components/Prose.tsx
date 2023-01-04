export default function Prose({ children }: React.PropsWithChildren) {
  return (
    <div className="prose prose-neutral mx-auto w-full max-w-prose prose-h2:text-xl prose-h2:font-medium prose-h3:text-lg prose-h3:font-medium prose-a:border-b-2 prose-a:border-dotted prose-a:border-current prose-a:no-underline hover:prose-a:text-neutral-500 dark:prose-invert dark:prose-a:border-current dark:hover:prose-a:text-neutral-300">
      {children}
    </div>
  )
}
