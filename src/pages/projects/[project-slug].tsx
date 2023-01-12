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
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Button from '../../components/Button'
import { Transition } from '@headlessui/react'
import { NotionAISparkles } from '../../components/icons/NotionAISparkles'

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

export default function PostPage({
  metadata,
  mdxSource,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { resolvedTheme } = useTheme()
  const [isSummaryVisible, setIsSummaryVisible] = useState(false)

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
        <header className="flex flex-col">
          <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400">
            <span className="font-semibold uppercase tracking-wider">
              {metadata.projectName}
            </span>
            <span className="text-sm">{metadata.itemReadingTime.text}</span>
          </div>
          <h1 className="mt-4">
            <Balancer>{metadata.title}</Balancer>
          </h1>
          <div className="text-lg font-medium">
            <MDXRemote {...metadata.description.mdx} components={components} />
          </div>
          <div className="flex w-full flex-col justify-between gap-2 text-neutral-500 dark:text-neutral-400 sm:flex-row sm:items-center">
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
              data-zoomable
              src={metadata.cover.url}
              width={metadata.cover.width}
              height={metadata.cover.height}
              alt={metadata.cover.alt}
              className="w-full rounded-md object-cover lg:w-[128%] lg:max-w-[128%] lg:self-center"
              priority={true}
              sizes="100vw"
            />
          )}
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
            <Button
              onClick={() => setIsSummaryVisible(!isSummaryVisible)}
              className="w-full min-w-[16rem] bg-violet-600 text-white hover:bg-violet-500 dark:bg-violet-600 dark:hover:bg-violet-500 sm:w-auto"
            >
              {isSummaryVisible ? 'Hide' : 'Show'} AI generated summary
            </Button>
            <span className="text-center text-sm text-neutral-600 dark:text-neutral-400 sm:text-left">
              So you don't have to copy and paste this into GPT. I already did
              that for you.
            </span>
          </div>
          <Transition
            show={isSummaryVisible}
            appear
            enter="transition-[max-height,opacity] duration-300 ease-in-out"
            enterFrom="max-h-0 opacity-0"
            enterTo="max-h-[1000px] opacity-1000"
            leave="transition-[max-height,opacity] duration-300 ease-in-out"
            leaveFrom="max-h-[1000px] opacity-100"
            leaveTo="max-h-0 opacity-0"
          >
            <div className="relative mt-4 rounded-md border-2 border-violet-600 bg-violet-500/20 px-6 pb-4">
              <NotionAISparkles className="absolute -top-7 -right-5 h-10 w-10 text-violet-600" />
              <p>{metadata.aiSummary}</p>
              <div className="absolute bottom-2 right-2 whitespace-nowrap text-right text-sm opacity-60">
                - Generated by{' '}
                <CustomLink href="https://notion.so/ai">NotionAI</CustomLink>
              </div>
            </div>
          </Transition>
        </header>
        <MDXRemote {...mdxSource} components={components} />
        <hr />
        <footer className="not-prose flex flex-col gap-4 py-6">
          <h2 className="text-sm uppercase text-neutral-700 dark:text-neutral-400">
            See my other projects
          </h2>
          <div className="-ml-1 flex flex-wrap items-center gap-2 text-sm">
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
        </footer>
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
