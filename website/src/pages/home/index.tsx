import React from "react";
import MarketingPage from "../../marketing/MarketingPage";
import Button from "../../marketing/components/Button";
import HeroDiagram from "../../marketing/components/HeroDiagram";
import HomeQuickstart from "../../marketing/components/HomeQuickstart";
import Link from "../../marketing/components/Link";
import LogoCarousel from "../../marketing/components/LogoCarousel";
import { ComponentHighlightProvider } from "../../marketing/context/ComponentHighlightContext";
import { H1, H2, H3, P1 } from "../../marketing/components/Typography";
import { offers } from "../../marketing/data/collaboration";
import metrics from "../../marketing/data/metrics";
import { featuredPlatforms } from "../../marketing/data/platforms";
import {
  ABOUT_US_PATH,
  COLLABORATE_PATH,
  FUNDING_PATH,
  IMPACT_PATH,
  PRODUCTS_PATH,
  PUBLICATIONS_PATH,
} from "../../marketing/constants/pages";

/**
 * The marketing home page. One job, unchanged since .dev/ia-proposal.md § Home:
 * get each of the three audiences to the right second page inside one scroll.
 *
 * Six bands became four. What the hero and the carousel above them already do
 * is the reason: the hero says what Overture is and HeroDiagram names all eight
 * components in its tooltips, and LogoCarousel says who runs it. Everything
 * after them was a seventh, eighth and ninth telling of the same two things, in
 * six sections of identical shape (centred heading, three columns of prose,
 * about half the band empty). Measured at 1440px, the page was 4763px tall.
 *
 * What went, and why:
 *
 *   - **"Modular, open, and yours to host"** (`HomePillars`, now deleted). Its
 *     copy is `distinctions` in data/components.ts, which /products/ already
 *     renders in full under "Where Overture is different". The argument is not
 *     lost, it is made once, on the page that exists to make it.
 *   - **"What Overture is made of"**, the Collect / Explore / Control band. A
 *     third pass at the product story, with a six-line Control paragraph naming
 *     Keycloak, directly under a diagram that shows the same grouping. The
 *     hero's "Learn More" carries the one link to /products/ this page needs.
 *   - **"Where to go next"**, the three doors. Each door survives as the thing
 *     itself: "deploy it" is the quickstart at the foot of the page, so it is a
 *     section rather than a promise of one; "collaborate with us" is its own
 *     band; "fund or partner" is the funders band that was already below it.
 *     Three doors, a funders band and a footer was three endings in a row.
 *   - **The separate proof band.** Its three figures are the credibility line
 *     for the deployments underneath them, so they are the top of that section
 *     now rather than a band of their own with a heading of its own.
 *
 * What arrived: the quickstart, at the foot. That reverses ia-proposal finding
 * 5 (a second copy of the setup goes stale the moment the first one moves) on
 * the developer's own call. data/quickstart.ts carries the rule that keeps it
 * honest, and names the docs file it mirrors.
 *
 * Still owed: the funder logos, and the labelled Collect / Explore / Control
 * diagram, both `[NEEDS:]` in .dev/roadmap.md. Each section is written to read
 * correctly without its artwork rather than to hold a gap open.
 */
export default function HomePage() {
  return (
    <MarketingPage
      className="HomePage"
      title="Overture - Home"
      description="Open-source microservices for building research data platforms: collect data, make it discoverable, and run the whole thing on infrastructure you control."
    >
      {/* 1. Hero, with the product story in it. Wrapped with LogoCarousel below
             in ComponentHighlightProvider: hovering a component here
             highlights, in the carousel, the platforms that use it
             (data/componentUsage.ts). */}
      <ComponentHighlightProvider>
        <div className="Hero">
          <div className="container">
            <section className="Hero__section">
              <H1>Connecting research through shared data.</H1>
              <P1>
                Overture is a collection of open-source software used for
                building platforms to store, organize and explore research data.
              </P1>
              {/* Institutional attribution, subtle but present: one line, here
                  rather than a band further down, because it is what makes
                  everything below it credible. See .dev/ia-proposal.md finding 10
                  for what this deliberately is not, namely a co-brand. */}
              {/* <p className="Hero__attribution">
                Developed and maintained by the{" "}
                <a
                  href={ABOUT_US_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Genome Informatics program
                </a>{" "}
                at the Ontario Institute for Cancer Research.
              </p> */}
              <div className="Hero__small-buttons-container">
                {/* Points at the quickstart at the foot of this page, not out
                    to the documentation: the page's first CTA and its last
                    section are now the same offer. A bare hash goes to the
                    browser rather than the router, see Link.tsx. */}
                <Button link="#quickstart" size="medium" type="primary">
                  Get Started
                </Button>
                <Button link={PRODUCTS_PATH} size="medium" type="primary">
                  Learn More
                </Button>
              </div>
            </section>
            <HeroDiagram />
          </div>
        </div>

        {/* 2. Who runs Overture, scrolling right below the hero: its own
               section, but the shared blue background reads as a continuation
               of the hero rather than a new one starting. */}
        <LogoCarousel />
      </ComponentHighlightProvider>

      {/* 3. Impact: the figures and the deployments they describe, in one
             section rather than two bands with a product band between them.
             Which three platforms is a data decision in platforms.ts (the
             `featured` flag), not a layout one. The cards carry no logos on
             purpose: LogoCarousel is showing them one section up. */}
      <section className="HomeImpact section" aria-labelledby="impact-heading">
        <div className="container">
          <H2 id="impact-heading">Running in production since 2016</H2>

          {/* Figures first, as one compact row: they are what makes the three
              cards under them credible, which is the whole reason the proof
              band merged into this section rather than keeping a heading of its
              own. Smaller than the 4xl they carried as a band of their own. */}
          <dl className="ow:mt-8 ow:grid ow:gap-6 ow:sm:grid-cols-3">
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
              <div key={stat.label} className="ow:flex ow:flex-col ow:gap-1">
                <dt className="ow:text-3xl ow:font-black ow:text-navy ow:first-letter:uppercase">
                  {stat.figure}
                </dt>
                <dd className="ow:text-base ow:text-ink">{stat.label}</dd>
              </div>
            ))}
          </dl>

          <ul className="ow:mt-12 ow:grid ow:gap-8 ow:md:grid-cols-3">
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

      {/* 4. How to work with the team. The three offers are `offers` in
             data/collaboration.ts, the same array /collaborate/ renders a
             section each from; this reads their `oneLine`, so the two pages
             describe the same three things and cannot drift apart. */}
      <section
        className="HomeCollaborate section grey-bg"
        aria-labelledby="collaborate-heading"
      >
        <div className="container">
          <div className="ow:max-w-3xl">
            <H2 className="ow:text-left" id="collaborate-heading">
              Work with the team
            </H2>
            <div className="yellow-bar ow:my-6" />
            <P1>
              We give time to around {metrics.annualEngagements.value} groups a
              year: platform demonstrations, needs assessments and technical
              guidance. Several of those conversations became platforms.
            </P1>
          </div>

          <ul className="ow:mt-10 ow:grid ow:gap-10 ow:md:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="ow:flex ow:flex-col ow:gap-3">
                <H3>{offer.title}</H3>
                <p className="ow:text-lg ow:leading-8 ow:text-navy">
                  {offer.oneLine}
                </p>
                {/* Into the section for this offer, not the top of the page:
                    /collaborate/ gives each one an id, and the anchor is what
                    makes three cards and one page not feel like a detour. */}
                <Link
                  to={`${COLLABORATE_PATH}#${offer.id}`}
                  className="ow:mt-auto ow:pt-3 ow:text-lg ow:font-bold ow:text-link"
                >
                  What this involves
                </Link>
              </li>
            ))}
          </ul>

          <div className="ow:mt-10 ow:flex ow:justify-center">
            <Button link={COLLABORATE_PATH} size="medium" type="primary">
              Collaborate with us
            </Button>
          </div>
        </div>
      </section>

      {/* 5. Funders and publication, absorbing the "fund or partner" door. The
             funder logos belong here, Canadian and American together; they are
             blocked on files, so this reads as prose until they arrive. */}
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

      {/* 6. The quickstart, last, which is where the hero's "Get Started"
             button lands. Commands mirrored from the documentation; see
             data/quickstart.ts. */}
      <HomeQuickstart />
    </MarketingPage>
  );
}
