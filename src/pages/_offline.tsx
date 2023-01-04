import { NextSeo } from 'next-seo'

const Fallback = () => (
  <>
    <NextSeo title="Tomáš Trejdl" nofollow noindex />
    <h1>Hey, you're offline</h1>
    <h2>Check your wifi.</h2>
  </>
)

export default Fallback
