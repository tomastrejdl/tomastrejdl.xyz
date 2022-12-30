/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og'
import { type NextRequest } from 'next/server'

export const config = {
  runtime: 'experimental-edge',
}

const interRegularFontFile = fetch(
  new URL(`../../../../assets/fonts/inter/Inter-Regular.ttf`, import.meta.url)
).then((res) => res.arrayBuffer())

const interBlackFontFile = fetch(
  new URL(`../../../../assets/fonts/inter/Inter-Black.ttf`, import.meta.url)
).then((res) => res.arrayBuffer())

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    // ?title=<title>
    const hasTitle = searchParams.has('title')
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'My default title'

    const { month, releaseDate } = {
      month: searchParams.get('month'),
      releaseDate: searchParams.get('date'),
    }
    const interRegular = await interRegularFontFile
    const interBlack = await interBlackFontFile

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontFamily: 'Inter',
            justifyContent: 'center',
          }}
        >
          <div tw="w-full h-full flex justify-center items-center text-white bg-neutral-800">
            <div tw="w-[40px] h-[40px] mx-auto flex justify-center items-center bg-neutral-700 rounded-full overflow-hidden border border-2 border-neutral-600">
              <img
                src="http://localhost:3000/img/tomastrejdl-headshot-no-bg.png"
                width={3024 / 4}
                height={4032 / 4}
                alt="Tomáš Trejdl headshot"
                tw="h-full"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div tw="flex w-1/2">
              <h1
                tw="text-8xl font-black flex flex-col"
                style={{ fontWeight: 900 }}
              >
                <span>Tomáš</span>
                <span>Trejdl</span>
              </h1>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: interRegular,
            style: 'normal',
            weight: 400,
          },
          {
            name: 'Inter',
            data: interBlack,
            style: 'normal',
            weight: 900,
          },
        ],
      }
    )
  } catch (e: any) {
    console.error(`Error generating OG image: ${e}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
      statusText: 'Internal Server Error' + e,
    })
  }
}
