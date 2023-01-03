import { type NextPage } from 'next'
import Link from 'next/link'
import MagicText from '../components/MagicText'
import SocialLogos from '../components/SocialLogos'
import HomepageLayout from '../layouts/HomepageLayout'

const HomePage: NextPage = () => {
  return (
    <HomepageLayout>
      <HeroSection />
    </HomepageLayout>
  )
}

const HeroSection = () => {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <h1 className="text-center">
        <p className="block text-lg lg:text-xl">Hi, my name is Tomáš</p>
        <p className="mt-8 inline-block text-3xl font-medium sm:text-4xl md:text-5xl lg:text-7xl lg:leading-snug">
          I&apos;m a <MagicText>UX designer</MagicText>
        </p>
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
