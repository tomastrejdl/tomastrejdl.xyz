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
import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
import Head from 'next/head'

H.init('ve6j9wgp')

const interVariable = Inter({ display: 'swap', subsets: ['latin-ext'] })

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://static.highlight.io" />
        <link rel="dns-prefetch" href="https://static.highlight.io" />

        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>Tomáš Trejdl - UX Designer and full-stack developer</title>
        <meta
          name="description"
          content="UX Designer and full-stack developer"
        />
        <meta
          name="keywords"
          content="tomas trejdl tomastrejdl ux designer uxdesigner full-stack frontend web developer"
        />

        <link rel="manifest" href="/manifest.json" />
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

        <meta name="application-name" content="tomastrejdl" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="tomastrejdl" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-navbutton-color" content="#171717" />
        <meta name="msapplication-TileColor" content="#171717" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="msapplication-starturl" content="/" />

        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://tomastrejdl.xyz" />
        <meta name="twitter:title" content="Tomáš Trejdl" />
        <meta
          name="twitter:description"
          content="UX Designer and full-stack developer"
        />
        <meta
          name="twitter:image"
          content="https://https://tomastrejdl.xyz/icons/android-chrome-192x192.png"
        />
        <meta name="twitter:creator" content="@DavidWShadow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Tomáš Trejdl" />
        <meta
          property="og:description"
          content="UX Designer and full-stack developer"
        />
        <meta property="og:site_name" content="Tomáš Trejdl" />
        <meta property="og:url" content="https://tomastrejdl.xyz" />
        <meta
          property="og:image"
          content="https://https://tomastrejdl.xyz/icons/apple-touch-icon.png"
        />
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
    </>
  )
}

export default trpc.withTRPC(MyApp)
