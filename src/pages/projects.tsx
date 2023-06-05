import type { InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import BaseLayout from '../layouts/BaseLayout'
import { getAllPublished } from '../server/common/notion'
import { useRouter } from 'next/router'
import { CustomLink } from '../components/CustomLink'
import { XMarkIcon } from '@heroicons/react/24/outline'
import ProjectCard from '../components/ProjectCard'

export default function Index({ projects }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const { tags } = router.query

  let tag = ''
  if (typeof tags === 'object') tag = tags[0] ?? ''
  else tag = tags ?? ''

  const filteredProjects = projects.filter((project) =>
    tag === '' ? true : project.tags.includes(tag.replaceAll('-', ' '))
  )

  const sortedProjects = filteredProjects.sort(
    (a, b) =>
      new Date(b.projectDuration.start).getTime() -
      new Date(a.projectDuration.start).getTime()
  )

  return (
    <BaseLayout>
      <NextSeo
        title="Projects - Tomáš Trejdl"
        description={`My projects: ${projects
          .map((project) => project.title)
          .join(', ')}`}
      />
      <h1 className="sr-only">Projects</h1>

      {tag !== '' && (
        <div className="mx-auto mb-8 flex w-full max-w-prose flex-wrap items-center gap-4">
          Filtered tag:
          <span className="rounded-md bg-neutral-300 px-3 py-1 dark:bg-neutral-700">
            {tag.replaceAll('-', ' ')}
          </span>
          <CustomLink
            isTextLink={false}
            href={{ query: { tags: '' } }}
            className="flex items-center gap-1 rounded-md px-3 py-1 text-blue-500 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-neutral-800"
          >
            <XMarkIcon className="inline h-5 w-5" />
            Clear filter
          </CustomLink>
        </div>
      )}

      {sortedProjects.length > 0 ? (
        <ul className="mx-auto flex flex-col gap-24">
          {sortedProjects.map((project, index) => (
            <li key={project.slug}>
              <ProjectCard project={project} priority={index <= 1} />
            </li>
          ))}
        </ul>
      ) : (
        <span>No projects match the filters.</span>
      )}
    </BaseLayout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      projects: await getAllPublished('projects'),
    },
    revalidate: 60,
  }
}
