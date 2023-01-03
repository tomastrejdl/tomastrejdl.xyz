import { MDXRemote } from 'next-mdx-remote'
import Balancer from 'react-wrap-balancer'
import type { InferGetStaticPropsType } from 'next'
import { getAllPublished, getSingleItem } from '../../server/common/notion'
import Image from 'next/image'
import BaseLayout from '../../layouts/BaseLayout'
import { NextSeo } from 'next-seo'
import { InternalLink } from '../../components/Links'
import { format } from 'date-fns'

const components = {
  // eslint-disable-next-line jsx-a11y/alt-text, @typescript-eslint/no-explicit-any
  img: (props: any) => <Image {...props} />,
}

export default function PostPage({
  metadata,
  mdxSource,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
      <article className="prose prose-neutral mx-auto prose-figcaption:text-center  prose-img:rounded-md dark:prose-invert lg:prose-lg">
        <header>
          <div className="mb-4 text-sm font-medium uppercase">
            {metadata.projectName}
          </div>
          <h1>
            <Balancer>{metadata.title}</Balancer>
          </h1>
        </header>
        <MDXRemote {...mdxSource} components={components} />
        <section className="not-prose flex flex-col gap-4 rounded-md bg-neutral-200 p-8 dark:bg-neutral-800">
          <h2 className="text-sm uppercase text-neutral-700 dark:text-neutral-400">
            Project info
          </h2>
          <div className="text-base">
            Duration:{' '}
            <span className="whitespace-nowrap">
              {format(new Date(metadata.projectDuration.start), 'MMM yyyy')}
              {metadata.projectDuration.end &&
                metadata.projectDuration.end.split('-')[1] !==
                  metadata.projectDuration.start.split('-')[1] && (
                  <>
                    {' - '}
                    {format(new Date(metadata.projectDuration.end), 'MMM yyyy')}
                  </>
                )}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="mr-2 text-base">Tags:</span>
            {metadata.tags.map((tag) => (
              <InternalLink
                href={{ pathname: '/projects', query: { tags: tag } }}
                key={tag}
                className="-ml-2 rounded-md px-2 py-1 text-sm text-neutral-700 no-underline hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-neutral-600"
              >
                {tag}
              </InternalLink>
            ))}
          </div>
        </section>
      </article>
    </BaseLayout>
  )
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  return {
    props: {
      ...(await getSingleItem('projects', params.slug)),
    },
    revalidate: 3000,
  }
}

export const getStaticPaths = async () => {
  const posts = await getAllPublished('projects')
  const paths = posts.map(({ slug }) => ({ params: { slug } }))

  return {
    paths,
    fallback: 'blocking',
  }
}
