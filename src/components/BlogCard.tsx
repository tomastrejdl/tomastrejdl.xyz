import Balancer from 'react-wrap-balancer'
import Image from 'next/image'
import type { NotionCMSItemMedatada } from '../server/common/notion'
import { CustomNavLink } from './CustomNavLink'
import { format } from 'date-fns'

export default function BlogCard({
  article,
  priority = false,
}: {
  article: NotionCMSItemMedatada
  priority?: boolean
}) {
  return (
    <CustomNavLink href={`/blog/${article.slug}`} className="group">
      <div className="relative flex w-full gap-8">
        {article.cover && (
          <Image
            src={article.cover.url}
            width={article.cover.width}
            height={article.cover.height}
            alt={article.cover.alt}
            className="w-32 rounded-md object-cover"
            priority={priority}
            sizes="(max-width: 768px) 100vw, 1000px"
            placeholder="blur"
            blurDataURL={article.cover.blurDataURL}
          />
        )}
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold decoration-dotted underline-offset-4 group-hover:underline sm:text-2xl">
            <Balancer>{article.title}</Balancer>
          </h2>
          <div className="flex flex-row justify-between gap-2 text-sm text-neutral-700 dark:text-neutral-400 sm:flex-col sm:justify-center">
            <span className="whitespace-nowrap">
              {format(new Date(article.created_time), 'dd MMM yyyy')}
            </span>
          </div>
          {/* <p className="mx-auto w-full max-w-prose text-neutral-700 dark:text-neutral-400">
            {article.description.plainText}
          </p> */}
        </div>
      </div>
    </CustomNavLink>
  )
}
