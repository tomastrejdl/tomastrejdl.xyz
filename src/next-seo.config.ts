import { type DefaultSeoProps } from 'next-seo'

const nextSeoConfig: DefaultSeoProps = {
  title: 'Tomáš Trejdl - UX Designer and full-stack developer',
  description: 'UX Designer and full-stack developer',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.tomastrejdl.xyz',
    siteName: 'Tomáš Trejdl',
    title: 'Tomáš Trejdl',
    description: 'UX Designer and full-stack developer',
  },
  twitter: {
    handle: '@tomastrejdl',
    cardType: 'summary',
    site: 'https://tomastrejdl.xyz',
  },

  additionalMetaTags: [
    {
      httpEquiv: 'x-ua-compatible',
      content: 'IE=edge',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'keywords',
      content:
        'tomas trejdl tomastrejdl ux designer uxdesigner full-stack frontend web developer',
    },
    {
      name: 'application-name',
      content: 'tomastrejdl',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'default',
    },
    {
      name: 'apple-mobile-web-app-title',
      content: 'tomastrejdl',
    },
    {
      name: 'mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'msapplication-navbutton-color',
      content: '#171717',
    },
    {
      name: 'msapplication-TileColor',
      content: '#171717',
    },
    {
      name: 'msapplication-tap-highlight',
      content: 'no',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent',
    },
    {
      name: 'msapplication-starturl',
      content: '/',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'preconnect',
      href: 'https://static.highlight.io',
    },
    {
      rel: 'dns-prefetch',
      href: 'https://static.highlight.io',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
    {
      rel: 'shortcut icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/icons/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/icons/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/icons/favicon-16x16.png',
    },
  ],
}

export default nextSeoConfig
