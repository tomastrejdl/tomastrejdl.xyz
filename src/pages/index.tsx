import { type InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { InternalLink } from '../components/Links'
import ProjectCard from '../components/ProjectCard'
// import Link from 'next/link'
// import MagicText from '../components/MagicText'
import SocialLogos from '../components/SocialLogos'
import BaseLayout from '../layouts/BaseLayout'
import { getAllPublished } from '../server/common/notion'

export default function HomePage({
  wrestProject,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <BaseLayout>
      <div className="my-16 flex flex-wrap items-center gap-8 md:my-4 xl:my-16">
        <Image
          src="/img/tomastrejdl-headshot-no-bg.png"
          alt="Tomáš Trejdl photo"
          width={3024 / 30}
          height={4032 / 30}
          className="my-0 aspect-square h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border bg-neutral-100 object-contain dark:border-neutral-700 dark:bg-neutral-800 sm:h-28 sm:w-28"
          priority={true}
        />
        <div>
          <h1 className="mb-0 text-2xl sm:text-4xl">Tomáš Trejdl</h1>
          <p className="my-1 text-base font-semibold sm:text-lg">
            Student, UX Designer
          </p>
        </div>

        <SocialLogos className="md:ml-auto" />
      </div>

      <section className="mt-10 sm:mt-12 md:mt-16 lg:mt-20">
        <header className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium text-neutral-600 dark:text-neutral-400">
            My latest project
          </h2>
          <InternalLink
            href="/projects"
            className="text-blue-500 dark:text-blue-400"
          >
            See all
          </InternalLink>
        </header>
        {wrestProject && <ProjectCard item={wrestProject} priority />}
      </section>
      {/* <HeroSection /> */}
    </BaseLayout>
  )
}

// const HeroSection = () => {
//   return (
//     <div className="flex grow flex-col items-center justify-center">
//       <h1 className="text-center">
//         <p className="block text-lg lg:text-xl">Hi, my name is Tomáš</p>
//         <p className="mt-8 inline-block text-3xl font-medium sm:text-4xl md:text-5xl lg:text-7xl lg:leading-snug">
//           I&apos;m a <MagicText>UX designer</MagicText>
//         </p>
//       </h1>
//       <p className="relative mt-4 text-center text-lg">
//         Currently working on{' '}
//         <Link href="https://getwrest.com" className="group">
//           <span>Wrest</span>
//           <span className="absolute -right-3 top-0.5 flex h-2 w-2">
//             <span className="group-hover:magic absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
//             <span className="group-hover:magic relative inline-flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-500"></span>
//           </span>
//         </Link>
//       </p>
//       <div className="mt-16">
//         <SocialLogos />
//       </div>
//     </div>
//   )
// }

export async function getStaticProps() {
  return {
    props: {
      wrestProject: (await getAllPublished('projects')).find(
        (project) => project.slug === 'wrest'
      ),
    },
  }
}
