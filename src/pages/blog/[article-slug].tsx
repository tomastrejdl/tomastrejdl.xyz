/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MDXRemote } from 'next-mdx-remote'
import Balancer from 'react-wrap-balancer'
import type { InferGetStaticPropsType } from 'next'
import { getAllPublished, getSingleItem } from '../../server/common/notion'
import Image from 'next/image'
import BaseLayout from '../../layouts/BaseLayout'
import { NextSeo } from 'next-seo'
import { CustomLink } from '../../components/CustomLink'
import { format } from 'date-fns'
import Prose from '../../components/Prose'
import mediumZoom from 'medium-zoom'
import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { toTitleCase } from '../../utils/utils'

const components = {
  img: (props: any) => (
    <Image
      data-zoomable
      className="w-full rounded-md object-cover lg:w-[128%] lg:max-w-[128%] lg:self-center"
      sizes="(max-width: 768px) 100vw, 1000px"
      {...props}
    />
  ),
  a: (props: any) => <CustomLink {...props} />,
}

export default function BlogArticlePage({
  metadata,
  mdxSource,
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { resolvedTheme } = useTheme()
  // const [isSummaryVisible, setIsSummaryVisible] = useState(false)

  const currentArticleIndex = articles.findIndex((a) => a.id === metadata.id)
  const nextArticle = articles.at(
    currentArticleIndex < articles.length - 1 ? currentArticleIndex + 1 : 0
  )

  useEffect(() => {
    const zoom = mediumZoom('[data-zoomable]', {
      background: resolvedTheme === 'dark' ? '#171717' : '#FAFAFA',
    })
    return () => {
      zoom.detach()
    }
  }, [resolvedTheme])

  return (
    <BaseLayout>
      <NextSeo
        title={metadata.title + ' - Tomáš Trejdl'}
        description={metadata.description.plainText}
        openGraph={{
          url: `https://www.tomastrejdl.xyz/blog/${metadata.slug}`,
          type: 'article',
          article: {
            publishedTime: metadata.created_time,
            modifiedTime: metadata.last_edited_time,
            authors: ['https://www.tomastrejdl.xyz'],
            tags: metadata.tags,
          },
          images: [metadata.cover],
        }}
      />
      <Prose as="article">
        <header className="flex flex-col">
          <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400">
            <span className="font-semibold uppercase tracking-wider"></span>
            <span className="text-sm">{metadata.itemReadingTime.text}</span>
          </div>
          <h1 className="mt-4">
            <Balancer>{metadata.title}</Balancer>
          </h1>
          <div className="text-lg font-medium">
            <MDXRemote {...metadata.description.mdx} components={components} />
          </div>
          {metadata.cover && (
            <Image
              data-zoomable
              src={metadata.cover.url}
              width={metadata.cover.width}
              height={metadata.cover.height}
              alt={metadata.cover.alt}
              className="m-0 w-full rounded-md object-cover lg:w-[128%] lg:max-w-[128%] lg:self-center"
              priority={true}
              sizes="100vw"
            />
          )}
          <div className="mt-4 flex w-full flex-col justify-between gap-2 text-neutral-500 dark:text-neutral-400 sm:flex-row sm:items-center">
            <div className="text-xs">
              Published:{' '}
              <span className="whitespace-nowrap font-medium">
                {format(new Date(metadata.created_time), 'dd MMM yyyy')}
              </span>
            </div>
            {metadata.last_edited_time !== metadata.created_time && (
              <div className="text-xs">
                Last updated:{' '}
                <span className="whitespace-nowrap font-medium">
                  {format(new Date(metadata.last_edited_time), 'dd MMM yyyy')}
                </span>
              </div>
            )}
          </div>
        </header>
        <MDXRemote {...mdxSource} components={components} />
        <hr />
        <footer className="not-prose flex flex-col justify-between gap-12 py-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-sm uppercase text-neutral-700 dark:text-neutral-400">
              Tags
            </h2>
            <div className="-ml-1 flex flex-wrap items-center gap-2 text-sm">
              {metadata.tags.map((tag) => (
                <CustomLink
                  href={{ pathname: '/blog', query: { tags: tag } }}
                  key={tag}
                  className="rounded-md bg-neutral-200 px-2 py-1 text-sm text-neutral-700 no-underline hover:bg-neutral-300 hover:text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-600 dark:hover:text-neutral-200"
                >
                  {tag}
                </CustomLink>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-sm uppercase text-neutral-700 dark:text-neutral-400">
              Next article
            </h2>
            <CustomLink href={`/blog/${nextArticle?.slug}`}>
              <span>{toTitleCase('' + nextArticle?.title)}</span>
              <ArrowRightIcon className="ml-1 inline-block h-4 w-4" />
            </CustomLink>
          </div>
        </footer>
      </Prose>
    </BaseLayout>
  )
}

export async function getStaticProps({
  params,
}: {
  params: { 'article-slug': string }
}) {
  return {
    props: {
      ...(await getSingleItem('blog', params['article-slug'])),
      articles: await getAllPublished('blog'),
    },
    revalidate: 3000,
  }
}

export const getStaticPaths = async () => {
  const articles = await getAllPublished('blog')
  const paths = articles.map(({ slug }) => ({
    params: { 'article-slug': slug },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}
