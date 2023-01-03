import type { InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'
import BaseLayout from '../layouts/BaseLayout'
import { getAllPublished } from '../server/common/notion'
import Balancer from 'react-wrap-balancer'
import { useRouter } from 'next/router'
import { InternalLink } from '../components/Links'
import { XMarkIcon } from '@heroicons/react/24/outline'

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
          <InternalLink
            href={{ query: { tags: '' } }}
            className="flex items-center gap-1 rounded-md px-3 py-1 text-blue-500 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-neutral-800"
          >
            <XMarkIcon className="inline h-5 w-5" />
            Clear filter
          </InternalLink>
        </div>
      )}

      {filteredItems.length > 0 ? (
        <ul className="mx-auto flex max-w-prose flex-col gap-24">
          {filteredItems.map((item, index) => (
            <li key={item.slug}>
              <Link href={`/projects/${item.slug}`} className="group">
                <div className="flex flex-col justify-center gap-4">
                  {item.cover && (
                    <Image
                      src={item.cover.url}
                      width={item.cover.width}
                      height={item.cover.height}
                      alt={item.cover.alt}
                      className=" w-full rounded-md border border-neutral-300 bg-neutral-100 object-cover dark:border-neutral-500 dark:bg-neutral-700"
                      priority={index < 5}
                    />
                  )}

                  <div className="flex justify-between gap-8">
                    <h2 className="text-2xl font-semibold group-hover:underline">
                      <Balancer>{item.title}</Balancer>
                    </h2>
                    <div className="flex flex-col items-end justify-center gap-2 text-sm uppercase text-neutral-700 dark:text-neutral-400">
                      <span className="whitespace-nowrap">
                        {item.projectName}
                      </span>
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
              </Link>
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
