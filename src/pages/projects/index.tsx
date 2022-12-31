import type { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import BaseLayout from '../../layouts/BaseLayout'
import { getAllPublished } from '../../server/common/notion'

export default function Index({
  items,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <BaseLayout>
      <Head>
        <title>Projects - Tomáš Trejdl</title>
        <meta
          name="description"
          content={`My projects: ${items.map((item) => item.title).join(', ')}`}
        />
      </Head>
      <h1 className="sr-only">Projects</h1>
      <ul className="mx-auto max-w-4xl">
        {items.map((item, index) => (
          <li key={item.slug} className="group">
            <Link
              href={`/projects/${item.slug}`}
              className="mt-12 grid grid-flow-dense grid-cols-3 gap-4 first:mt-0"
            >
              {item.cover && (
                <Image
                  src={item.cover.url}
                  width={item.cover.width}
                  height={item.cover.height}
                  alt={item.cover.alt}
                  className="col-span-2 w-full object-cover group-odd:col-start-2"
                  priority={index < 5}
                />
              )}
              <div className="flex flex-col justify-center gap-4 group-odd:text-right">
                <h2 className="text-4xl font-semibold group-hover:underline">
                  {item.title}
                </h2>
              </div>
            </Link>
          </li>
        ))}
      </ul>
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
