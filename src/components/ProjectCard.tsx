import { InternalLink } from './Links'
import Balancer from 'react-wrap-balancer'
import Image from 'next/image'
import type { NotionCMSItemMedatada } from '../server/common/notion'

export default function ProjectCard({
  item,
  priority = false,
}: {
  item: NotionCMSItemMedatada
  priority?: boolean
}) {
  const isActive = item.projectDuration.end === null

  return (
    <InternalLink href={`/projects/${item.slug}`} className="group">
      <div className="relative flex flex-col justify-center gap-4">
        {item.cover && (
          <Image
            src={item.cover.url}
            width={item.cover.width}
            height={item.cover.height}
            alt={item.cover.alt}
            className=" w-full rounded-md border border-neutral-300 bg-neutral-100 object-cover dark:border-neutral-500 dark:bg-neutral-700"
            priority={priority}
          />
        )}
        {isActive && (
          <div className="absolute top-2 left-2 rounded-full bg-blue-500 px-3 py-1 text-sm text-white">
            Active
          </div>
        )}

        <div className="flex justify-between gap-8">
          <h2 className="text-2xl font-semibold group-hover:underline">
            <Balancer>{item.title}</Balancer>
          </h2>
          <div className="flex flex-col items-end justify-center gap-2 text-sm uppercase text-neutral-700 dark:text-neutral-400">
            <span className="whitespace-nowrap">{item.projectName}</span>
            <span className="whitespace-nowrap">
              {item.projectDuration.start.split('-')[0]}
              {item.projectDuration.end &&
                item.projectDuration.end.split('-')[0] !==
                  item.projectDuration.start.split('-')[0] &&
                ` - ${item.projectDuration.end.split('-')[0]}`}
            </span>
          </div>
        </div>
        <p className="text-neutral-700 dark:text-neutral-400">
          {item.description}
        </p>
      </div>
    </InternalLink>
  )
}
