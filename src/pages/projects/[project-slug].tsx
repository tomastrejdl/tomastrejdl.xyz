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

const components = {
  img: (props: any) => (
    <Image
      data-zoomable
      className="w-full rounded-md object-cover"
      {...props}
    />
  ),
  a: (props: any) => <CustomLink {...props} />,
}

export default function PostPage({
  metadata,
  mdxSource,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { resolvedTheme } = useTheme()
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
        openGraph={{
          title: metadata.title + ' - Tomáš Trejdl',
          description: metadata.description,
          url: `https://www.tomastrejdl.xyz/projects/${metadata.slug}`,
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
        <header>
          <span className="font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            {metadata.projectName}
          </span>

          <h1 className="mt-4">
            <Balancer>{metadata.title}</Balancer>
          </h1>
          <p className="text-lg font-medium">{metadata.description}</p>
          <div className="flex w-full items-center justify-between text-neutral-500 dark:text-neutral-400">
            <div className="text-base">
              My Role: <span className="font-medium">{metadata.role}</span>
            </div>
            <div className="text-base">
              Project Duration:{' '}
              <span className="whitespace-nowrap font-medium">
                {format(new Date(metadata.projectDuration.start), 'MMM yyyy')}
                {metadata.projectDuration.end
                  ? metadata.projectDuration.end.split('-')[1] !==
                      metadata.projectDuration.start.split('-')[1] && (
                      <>
                        {' - '}
                        {format(
                          new Date(metadata.projectDuration.end),
                          'MMM yyyy'
                        )}
                      </>
                    )
                  : ' - present'}
              </span>
            </div>
          </div>
          {metadata.cover && (
            <Image
              src={metadata.cover.url}
              width={metadata.cover.width}
              height={metadata.cover.height}
              alt={metadata.cover.alt}
              className="w-full rounded-md border border-neutral-300 bg-neutral-100 object-cover dark:border-neutral-500 dark:bg-neutral-700 lg:-mx-[14%] lg:w-[128%] lg:max-w-[128%]"
              priority={true}
            />
          )}
        </header>
        <MDXRemote {...mdxSource} components={components} />
        <hr />
        <aside className="not-prose flex flex-col gap-4">
          <h2 className="text-sm uppercase text-neutral-700 dark:text-neutral-400">
            Tags
          </h2>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {metadata.tags.map((tag) => (
              <CustomLink
                href={{ pathname: '/projects', query: { tags: tag } }}
                key={tag}
                className="rounded-md bg-neutral-200 px-2 py-1 text-sm text-neutral-700 no-underline hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-600"
              >
                {tag}
              </CustomLink>
            ))}
          </div>
        </aside>
      </Prose>
    </BaseLayout>
  )
}

export async function getStaticProps({
  params,
}: {
  params: { 'project-slug': string }
}) {
  return {
    props: {
      ...(await getSingleItem('projects', params['project-slug'])),
    },
    revalidate: 3000,
  }
}

export const getStaticPaths = async () => {
  const posts = await getAllPublished('projects')
  const paths = posts.map(({ slug }) => ({ params: { 'project-slug': slug } }))

  return {
    paths,
    fallback: 'blocking',
  }
}
