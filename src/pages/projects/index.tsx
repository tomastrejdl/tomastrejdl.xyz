import type { InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import BaseLayout from '../../layouts/BaseLayout'
import { getAllPublished } from '../../server/common/notion'

export default function Index({
  items,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <BaseLayout>
      <ul className="mx-auto max-w-4xl">
        {items.map((item, index) => (
          <li
            key={item.slug}
            className="group mt-12 grid grid-flow-dense grid-cols-3 gap-4 first:mt-0"
          >
            {item.cover && (
              <Image
                src={item.cover}
                width={572}
                height={373}
                alt="Project cover"
                className="col-span-2 w-full object-cover group-odd:col-start-2"
                priority={index < 5}
              />
            )}
            <div className="flex flex-col justify-center gap-4 group-odd:text-right">
              <Link href={`/projects/${item.slug}`} className="hover:underline">
                <h2 className="text-4xl font-semibold">{item.title}</h2>
              </Link>
              <Link href={`/projects/${item.slug}`} className="hover:underline">
                Read more {'->'}
              </Link>
            </div>
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
