import { NextSeo } from 'next-seo'
import HomepageLayout from '../layouts/HomepageLayout'
import { CustomLink } from '../components/CustomLink'

export default function P5TestPage({}) {
  return (
    <HomepageLayout>
      <NextSeo title="P5.js test page - Tomáš Trejdl" nofollow noindex />
      <h1 className="text-2xl font-bold">Tomáš Trejdl</h1>
      <p className="text-sm text-neutral-700 dark:text-neutral-300">
        In a world of 0s and 1s, your task is to look for the rogue 2 to finally
        exit the Matrix.
      </p>
      <iframe
        src="/p5/sketch.html"
        width="600px"
        height="400px"
        style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
        className="my-2"
      ></iframe>
      <CustomLink href="https://editor.p5js.org/tomastrejdl/sketches/BCWs1q7Zz">
        Open sketch in p5.js editor
      </CustomLink>
    </HomepageLayout>
  )
}
