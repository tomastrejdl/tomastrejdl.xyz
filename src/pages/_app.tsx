import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { Analytics } from '@vercel/analytics/react'
import { Inter } from '@next/font/google'
import { ThemeProvider } from 'next-themes'
// import { H } from 'highlight.run'
import { ErrorBoundary } from '@highlight-run/react'

import { trpc } from '../utils/trpc'

import '../styles/globals.css'
import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
import Head from 'next/head'
import Script from 'next/script'
import { Partytown } from '@builder.io/partytown/react'

const interVariable = Inter({ display: 'swap', subsets: ['latin-ext'] })

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://unpkg.com" />
        <link rel="dns-prefetch" href="https://unpkg.com" />

        <link rel="preconnect" href="https://static.highlight.io" />
        <link rel="dns-prefetch" href="https://static.highlight.io" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Partytown debug={false} forward={['dataLayer.push']} />
      </Head>
      <SessionProvider session={session}>
        <ErrorBoundary showDialog>
          <ThemeProvider attribute="class">
            <div
              className={`flex min-h-screen flex-col overflow-hidden selection:bg-amber-500 ${interVariable.className}`}
            >
              <div className="relative mx-auto flex h-full w-full max-w-7xl grow flex-col py-[10vh]">
                <Navbar />
                <main className="mx-auto mt-10 flex h-full w-full grow flex-col sm:mt-8 sm:px-6 lg:mt-16">
                  <Component {...pageProps} />
                </main>
                {/* <Footer /> */}
              </div>
            </div>
          </ThemeProvider>
        </ErrorBoundary>
      </SessionProvider>
      <Analytics />
      <Script
        async
        type="text/partytown"
        src="https://unpkg.com/highlight.run"
      ></Script>
      <Script type="text/partytown" id="highlight">
        window.H.init("ve6j9wgp")
      </Script>
    </>
  )
}

export default trpc.withTRPC(MyApp)
