import { Popover } from '@headlessui/react'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export const navigation = [
  // { name: 'About Me', href: '/about' },
  // { name: 'My projects', href: '/projects' },
  // { name: 'Blog', href: '/blog' },
]

export default function Navbar() {
  return (
    <Popover>
      <div className="absolute top-0 left-0 right-0 h-[10vh] w-full px-4 sm:px-6 md:h-20 lg:h-16 lg:px-8">
        <nav
          className="relative flex h-full items-center justify-between"
          aria-label="Global"
        >
          <div className="flex flex-shrink-0 flex-grow items-center md:flex-grow-0">
            <div className="flex w-full items-center justify-between md:w-auto">
              <Link href="/" className="flex items-start gap-2 font-semibold">
                Tomáš Trejdl
              </Link>
              {/* <div className="-mr-2 flex items-center md:hidden">
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-neutral-800 p-2 text-neutral-200 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div> */}
            </div>
          </div>
          {/* <ul className="hidden md:ml-10 md:flex md:space-x-8 md:pr-4 ">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-neutral-300 hover:bg-neutral-700"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul> */}
          <ThemeToggle />
        </nav>
      </div>

      {/* <Transition
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
        >
          <div className="overflow-hidden rounded-lg bg-neutral-800 shadow-md ring-1 ring-black ring-opacity-5">
            <div className="flex items-center justify-between px-5 pt-4">
              <div>Tomáš Trejdl</div>
              <div className="-mr-2">
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-neutral-700 p-2 text-neutral-200 hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
                  <span className="sr-only">Close main menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <ul className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-neutral-200 hover:bg-neutral-700"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Popover.Panel>
      </Transition> */}
    </Popover>
  )
}
