import Balancer from 'react-wrap-balancer'
import Image from 'next/image'
import type { NotionCMSItemMedatada } from '../server/common/notion'
import { CustomNavLink } from './CustomNavLink'

export default function ProjectCard({
  item,
  priority = false,
}: {
  item: NotionCMSItemMedatada
  priority?: boolean
}) {
  const isActive = item.projectDuration.end === null

  return (
    <CustomNavLink href={`/projects/${item.slug}`} className="group">
      <div className="relative flex flex-col justify-center gap-4">
        {item.cover && (
          <Image
            src={item.cover.url}
            width={item.cover.width}
            height={item.cover.height}
            alt={item.cover.alt}
            className=" w-full rounded-md object-cover"
            priority={priority}
            sizes="(max-width: 768px) 100vw, 1000px"
            placeholder="blur"
            blurDataURL={item.cover.blurDataURL}
          />
        )}
        {isActive && (
          <div className="absolute top-2 left-2 rounded-full bg-blue-600 px-3 py-1 text-xs text-white">
            Active project
          </div>
        )}

        <div className="mx-auto flex w-full max-w-prose flex-col-reverse justify-between gap-2 sm:flex-row sm:gap-8">
          <h2 className="text-xl font-semibold decoration-dotted underline-offset-4 group-hover:underline sm:text-2xl">
            <Balancer>{item.title}</Balancer>
          </h2>
          <div className="flex flex-row justify-between gap-2 text-sm uppercase text-neutral-700 dark:text-neutral-400 sm:flex-col sm:items-end sm:justify-center">
            <span className="whitespace-nowrap">{item.projectName}</span>
            <span className="whitespace-nowrap">
              {item.projectDuration.start.split('-')[0]}
              {item.projectDuration.end
                ? item.projectDuration.end.split('-')[0] !==
                    item.projectDuration.start.split('-')[0] &&
                  ` - ${item.projectDuration.end.split('-')[0]}`
                : ' - present'}
            </span>
          </div>
        </div>
        <p className="mx-auto w-full max-w-prose text-neutral-700 dark:text-neutral-400">
          {item.description.plainText}
        </p>
      </div>
    </CustomNavLink>
  )
}
