import { NextSeo } from 'next-seo'
import HomepageLayout from '../layouts/HomepageLayout'
// import Iframe from 'react-iframe'

export default function P5TestPage({}) {
  return (
    <HomepageLayout>
      <NextSeo title="P5.js test page - Tomáš Trejdl" nofollow noindex />
      <h1>P5 Test</h1>
      <iframe
        src="/p5/sketch.html"
        width="600px"
        height="400px"
        style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
      ></iframe>
    </HomepageLayout>
  )
}
