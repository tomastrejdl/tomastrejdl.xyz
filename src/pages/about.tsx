import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { CustomLink } from '../components/CustomLink'
import Prose from '../components/Prose'
import BaseLayout from '../layouts/BaseLayout'
import { getPlaiceholder } from 'plaiceholder'
import { type InferGetStaticPropsType } from 'next'

export default function AboutPage({
  imageProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <BaseLayout className="items-center justify-center">
      <NextSeo title="About Me - Tomáš Trejdl" />

      <Prose>
        <div className="mb-12 flex flex-col items-center justify-between gap-8 md:flex-row">
          <Image
            alt="Tomáš Trejdl photo"
            className="my-0 aspect-square h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border bg-neutral-100 object-contain dark:border-neutral-700 dark:bg-neutral-800 sm:h-28 sm:w-28"
            priority={true}
            sizes="112px"
            placeholder="blur"
            {...imageProps}
          />
          <div>
            <h1 className="mb-0 text-2xl sm:text-4xl">Tomáš Trejdl</h1>
            <p className="my-1 text-base font-semibold sm:text-lg">
              Student, UX Designer
            </p>
          </div>
          <div>
            <CustomLink href="https://app.standardresume.co/assets-api/v2/pdf/03nFQ3lyfLsBg4ecJYYR4">
              Download resume
            </CustomLink>
          </div>
        </div>
        <section id="achievements">
          <header>
            <h2 className="!text-base !font-normal uppercase text-neutral-500 dark:text-neutral-400">
              Achievements
            </h2>
          </header>
          <ol className="list-none pl-0 sm:pl-4">
            <li>
              <div className="mt-6 flex items-baseline justify-between">
                <h3 className="mt-0 mb-2 !text-lg !font-medium">
                  <CustomLink href="https://forbes.cz/lists/frbs-30-pod-30-23/tomas-trejdl/">
                    Forbes 30 under 30
                  </CustomLink>
                </h3>
                <span className="whitespace-nowrap font-mono !text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
                  2023
                </span>
              </div>
              <div className="flex flex-wrap gap-2 !text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
                <CustomLink
                  className="text-neutral-600 dark:text-neutral-400"
                  href="https://forbes.cz"
                >
                  Forbes Česko
                </CustomLink>
              </div>
              <p className="mt-2 text-sm text-neutral-800 dark:text-neutral-300">
                I was selected as one of the 30 most promising young people in
                the Czech Republic in the fields of business, technology,
                finance, art, design or sport.
              </p>
            </li>
            <li>
              <div className="mt-6 flex items-baseline justify-between">
                <h3 className="mt-0 mb-2 !text-lg !font-medium">
                  <CustomLink href="https://www.linkedin.com/feed/update/urn:li:activity:6986451499799171072/">
                    Young leader
                  </CustomLink>
                </h3>
                <span className="whitespace-nowrap font-mono !text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
                  2022
                </span>
              </div>

              <div className="flex flex-wrap gap-2 !text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
                <span>
                  Award by the{' '}
                  <CustomLink
                    className="text-neutral-600 dark:text-neutral-400"
                    href="https://www-spolecenskaodpovednost-cz.translate.goog/jak-privest-vodu-do-pouste-jak-bojovat-s-dusevnim-onemocnenim-co-s-prectenymi-knihami-cesko-zna-nejlepsi-udrzitelne-projekty-pro-rok-2022/?_x_tr_sl=en&_x_tr_tl=cs&_x_tr_hl=en&_x_tr_pto=wapp"
                  >
                    Association of Social Responsibility Czech Republic
                  </CustomLink>
                </span>
              </div>
              <p className="mt-2 text-sm text-neutral-800 dark:text-neutral-300">
                Awarded to young leaders who, with the help of innovative and
                sustainable projects, contribute to the achievement of the
                Sustainable Development Goals.
              </p>
            </li>
            <li>
              <div className="mt-6 flex items-baseline justify-between">
                <h3 className="mt-0 mb-2 !text-lg !font-medium">
                  <CustomLink href="https://aktualne.cvut.cz/en/reports/20220429-fel-student-develops-smart-mouse-pad-to-protect-against-sore-wrists">
                    Red Bull Basemet Top 10 finalist
                  </CustomLink>
                </h3>
                <span className="whitespace-nowrap font-mono !text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
                  2021
                </span>
              </div>
              <div className="flex flex-wrap gap-2 !text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
                <span>
                  Student innovation event organized by{' '}
                  <CustomLink
                    className="text-neutral-600 dark:text-neutral-400"
                    href="https://basement.redbull.com"
                  >
                    Red Bull
                  </CustomLink>
                </span>
              </div>
              <p className="mt-2 text-sm text-neutral-800 dark:text-neutral-300">
                We entered with our smart mouse pad project{' '}
                <CustomLink href="/projects/wrest">Wrest</CustomLink> and
                pitched it at the Global Final in Instanbul and made it to TOP
                10 out of 4000 entries.
              </p>
            </li>
          </ol>
        </section>
        <hr />
        <section id="work-experience">
          <header>
            <h2 className="!text-base !font-normal uppercase text-neutral-500 dark:text-neutral-400">
              Work experience
            </h2>
          </header>
          <ol className="list-none pl-0 sm:pl-4">
            <li>
              <div className="mt-6 flex items-baseline justify-between">
                <h3 className="mt-0 mb-2 !text-lg !font-medium">
                  UX/UI Designer
                </h3>
                <span className="whitespace-nowrap font-mono !text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
                  01/2021 - 05/2023
                </span>
              </div>
              <div className="flex flex-wrap gap-2 !text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
                <span>Project</span>•
                <CustomLink
                  href="https://getwrest.com"
                  className="text-neutral-600 dark:text-neutral-400"
                >
                  Wrest
                </CustomLink>
              </div>
              <p></p>
            </li>
            <li>
              <div className="mt-6 flex items-baseline justify-between">
                <h3 className="mt-0 mb-2 !text-lg !font-medium">UX Designer</h3>
                <span className="whitespace-nowrap font-mono !text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
                  10/2020 - 11/2021
                </span>
              </div>
              <div className="flex flex-wrap gap-2 !text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
                <span>Part-time</span>•
                <CustomLink
                  href="https://qdesigners.co"
                  className="text-neutral-600 dark:text-neutral-400"
                >
                  Q Designers
                </CustomLink>
              </div>
              <p></p>
            </li>
            <li>
              <div className="mt-6 flex items-baseline justify-between">
                <h3 className="mt-0 mb-2 !text-lg !font-medium">
                  UX/UI Designer
                </h3>
                <span className="whitespace-nowrap font-mono !text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
                  03/2020 - 06/2020
                </span>
              </div>
              <div className="flex flex-wrap gap-2 !text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
                <span>Project</span>•
                <CustomLink
                  href="https://chytratiaz.cz"
                  className="text-neutral-600 dark:text-neutral-400"
                >
                  Smart Triage
                </CustomLink>
              </div>
              <p></p>
            </li>
            <li>
              <div className="mt-6 flex items-baseline justify-between">
                <h3 className="mt-0 mb-2 !text-lg !font-medium">
                  Frontend Developer
                </h3>
                <span className="whitespace-nowrap font-mono !text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
                  05/2017 - 10/2019
                </span>
              </div>
              <div className="flex flex-wrap gap-2 !text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
                <span>Part-time</span>•
                <CustomLink
                  href="https://signosoft.com"
                  className="text-neutral-600 dark:text-neutral-400"
                >
                  Signosoft
                </CustomLink>
              </div>
              <p></p>
            </li>
          </ol>
        </section>
        <hr />
        <section id="education">
          <header>
            <h2 className="!text-base !font-normal uppercase text-neutral-500 dark:text-neutral-400">
              Education
            </h2>
          </header>
          <ol className="list-none pl-0 sm:pl-4">
            <li>
              <div className="mt-6 flex items-baseline justify-between">
                <h3 className="mt-0 mb-2 !text-lg !font-medium">
                  MSc. in Human-Computer Interaction
                </h3>
                <span className="whitespace-nowrap font-mono !text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
                  09/2020 - present
                </span>
              </div>
              <div className="flex flex-wrap gap-2 !text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
                <CustomLink
                  href="https://oi.fel.cvut.cz/en/master-specialization-human-computer-interaction"
                  className="whitespace-nowrap text-neutral-600 dark:text-neutral-400 "
                >
                  Czech Technical University in Prague
                </CustomLink>
              </div>
              {/* <p className="mt-2 text-sm text-neutral-800 dark:text-neutral-300">
                Courses: User Interface Design • Psychology in HCI • Data
                Visualization <br />
                Thesis topic: User interface for a smart mouse pad designed to
                prevent carpal tunnel syndrome
              </p> */}
            </li>
            <li>
              <div className="mt-6 flex items-baseline justify-between">
                <h3 className="mt-0 mb-2 !text-lg !font-medium">
                  Exchange semester
                </h3>
                <span className="whitespace-nowrap font-mono !text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
                  02/2023 - 06/2023
                </span>
              </div>
              <div className="flex flex-wrap gap-2 !text-sm md:text-base">
                <CustomLink
                  href="https://www.newcastle.edu.au/"
                  className="whitespace-nowrap text-neutral-600 dark:text-neutral-400 "
                >
                  University of Newcastle, Australia
                </CustomLink>
              </div>
              <p className="mt-2 text-sm text-neutral-800 dark:text-neutral-300">
                Courses: Design Thinking and Innovation • Experience Design
                Studio • Entrepreneurship
              </p>
            </li>
            <li>
              <div className="mt-6 flex items-baseline justify-between">
                <h3 className="mt-0 mb-2 !text-lg !font-medium">
                  BSc. Software Engineering
                </h3>
                <span className="whitespace-nowrap font-mono !text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
                  09/2016 - 06/2020
                </span>
              </div>
              <div className="flex flex-wrap gap-2 !text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
                <CustomLink
                  href="https://fit.cvut.cz/en/studies/programs-and-specializations/bachelor/4587-software-engineering"
                  className="whitespace-nowrap text-neutral-600 dark:text-neutral-400"
                >
                  Czech Technical University in Prague
                </CustomLink>
              </div>
              {/* <p className="mt-2 text-sm text-neutral-800 dark:text-neutral-300">
                Courses: Web Application Design • Semantic Web • Software
                Engineering Methods <br />
                Thesis topic:{' '}
                <CustomLink
                  href="/projects/smart-home"
                  className="text-neutral-600 dark:text-neutral-400"
                >
                  Smart home platform based on RaspberryPI using a WIFI
                  connection
                </CustomLink>
              </p> */}
            </li>
          </ol>
        </section>
      </Prose>
    </BaseLayout>
  )
}

export const getStaticProps = async () => {
  const { base64, img } = await getPlaiceholder(
    '/img/tomastrejdl-headshot-no-bg.png'
  )

  return {
    props: {
      imageProps: {
        ...img,
        blurDataURL: base64,
      },
    },
  }
}
