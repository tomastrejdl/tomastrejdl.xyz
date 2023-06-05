import type { InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import BaseLayout from '../layouts/BaseLayout'
import { getAllPublished } from '../server/common/notion'
import { useRouter } from 'next/router'
import { CustomLink } from '../components/CustomLink'
import { XMarkIcon } from '@heroicons/react/24/outline'
import BlogCard from '../components/BlogCard'

export default function Index({
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const { tags } = router.query

  let tag = ''
  if (typeof tags === 'object') tag = tags[0] ?? ''
  else tag = tags ?? ''

  const filteredArticles = articles.filter((article) =>
    tag === '' ? true : article.tags.includes(tag.replaceAll('-', ' '))
  )

  const sortedArticles = filteredArticles.sort(
    (a, b) =>
      new Date(a.created_time).getTime() - new Date(b.created_time).getTime()
  )

  const years = new Set<number>()
  for (const article of sortedArticles)
    years.add(new Date(article.created_time).getFullYear())

  const articlesByYear = Array.from(years)
    .sort((a, b) => b - a)
    .map((year) => ({
      year: year,
      articles: sortedArticles.filter(
        (article) => new Date(article.created_time).getFullYear() === year
      ),
    }))

  return (
    <BaseLayout>
      <NextSeo
        title="Blog - Tomáš Trejdl"
        description={`Tomáš Trejdl's personal blog`}
      />
      <h1 className="sr-only">Blog</h1>

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

      {sortedArticles.length > 0 ? (
        <ul className="mx-auto flex max-w-prose flex-col gap-12">
          {articlesByYear.map((year, index1) => (
            <li>
              <h2 className="text-lg font-semibold">{year.year}</h2>
              <ul className="mx-auto mt-4 flex max-w-prose flex-col gap-12">
                {year.articles.map((article: any, index2: number) => (
                  <li key={article.slug}>
                    <BlogCard
                      article={article}
                      priority={index1 <= 1 && index2 <= 1}
                    />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <span>No articles match the filters.</span>
      )}
    </BaseLayout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      articles: await getAllPublished('blog'),
    },
  }
}
