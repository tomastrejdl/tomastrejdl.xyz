import { MDXRemote } from 'next-mdx-remote'
import Balancer from 'react-wrap-balancer'
import type { InferGetStaticPropsType } from 'next'
import { getAllPublished, getSingleItem } from '../../server/common/notion'
import Image from 'next/image'
import Link from 'next/link'
import BaseLayout from '../../layouts/BaseLayout'
import { NextSeo } from 'next-seo'

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
      <article className="prose prose-neutral mx-auto dark:prose-invert lg:prose-lg">
        <header>
          <h1>
            <Balancer>{metadata.title}</Balancer>
          </h1>
          <div className="flex flex-wrap gap-2 text-sm">
            {metadata.tags.map((tag) => (
              <Link
                href={`/projects/tags/${tag}`}
                key={tag}
                className="text-blue-500 hover:underline"
              >
                {tag}
              </Link>
            ))}
          </div>
        </header>
        <MDXRemote {...mdxSource} components={components} />
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
