import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { CustomLink } from '../components/CustomLink'
import Prose from '../components/Prose'
import BaseLayout from '../layouts/BaseLayout'

export default function AboutPage() {
  return (
    <BaseLayout className="items-center justify-center">
      <NextSeo title="About Me - Tomáš Trejdl" />

      <Prose>
        <div className="mb-12 flex items-center gap-8">
          <Image
            src="/img/tomastrejdl-headshot-no-bg.png"
            alt="Tomáš Trejdl photo"
            width={3024 / 30}
            height={4032 / 30}
            className="my-0 aspect-square h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border bg-neutral-100 object-contain dark:border-neutral-700 dark:bg-neutral-800 sm:h-28 sm:w-28"
            priority={true}
          />
          <div>
            <h1 className="mb-0 text-2xl sm:text-4xl">Tomáš Trejdl</h1>
            <p className="my-1 text-base font-semibold sm:text-lg">
              Student, UX Designer
            </p>
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
                <h3 className="mt-0 mb-2">
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
              <p className="mt-2">
                We entered with our smart mouse pad project{' '}
                <CustomLink href="/projects/wrest">Wrest</CustomLink> and
                pitched it at the Global Final in Instanbul and made it to TOP
                10 out of 4000 entries.
              </p>
            </li>
            <li>
              <div className="mt-6 flex items-baseline justify-between">
                <h3 className="mt-0 mb-2">
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
              <p className="mt-2">
                Awarded to young leaders who, with the help of innovative and
                sustainable projects, contribute to the achievement of the
                Sustainable Development Goals.
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
                <h3 className="mt-0 mb-2">UX/UI Designer</h3>
                <span className="whitespace-nowrap font-mono !text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
                  01/2021 - present
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
                <h3 className="mt-0 mb-2">UX Designer</h3>
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
                <h3 className="mt-0 mb-2">UX/UI Designer</h3>
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
                <h3 className="mt-0 mb-2">Frontend Developer</h3>
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
                <h3 className="mt-0 mb-2">
                  MSc. in Human-Computer Interaction
                </h3>
                <span className="whitespace-nowrap font-mono !text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
                  09/2020 - present
                </span>
              </div>
              <div className="flex flex-wrap gap-2 !text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
                <span className="whitespace-nowrap">
                  Czech Technical University in Prague
                </span>
              </div>
            </li>
            <li>
              <div className="mt-6 flex items-baseline justify-between">
                <h3 className="mt-0 mb-2">BSc. Software Engineering</h3>
                <span className="whitespace-nowrap font-mono !text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
                  09/2016 - 06/2020
                </span>
              </div>
              <div className="flex flex-wrap gap-2 !text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
                <span className="whitespace-nowrap">
                  Czech Technical University in Prague
                </span>
              </div>
            </li>
          </ol>
        </section>
      </Prose>
    </BaseLayout>
  )
}
