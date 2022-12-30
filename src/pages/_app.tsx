import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { Analytics } from '@vercel/analytics/react'
import { Inter } from '@next/font/google'
import { ThemeProvider } from 'next-themes'
import { H } from 'highlight.run'
import { ErrorBoundary } from '@highlight-run/react'

import { trpc } from '../utils/trpc'

import '../styles/globals.css'

import useNextSeoConfig from '../next-seo.config'
import { DefaultSeo } from 'next-seo'
import Head from 'next/head'
import { env } from '../env/client.mjs'

H.init('ve6j9wgp')

const interVariable = Inter({ display: 'swap', subsets: ['latin-ext'] })

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const nextSeo = useNextSeoConfig(env.NEXT_PUBLIC_HOSTNAME)

  return (
    <>
      <DefaultSeo {...nextSeo} />
      <Head>
        <meta
          name="theme-color"
          content="#171717"
          media="(prefers-color-scheme: dark)"
        />
        <meta
          name="theme-color"
          content="#F5F5F5"
          media="(prefers-color-scheme: light)"
        />
        <meta name="color-scheme" content="dark light" />
      </Head>
      <SessionProvider session={session}>
        <ErrorBoundary showDialog>
          <ThemeProvider attribute="class">
            <div
              className={`relative mx-auto flex min-h-screen w-full max-w-7xl flex-col overflow-hidden p-4 selection:bg-amber-500 selection:text-black dark:selection:bg-amber-400 sm:p-6 lg:p-8 ${interVariable.className}`}
            >
              <Component {...pageProps} />
            </div>
          </ThemeProvider>
        </ErrorBoundary>
      </SessionProvider>
      <Analytics />
    </>
  )
}

export default trpc.withTRPC(MyApp)
