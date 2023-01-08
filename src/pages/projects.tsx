import type { InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import BaseLayout from '../layouts/BaseLayout'
import { getAllPublished } from '../server/common/notion'
import { useRouter } from 'next/router'
import { CustomLink } from '../components/CustomLink'
import { XMarkIcon } from '@heroicons/react/24/outline'
import ProjectCard from '../components/ProjectCard'

export default function Index({
  items,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const { tags } = router.query

  let tag = ''
  if (typeof tags === 'object') tag = tags[0] ?? ''
  else tag = tags ?? ''

  const filteredItems = items.filter((item) =>
    tag === '' ? true : item.tags.includes(tag.replaceAll('-', ' '))
  )

  return (
    <BaseLayout>
      <NextSeo
        title="Projects - Tomáš Trejdl"
        description={`My projects: ${items
          .map((item) => item.title)
          .join(', ')}`}
      />
      <h1 className="sr-only">Projects</h1>

      {tag !== '' && (
        <div className="mx-auto mb-8 flex w-full max-w-prose items-center gap-4">
          Filtered tag:
          <span className="rounded-md bg-neutral-300 px-3 py-1 dark:bg-neutral-700">
            {tag.replaceAll('-', ' ')}
          </span>
          <CustomLink
            href={{ query: { tags: '' } }}
            className="flex items-center gap-1 rounded-md px-3 py-1 text-blue-500 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-neutral-800"
          >
            <XMarkIcon className="inline h-5 w-5" />
            Clear filter
          </CustomLink>
        </div>
      )}

      {filteredItems.length > 0 ? (
        <ul className="mx-auto flex flex-col gap-24">
          {filteredItems.map((item, index) => (
            <li key={item.slug}>
              <ProjectCard item={item} priority={index <= 1} />
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
      items: await getAllPublished('projects'),
    },
  }
}
