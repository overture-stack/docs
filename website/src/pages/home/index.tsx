import React, { useState } from "react";
import MarketingPage from "../../marketing/MarketingPage";
import Button from "../../marketing/components/Button";
import HomeProductLink from "../../marketing/components/HomeProductLink";
import { Icon } from "../../marketing/components/Icon";
import { Terminal } from "../../marketing/components/Terminal";
import { H1, H2, H3, P1, P2 } from "../../marketing/components/Typography";
import caseData from "../../marketing/data/caseStudies";
import {
  ABOUT_US_PATH,
  SERVICES_PATH,
  caseStudyAnchors,
  productsAnchors,
} from "../../marketing/constants/pages";
import {
  DEMO_LINK,
  DOCKER_DOWNLOAD,
  GI_PROGRAM_LINK,
  PRELUDE_DOCS_LINK,
} from "../../marketing/constants/externalLinks";

const ASSETS = "/img/marketing/home";

/**
 * The marketing home page.
 *
 * Served at /home/ rather than / for now: this build's `/` is the
 * documentation homepage (src/pages/index.tsx), and stage 1 changes nothing a
 * visitor sees. Stage 3 gives the marketing build its own root, at which point
 * this becomes `/`. See .dev/roadmap.md.
 */
export default function HomePage() {
  const [carouselPage, setCarouselPage] = useState(0);
  const handleLeftArrowClick = () => {
    // this allows for carousel looping from the first slide
    setCarouselPage(
      carouselPage === 0 ? caseData.length - 1 : carouselPage - 1,
    );
  };
  const handleRightArrowClick = () => {
    // this allows for carousel looping from the last slide
    setCarouselPage(
      carouselPage === caseData.length - 1 ? 0 : carouselPage + 1,
    );
  };

  return (
    <MarketingPage
      className="HomePage"
      title="Overture - Home"
      description="Overture is a collection of modular software components that build into flexible data management systems."
    >
      {/* top hero - blue background  */}
      <div className="Hero">
        <div className="container">
          <section className="Hero__section">
            <H1>Build. Deploy. Discover.</H1>
            <P1>
              Overture is a collection of open-source software used to create
              platforms where researchers manage, share and access genomics
              data.
            </P1>
            {/* Institutional attribution, subtle but present: one line, here
                rather than a band further down, because it is what makes
                everything below it credible. See .dev/ia-proposal.md finding 10
                for what this deliberately is not, namely a co-brand. */}
            <p className="Hero__attribution">
              Developed and built by the{" "}
              <a
                href={GI_PROGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                Genome Informatics program
              </a>{" "}
              at the Ontario Institute for Cancer Research.
            </p>
            <div className="Hero__small-buttons-container">
              <Button link={PRELUDE_DOCS_LINK} size="medium" type="primary">
                Get Started
              </Button>
              <Button link={DEMO_LINK} size="medium" type="primary">
                View Demo
              </Button>
            </div>
          </section>
        </div>
      </div>

      {/* top white section - titled powering big-data at scale */}
      <section className="section top-white">
        <div className="top-white__title-container">
          <H2 className="top-white__title">Powering big-data at scale</H2>
          <P1>
            Overture has been successfully deployed in a diversity of
            large-scale projects.
          </P1>
        </div>

        {/* logos scroll bar  */}
        <div className="top-white__logos">
          {caseData.map((data, idx) => {
            const active =
              idx === carouselPage ? "top-white__logo-container-active" : "";
            return (
              <div
                className={`top-white__logo-container ${active}`}
                key={data.slug}
              >
                <button
                  type="button"
                  className="top-white__logo-button"
                  onClick={() => setCarouselPage(idx)}
                >
                  <img
                    src={data.logo}
                    alt={`${data.title} logo`}
                    className="top-white__logo"
                  />
                </button>
              </div>
            );
          })}
        </div>

        {/* blue container - carousel */}
        <div className="top-white__blue-container">
          <Button
            icon="arrowLeftBlack"
            ariaLabel="Previous case study"
            type="default"
            className="top-white__blue-container-arrow-desktop top-white__blue-container-arrow"
            onClick={handleLeftArrowClick}
          />
          <div className="top-white__blue-container-content">
            <div className="top-white__blue-container-arrows-image-container">
              <Button
                icon="arrowLeftBlack"
                ariaLabel="Previous case study"
                type="default"
                className="top-white__blue-container-arrow-tablet top-white__blue-container-arrow"
                onClick={handleLeftArrowClick}
              />
              <a
                href={caseData[carouselPage].portalLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={caseData[carouselPage].details[0].screenshot}
                  alt={`${caseData[carouselPage].title} portal screenshot`}
                  className="top-white__blue-container-image"
                />
              </a>
              <Button
                icon="arrowRightBlack"
                ariaLabel="Next case study"
                type="default"
                className="top-white__blue-container-arrow-tablet top-white__blue-container-arrow ow:ml-4"
                onClick={handleRightArrowClick}
              />
            </div>

            <div className="top-white__blue-container-right">
              <div className="top-white__blue-container-arrows-title-container">
                <Button
                  icon="arrowLeftBlack"
                  ariaLabel="Previous case study"
                  type="default"
                  className="top-white__blue-container-arrow-mobile top-white__blue-container-arrow"
                  onClick={handleLeftArrowClick}
                />
                <H3 className="top-white__blue-container-title">
                  {caseData[carouselPage].title}
                </H3>
                <Button
                  icon="arrowRightBlack"
                  ariaLabel="Next case study"
                  type="default"
                  className="top-white__blue-container-arrow-mobile top-white__blue-container-arrow "
                  onClick={handleRightArrowClick}
                />
              </div>
              <div className="top-white__blue-container-text">
                <P2> {caseData[carouselPage].listItems[2][0]}</P2>
              </div>
              <Button
                type="primary"
                size="medium"
                className="top-white__blue-container-learn-more-button"
                anchorLink={
                  caseStudyAnchors[
                    caseData[carouselPage].slug as keyof typeof caseStudyAnchors
                  ]
                }
              >
                Learn More
              </Button>
            </div>
          </div>
          <Button
            icon="arrowRightBlack"
            ariaLabel="Next case study"
            type="default"
            className="top-white__blue-container-arrow-desktop top-white__blue-container-arrow"
            onClick={handleRightArrowClick}
          />
        </div>
      </section>

      {/* top floating teal cube */}
      <img
        src={`${ASSETS}/cube_bright_teal_inverted.svg`}
        alt=""
        className="bright-teal-cube-top"
      />

      {/* upper grey section */}
      <section className="section upper-grey bg-grey">
        <div className="upper-grey__mobile">
          <h2 className="upper-grey__text">
            We are a team of software engineers, data scientists, and cloud
            infrastructure specialists creating applications that store, manage,
            and explore massive genomic datasets.
          </h2>
        </div>

        <div className="upper-grey__not-mobile">
          <h2 className="upper-grey__line ">
            <span className="upper-grey__text">We</span>
            <span className="upper-grey__text">are</span>
            <span className="upper-grey__text">a</span>
            <span className="upper-grey__text">team</span>
            <span className="upper-grey__text">of</span>
            <Icon
              alt=""
              img="softwareEngineers"
              size="60px"
              className="upper-grey__icon"
            />
            <span className="upper-grey__text">software</span>
            <span className="upper-grey__text">engineers,</span>
            <Icon alt="" img="data" size="60px" className="upper-grey__icon" />
            <span className="upper-grey__text">data</span>
            <span className="upper-grey__text">scientists</span>
            <span className="upper-grey__text">and</span>
            <Icon
              alt=""
              img="cloudWeather"
              size="60px"
              className="upper-grey__icon"
            />
            <span className="upper-grey__text">cloud </span>
            <span className="upper-grey__text">infrastructure</span>
            <span className="upper-grey__text">specialists </span>
            <span className="upper-grey__text">creating</span>
            <span className="upper-grey__text">applications</span>
            <Icon
              alt=""
              img="bigData"
              size="60px"
              className="upper-grey__icon"
            />
            <span className="upper-grey__text">to</span>
            <span className="upper-grey__text">store,</span>
            <span className="upper-grey__text">manage,</span>
            <span className="upper-grey__text">and</span>
            <span className="upper-grey__text">share</span>
            <span className="upper-grey__text">massive genomic datasets.</span>
          </h2>
        </div>
        <div className="ow:mt-8 lower-grey__buttons">
          <Button
            link={ABOUT_US_PATH}
            size="medium"
            type="primary"
            className="upper-grey__button ow:mt-4"
          >
            About Us
          </Button>
          <Button
            link={SERVICES_PATH}
            size="medium"
            type="primary"
            className="upper-grey__button ow:mt-4"
          >
            Our Services
          </Button>
        </div>
      </section>

      {/* floating yellow cube */}
      <img src={`${ASSETS}/cube_yellow.svg`} alt="" className="yellow-cube" />

      {/* middle white section - titled our products */}
      <section className="middle-white section">
        <div className="middle-white__titles-holder">
          <H2>Our Products</H2>
          <P1 className="middle-white__title-text">
            Built to be reusable and scalable, our ecosystem of research
            software tools reduces redundant efforts and enables the creation of
            robust genomics data applications
          </P1>
        </div>
        <div className="middle-white__content">
          <div className="middle-white__image-column">
            <img
              className="middle-white__image"
              src={`${ASSETS}/overture_illustration.svg`}
              alt=""
            />
          </div>

          <div className="middle-white__text-wrapper">
            <HomeProductLink
              icon="productSong"
              title="Song"
              text="Manage and store metadata with custom validations."
              link={productsAnchors.song}
            />
            <HomeProductLink
              icon="productScore"
              title="Score"
              text="Securely transfer file data to and from the cloud."
              link={productsAnchors.score}
            />
            <HomeProductLink
              icon="productMaestro"
              title="Maestro"
              text="Organize scattered metadata into one index."
              link={productsAnchors.maestro}
            />
            <HomeProductLink
              icon="productArranger"
              title="Arranger"
              text="Generate search APIs and portal UIs from indexed data."
              link={productsAnchors.arranger}
            />
            <HomeProductLink
              icon="productDMS"
              title="Stage"
              text="Rapidly integrate overture into a React-based web portal."
              link={productsAnchors.stage}
            />
          </div>
        </div>
      </section>

      <img src={`${ASSETS}/cube_maroon.svg`} alt="" className="maroon-cube" />

      {/* lower blue section */}
      <section className="lower-blue-section">
        <div className="lower-blue-section__container">
          <div className="lower-blue-section__holder">
            <div className="lower-blue-section__title-holder">
              <H2>Getting Started</H2>
              <P2 className="text-subtitle">
                <b>Try the whole stack locally</b>
              </P2>
              <P1 className="middle-white__title-text">
                Prelude stands up an Overture platform on your own machine, with
                no cloud account and nothing to provision.
              </P1>
            </div>
            {/* div with the blue background */}

            <div className="lower-blue-section__content-holder">
              <div className="lower-blue-section__img-holder">
                <img
                  src={`${ASSETS}/overtureQuickstartPortal.webp`}
                  alt="Overture QuickStart Portal screenshot"
                  className="lower-blue-section__img"
                />
              </div>
              {/* This block used to repeat the Prelude setup steps verbatim.
                  It went stale as soon as the docs moved, which is finding 5 in
                  .dev/ia-proposal.md and the reason /getting-started/ retired,
                  so it now orients and hands off instead of duplicating. Setup
                  instructions are the documentation's to own. */}
              <div className="upper-grey-section__content-holder">
                <div className="terminal-section">
                  <P2 className="text-section">
                    Prelude runs the whole Overture stack on your own machine, so
                    you can submit data, index it and browse it in a portal
                    before committing to a deployment.
                  </P2>

                  <span className="text-section">
                    You need{" "}
                    <a
                      href={DOCKER_DOWNLOAD}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Docker Desktop
                    </a>{" "}
                    and a clone of the repository. Two <code>make</code> commands
                    bring the platform up at <code>localhost:3000</code>.
                  </span>

                  <Terminal
                    prompts={[
                      "git clone https://github.com/overture-stack/prelude.git",
                    ]}
                  />

                  <span className="text-section">
                    The documentation carries the current prerequisites, the
                    resource settings Docker needs, and what each phase adds.
                  </span>

                  <div className="ow:mt-8 lower-blue-section__buttons">
                    <Button
                      link={PRELUDE_DOCS_LINK}
                      size="medium"
                      type="primary"
                      className="upper-grey__button ow:mt-2"
                    >
                      Guides &amp; Documentation
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <img
        src={`${ASSETS}/cube_teal_blue.svg`}
        alt=""
        className="teal-blue-cube"
      />

      <img
        src={`${ASSETS}/cube_chartreuse.svg`}
        alt=""
        className="chartreuse-cube"
      />

      <section className="lower-grey section bg-grey">
        <div className="lower-grey__container">
          <h2 className="upper-grey__text lower-grey__text">
            Build. Deploy. Discover. <br />
            Craft tomorrow&apos;s data solution, today.
          </h2>
        </div>
      </section>

      {/* floating bright teal cube */}
      <div>
        <img
          src={`${ASSETS}/cube_bright_teal.svg`}
          alt=""
          className="bright-teal-cube"
        />
      </div>
    </MarketingPage>
  );
}
