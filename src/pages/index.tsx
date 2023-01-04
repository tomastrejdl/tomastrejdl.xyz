import { type InferGetStaticPropsType } from 'next'
import ProjectCard from '../components/ProjectCard'
import {
  getAllPublished,
  type NotionCMSItemMedatada,
} from '../server/common/notion'
import HomepageLayout from '../layouts/HomepageLayout'
import { CustomLink } from '../components/CustomLink'
import MagicText from '../components/MagicText'

export default function HomePage({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <HomepageLayout>
      <HeroSection />
      <ProjectsSection projects={projects} />
    </HomepageLayout>
  )
}

const HeroSection = () => (
  <section className="flex min-h-[60dvh] grow flex-col items-center justify-center">
    <h1 className="text-center">
      <p className="block text-lg lg:text-xl">Hi, my name is Tomáš</p>
      <p className="mt-8 inline-block text-4xl font-medium sm:text-5xl md:text-6xl lg:text-7xl lg:leading-snug">
        I&apos;m a <MagicText>student</MagicText> <br />
        <MagicText>UX designer</MagicText>
      </p>
    </h1>
    <p className="relative mt-4 text-center text-lg">
      Currently working on{' '}
      <CustomLink
        href="/projects/wrest"
        className="hover:magic-text group inline-block font-medium text-blue-600 transition will-change-transform dark:text-blue-500"
      >
        <span>Wrest</span>
        <span className="absolute -right-3 top-0.5 flex h-2 w-2">
          <span className="group-hover:magic absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
          <span className="group-hover:magic relative inline-flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-500"></span>
        </span>
      </CustomLink>
    </p>
  </section>
)

// const HeroSection = () => (
//   <section className="flex min-h-[60dvh] grow flex-col items-center justify-center">
//     <h1 className="sr-only">
//       Hello world, my name is Tomáš. I'm a UX designer and student
//     </h1>
//     <h1 aria-hidden className="h-32 w-full">
//       <TypeAnimation
//         sequence={['Hello world, my name is Tomáš']}
//         wrapper="span"
//         speed={75}
//         cursor={false}
//         className="block text-lg lg:text-xl"
//       />
//       <TypeAnimation
//         sequence={[1000, "I'm a student and UX designer"]}
//         wrapper="span"
//         speed={30}
//         deletionSpeed={50}
//         cursor={false}
//         repeat={Infinity}
//         className="mt-8 inline-block text-3xl font-medium sm:text-4xl md:text-5xl lg:text-5xl lg:leading-snug"
//       />
//     </h1>
//     <TypeAnimation
//       sequence={[2000, 'Currently working on ']}
//       wrapper="p"
//       speed={30}
//       deletionSpeed={50}
//       cursor={false}
//       repeat={Infinity}
//       className="relative mt-16 h-5 w-full text-lg"
//     />
//     {/* <p className="relative mt-4 text-center text-lg">
//       Currently working on{' '}
//       <CustomLink
//         href="/projects/wrest"
//         className="hover:magic-text group inline-block font-medium text-blue-600 transition will-change-transform dark:text-blue-500"
//       >
//         <span>Wrest</span>
//         <span className="absolute -right-3 top-0.5 flex h-2 w-2">
//           <span className="group-hover:magic absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
//           <span className="group-hover:magic relative inline-flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-500"></span>
//         </span>
//       </CustomLink>
//     </p> */}
//   </section>
// )

const ProjectsSection = ({
  projects,
}: {
  projects: NotionCMSItemMedatada[]
}) => (
  <section className="mt-10 sm:mt-12 md:mt-16 lg:mt-20">
    {/* <header className="mx-auto mb-4 flex w-full items-center justify-between">
      <h2 className="uppercase text-neutral-500 dark:text-neutral-400">
        My latest projects
      </h2>
    </header> */}
    <ul className="mx-auto flex flex-col gap-24">
      {projects.map((item, index) => (
        <li key={item.slug}>
          <ProjectCard item={item} priority={index == 0} />
        </li>
      ))}
    </ul>
  </section>
)
export async function getStaticProps() {
  return {
    props: {
      projects: await getAllPublished('projects'),
    },
  }
}
