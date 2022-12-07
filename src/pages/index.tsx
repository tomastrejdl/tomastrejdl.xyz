import { type NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import MagicText from '../components/MagicText'
import SocialLogos from '../components/SocialLogos'

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tomáš Trejdl - UX Designer and full-stack developer</title>
        <meta
          name="description"
          content="UX Designer and full-stack developer"
        />
      </Head>
      <HeroSection />
    </>
  )
}

const HeroSection = () => {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <h1 className="text-center">
        <span className="block text-lg lg:text-xl">Hi, my name is Tomáš</span>
        <span className="mt-8 inline-block text-3xl font-medium sm:text-4xl md:text-5xl lg:text-7xl lg:leading-snug">
          I&apos;m a <MagicText>UX designer</MagicText> and
          <br />
          <MagicText>full-stack developer</MagicText>
        </span>
      </h1>
      <p className="relative mt-4 text-center text-lg">
        Currently working on{' '}
        <Link href="https://getwrest.com" className="group">
          <span>Wrest</span>
          <span className="absolute -right-3 top-0.5 flex h-2 w-2">
            <span className="group-hover:magic absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
            <span className="group-hover:magic relative inline-flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-500"></span>
          </span>
        </Link>
      </p>
      <div className="mt-16">
        <SocialLogos />
      </div>
    </div>
  )
}

export default HomePage
