export default function MagicText({ children }: React.PropsWithChildren) {
  return (
    <span className="group relative inline-block overflow-visible leading-tight">
      <span className="inline-block transition duration-300 will-change-transform group-hover:scale-105 group-hover:opacity-0">
        {children}
      </span>
      <span
        className="magic-text absolute inset-0 z-10 block overflow-visible opacity-0 transition duration-300 will-change-transform group-hover:scale-105 group-hover:opacity-100"
        aria-hidden
      >
        {children}
      </span>
    </span>
  )
}
