import { MDXRemote } from 'next-mdx-remote'
import BlogLayout from '../../components/layout/BlogLayout'
import Balancer from 'react-wrap-balancer'
import type { InferGetStaticPropsType } from 'next'
import { getAllPublished, getSingleItem } from '../../server/common/notion'
import Image from 'next/image'

const components = {
  // eslint-disable-next-line jsx-a11y/alt-text, @typescript-eslint/no-explicit-any
  img: (props: any) => <Image {...props} />,
}

export default function PostPage({
  metadata,
  mdxSource,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <BlogLayout>
      <article className="prose mx-auto dark:prose-invert">
        <header>
          <h1>
            <Balancer>{metadata.title}</Balancer>
          </h1>
        </header>
        <MDXRemote {...mdxSource} components={components} />
      </article>
    </BlogLayout>
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
