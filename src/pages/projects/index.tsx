import type { InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import BlogLayout from '../../components/layout/BlogLayout'
import { getAllPublished } from '../../server/common/notion'

export default function Index({
  items,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <BlogLayout>
      <ul className="mx-auto max-w-sm">
        {items.map((item) => (
          <li key={item.slug} className="mt-2 px-4 py-2">
            {item.cover && (
              <Image
                src={item.cover}
                width={300}
                height={200}
                alt="Project cover"
                className="object-cover"
              />
            )}
            <Link href={`/projects/${item.slug}`} className="hover:underline">
              {item.title}
            </Link>
            <div className="mt-1 text-xs font-medium">{item.date}</div>
            <div className="flex flex-wrap gap-2 text-sm">
              {item.tags.map((tag) => (
                <Link
                  href={`/projects/tags/${tag}`}
                  key={tag}
                  className="text-blue-500 hover:underline"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </BlogLayout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      items: await getAllPublished('projects'),
    },
  }
}
