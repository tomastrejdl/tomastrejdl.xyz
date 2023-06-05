import Balancer from 'react-wrap-balancer'
import Image from 'next/image'
import type { NotionCMSItemMedatada } from '../server/common/notion'
import { CustomNavLink } from './CustomNavLink'

export default function ProjectCard({
  project,
  priority = false,
}: {
  project: NotionCMSItemMedatada
  priority?: boolean
}) {
  const isActive = project.projectDuration.end === null

  return (
    <CustomNavLink href={`/projects/${project.slug}`} className="group">
      <div className="relative flex flex-col justify-center gap-4">
        {project.cover && (
          <Image
            src={project.cover.url}
            width={project.cover.width}
            height={project.cover.height}
            alt={project.cover.alt}
            className=" w-full rounded-md object-cover"
            priority={priority}
            sizes="(max-width: 768px) 100vw, 1000px"
            placeholder="blur"
            blurDataURL={project.cover.blurDataURL}
          />
        )}
        {isActive && (
          <div className="absolute top-2 left-2 rounded-full bg-blue-600 px-3 py-1 text-xs text-white">
            Active project
          </div>
        )}

        <div className="mx-auto flex w-full max-w-prose flex-col-reverse justify-between gap-2 sm:flex-row sm:gap-8">
          <h2 className="text-xl font-semibold decoration-dotted underline-offset-4 group-hover:underline sm:text-2xl">
            <Balancer>{project.title}</Balancer>
          </h2>
          <div className="flex flex-row justify-between gap-2 text-sm uppercase text-neutral-700 dark:text-neutral-400 sm:flex-col sm:items-end sm:justify-center">
            <span className="whitespace-nowrap">{project.projectName}</span>
            <span className="whitespace-nowrap">
              {project.projectDuration.start.split('-')[0]}
              {project.projectDuration.end
                ? project.projectDuration.end.split('-')[0] !==
                    project.projectDuration.start.split('-')[0] &&
                  ` - ${project.projectDuration.end.split('-')[0]}`
                : ' - present'}
            </span>
          </div>
        </div>
        <p className="mx-auto w-full max-w-prose text-neutral-700 dark:text-neutral-400">
          {project.description.plainText}
        </p>
      </div>
    </CustomNavLink>
  )
}
