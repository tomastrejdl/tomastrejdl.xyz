import { Float } from '@headlessui-float/react'
import { Popover } from '@headlessui/react'
import { useState, type ReactNode } from 'react'

export default function Tooltip({
  children,
  className,
  onClick,
  tooltipContent,
}: React.PropsWithChildren<{
  className: string
  tooltipContent: string | ReactNode
  onClick: () => void
}>) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Popover
      as="div"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Float
        show={isOpen}
        shift={true}
        offset={5}
        flip={true}
        arrow={true}
        placement="top"
        enter="transition ease-out delay-300"
        enterFrom="opacity-0 translate-y-10 scale-50"
        enterTo="opacity-100 translate-y-0 scale-100"
        leave="transition ease-in"
        leaveFrom="opacity-100 translate-y-0 scale-100"
        leaveTo="opacity-0 translate-y-10  scale-50"
      >
        <Popover.Button
          onClick={onClick}
          className={`flex items-center justify-center rounded-md  focus:outline-none  ${className} ${
            isOpen && 'bg-neutral-100 dark:bg-neutral-800'
          }`}
        >
          {children}
        </Popover.Button>
        <Popover.Panel className="m-2 rounded-md bg-neutral-100 px-4 py-2 dark:bg-neutral-800">
          <Float.Arrow className="absolute h-5 w-5 rotate-45  bg-neutral-100 dark:bg-neutral-800"></Float.Arrow>
          <div className="relative">{tooltipContent}</div>
        </Popover.Panel>
      </Float>
    </Popover>
  )
}
