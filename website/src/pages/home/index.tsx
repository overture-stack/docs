import React from "react";
import MarketingPage from "../../marketing/MarketingPage";
import Button from "../../marketing/components/Button";
import HomePillars from "../../marketing/components/HomePillars";
import Link from "../../marketing/components/Link";
import { H1, H2, H3, P1 } from "../../marketing/components/Typography";
import { groups } from "../../marketing/data/components";
import metrics from "../../marketing/data/metrics";
import {
  featuredPlatforms,
  platformLogos,
} from "../../marketing/data/platforms";
import {
  ABOUT_US_PATH,
  COLLABORATE_PATH,
  FUNDING_PATH,
  IMPACT_PATH,
  PRODUCTS_PATH,
  PUBLICATIONS_PATH,
} from "../../marketing/constants/pages";
import {
  DEMO_LINK,
  GI_PROGRAM_LINK,
  PRELUDE_DOCS_LINK,
} from "../../marketing/constants/externalLinks";

/**
 * The marketing home page, reordered in rebuild phase 4 to the sequence in
 * .dev/ia-proposal.md § Home. One job: get each of the three audiences to the
 * right second page inside one scroll.
 *
 * What went, and why, since this is mostly a subtraction:
 *
 *   - **The carousel.** Five case studies behind arrows, where a visitor saw one
 *     at a time and the other four were a click each. Three featured deployment
 *     cards linking to /impact/<platform>/ say more and hide nothing. This also
 *     retires the last home link into /case-studies/ fragments.
 *   - **"We are a team of software engineers, data scientists and cloud
 *     infrastructure specialists".** A taxonomy of roles reads like an org chart
 *     justifying headcount. The proposal rules against it, attribution is in the
 *     hero, and /about-us/ carries the story.
 *   - **The five-component catalogue.** It listed five of seven components with
 *     links into /products/ fragments. Orientation belongs here and the
 *     catalogue belongs on its own page, so this is now the Collect / Explore /
 *     Control shape and one link. Side effect: five of the six broken-anchor
 *     warnings in the build are gone with it.
 *   - **The Prelude walkthrough and terminal.** Setup instructions are the
 *     documentation's to own. This is finding 5 in the proposal, and the same
 *     reasoning that retired /getting-started/ in phase 1: a second copy of the
 *     quickstart goes stale the moment the first one moves. "Deploy it" is now
 *     one of the three doors and points straight at the docs.
 *   - **"Build. Deploy. Discover."** Both as the hero heading, which said nothing
 *     to anyone who did not already know what Overture is, and as the closing
 *     band that repeated it.
 *
 * Still owed: the Collect / Explore / Control diagram, which the proposal wants
 * high on this page as the orientation device, and the funder logos. Both are
 * blocked on files, see .dev/roadmap.md § Inputs needed. Each section is written
 * to read correctly without its artwork rather than to hold a gap open.
 */
export default function HomePage() {
  const [collect, explore, control] = groups;

  return (
    <MarketingPage
      className="HomePage"
      title="Overture - Home"
      description="Open-source microservices for building research data platforms: collect data, make it discoverable, and run the whole thing on infrastructure you control."
    >
      {/* 1. Hero, with the institutional attribution in it. */}
      <div className="Hero">
        <div className="container">
          <section className="Hero__section">
            <H1>Open-source building blocks for research data platforms</H1>
            <P1>
              Overture is a set of microservices for storing, organizing,
              exploring and sharing research data at scale. Take one component
              or the whole stack, and run it on infrastructure you control.
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

      {/* 2. Proof band, high. Figures from metrics.ts, logos from the platforms
             that have one. Longevity is the part the old band was missing. */}
      <section className="HomeProof section" aria-labelledby="proof-heading">
        <div className="container">
          <H2 id="proof-heading">Running in production since 2016</H2>

          <dl className="ow:mt-10 ow:grid ow:gap-8 ow:md:grid-cols-3">
            {[
              {
                figure: metrics.activePlatforms.value,
                label: "platforms in production today",
              },
              {
                figure: metrics.stableReleaseHistory.value,
                label: "of stable releases across the components",
              },
              {
                figure: metrics.firstDeployment.value,
                label: "first deployment, still running",
              },
            ].map((stat) => (
              <div key={stat.label} className="ow:flex ow:flex-col ow:gap-2">
                <dt className="ow:text-4xl ow:font-black ow:text-navy ow:first-letter:uppercase">
                  {stat.figure}
                </dt>
                <dd className="ow:text-lg ow:text-ink">{stat.label}</dd>
              </div>
            ))}
          </dl>

          <ul className="HomeProof__logos ow:mt-12 ow:flex ow:flex-wrap ow:items-center ow:justify-center ow:gap-10">
            {platformLogos.map((platform) => (
              <li key={platform.id}>
                <Link to={platform.href ?? IMPACT_PATH}>
                  <img
                    src={platform.logo}
                    alt={`${platform.name} logo`}
                    className="HomeProof__logo"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. The three pillars. */}
      <HomePillars />

      {/* 4. What Overture is made of. The diagram belongs here and does not
             exist yet, so the grouping is carried in words instead. The
             catalogue and the comparison stay on /products/. */}
      <section className="HomeStack section" aria-labelledby="stack-heading">
        <div className="container">
          <H2 id="stack-heading">What Overture is made of</H2>

          <ul className="ow:mt-10 ow:grid ow:gap-10 ow:md:grid-cols-3">
            {[collect, explore, control].map((group) => (
              <li key={group.id} className="ow:flex ow:flex-col ow:gap-3">
                <div className="yellow-bar" />
                <H3>{group.title}</H3>
                <p className="ow:text-lg ow:leading-8 ow:text-navy">
                  {group.blurb}
                </p>
              </li>
            ))}
          </ul>

          <div className="ow:mt-10 ow:flex ow:justify-center">
            <Button link={PRODUCTS_PATH} size="medium" type="primary">
              All seven components
            </Button>
          </div>
        </div>
      </section>

      {/* 5. Featured deployments, replacing the carousel. Which three is a data
             decision in platforms.ts, not a layout one. */}
      <section
        className="HomeFeatured section grey-bg"
        aria-labelledby="featured-heading"
      >
        <div className="container">
          <H2 id="featured-heading">Where it runs</H2>

          <ul className="ow:mt-10 ow:grid ow:gap-8 ow:md:grid-cols-3">
            {featuredPlatforms.map((platform) => (
              <li
                key={platform.id}
                className="ow:flex ow:flex-col ow:gap-3 ow:border-t-4 ow:border-accent ow:pt-6"
              >
                <H3>{platform.name}</H3>
                <p className="ow:text-base ow:text-ink">
                  Launched {platform.launched}
                </p>
                <p className="ow:text-lg ow:leading-8 ow:text-navy">
                  {platform.summary}
                </p>
                <Link
                  to={platform.href ?? IMPACT_PATH}
                  className="ow:mt-auto ow:pt-3 ow:text-lg ow:font-bold ow:text-link"
                >
                  How Overture is used here
                </Link>
              </li>
            ))}
          </ul>

          <div className="ow:mt-10 ow:flex ow:justify-center">
            <Button link={IMPACT_PATH} size="medium" type="primary">
              All deployments
            </Button>
          </div>
        </div>
      </section>

      {/* 6. Three doors, one per audience. */}
      <section className="HomeDoors section" aria-labelledby="doors-heading">
        <div className="container">
          <H2 id="doors-heading">Where to go next</H2>

          <ul className="ow:mt-10 ow:grid ow:gap-10 ow:md:grid-cols-3">
            {[
              {
                title: "Deploy it",
                text: "Prelude stands the whole stack up on your own machine, with no cloud account and nothing to provision. The documentation carries the prerequisites and each step.",
                cta: { label: "Read the docs", href: PRELUDE_DOCS_LINK },
              },
              {
                title: "Collaborate with us",
                text: "Academic partnership, consulting, or help getting past something. We join grant proposals as a co-applicant and give time to around eight groups a year.",
                cta: { label: "Work with the team", href: COLLABORATE_PATH },
              },
              {
                title: "Fund or partner",
                text: "Overture is sustained by public research funding, and every platform built on it extends what that funding paid for. Our funders are named in full.",
                cta: { label: "Who funds this", href: FUNDING_PATH },
              },
            ].map((door) => (
              <li key={door.title} className="ow:flex ow:flex-col ow:gap-3">
                <H3>{door.title}</H3>
                <p className="ow:text-lg ow:leading-8 ow:text-navy">
                  {door.text}
                </p>
                <Link
                  to={door.cta.href}
                  className="ow:mt-auto ow:pt-3 ow:text-lg ow:font-bold ow:text-link"
                >
                  {door.cta.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Funders and publication. The funder logos belong here, Canadian and
             American together; they are blocked on files, so this reads as
             prose until they arrive. */}
      <section
        className="HomeFunders section blue-bg"
        aria-labelledby="funders-heading"
      >
        <div className="container">
          <div className="ow:max-w-3xl">
            <H2 className="ow:text-left" id="funders-heading">
              Publicly funded, openly built
            </H2>
            <div className="yellow-bar ow:my-6" />
            <P1>
              Overture is built by a team of {metrics.teamSize.value} at a
              cancer research institute, on grants from Canadian and American
              public funders. The software is open source and the platforms
              built on it belong to the institutions that run them.
            </P1>
            <div className="ow:mt-8 ow:flex ow:flex-wrap ow:gap-8">
              <Link
                to={FUNDING_PATH}
                className="ow:text-lg ow:font-bold ow:text-link"
              >
                Our funders
              </Link>
              <Link
                to={PUBLICATIONS_PATH}
                className="ow:text-lg ow:font-bold ow:text-link"
              >
                Publications and how to cite us
              </Link>
              <Link
                to={ABOUT_US_PATH}
                className="ow:text-lg ow:font-bold ow:text-link"
              >
                Who builds Overture
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}
