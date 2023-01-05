import { Popover, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { CustomLink } from './CustomLink'
import { navigation } from './Navbar'

export default function MobileNavbar({ className }: { className: string }) {
  const router = useRouter()
  const currentRouteSlug = router.asPath.split('/')[1]?.split('#')[0]
  const currentRouteName = navigation.find(
    (item) => item.href === `/${currentRouteSlug}`
  )?.name

  return (
    <Transition
      show={true}
      as="nav"
      appear
      enter="duration-500 delay-500 transition"
      enterFrom="opacity-0 translate-y-40"
      enterTo={`opacity-1 translate-y-0 ${className}`}
    >
      <Popover className="relative flex h-full w-full flex-col">
        {({ open }) => (
          <>
            <Popover.Button className="relative z-20 inline-flex h-14 w-full items-center justify-between rounded-md border border-neutral-300 bg-neutral-200/90 p-4  text-neutral-800 shadow-lg backdrop-blur focus:outline-none dark:border-neutral-700  dark:bg-neutral-700/75 dark:text-neutral-200">
              <span>{currentRouteName}</span>
              <span className="sr-only">Open main menu</span>
              <AnimatedHamburgerMenu open={open} />
            </Popover.Button>
            <Transition
              as={Fragment}
              appear
              enter="duration-150 ease-in-out transition-all"
              enterFrom="opacity-0 translate-y-0 scale-y-0"
              enterTo="opacity-100 -translate-y-16 scale-y-100"
              leave="duration-150 ease-in-out transition-all"
              leaveFrom="opacity-100 -translate-y-16 scale-y-100"
              leaveTo="opacity-0 translate-y- scale-y-0"
            >
              <Popover.Panel
                focus
                className="absolute right-0 bottom-0 left-0 z-10 rounded-md border border-neutral-300 bg-neutral-200/90 p-2 backdrop-blur dark:border-neutral-700 dark:bg-neutral-700/75 md:hidden"
              >
                <ul className="space-y-1 px-2 pt-2 pb-3">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <CustomLink
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-neutral-800 focus:outline-none dark:text-neutral-200"
                      >
                        {item.name}
                      </CustomLink>
                    </li>
                  ))}
                </ul>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </Transition>
  )
}

const AnimatedHamburgerMenu = ({
  open,
}: React.HTMLAttributes<HTMLButtonElement> & { open: boolean }) => (
  <div className="relative">
    <div className="relative flex h-6 w-6 transform items-center justify-center transition-all duration-200">
      <div className="flex h-5 w-6 origin-center transform flex-col justify-between transition-all duration-300">
        <div
          className={`h-[2px] w-6 origin-left transform bg-neutral-700 transition-all duration-300 dark:bg-neutral-300 ${
            open && 'rotate-[45deg]'
          }`}
        ></div>
        <div
          className={`h-[2px] w-6 transform bg-neutral-700 transition-all duration-300 dark:bg-neutral-300 ${
            open && 'scale-x-0'
          }`}
        ></div>
        <div
          className={`h-[2px] w-6 origin-left transform bg-neutral-700 transition-all duration-300 dark:bg-neutral-300 ${
            open && '-rotate-[45deg]'
          }`}
        ></div>
      </div>
    </div>
  </div>
)
