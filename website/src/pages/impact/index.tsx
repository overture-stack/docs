import React from "react";
import MarketingPage from "../../marketing/MarketingPage";
import Hero from "../../marketing/components/Hero";
import Link from "../../marketing/components/Link";
import { H2, H3, P1 } from "../../marketing/components/Typography";
import metrics from "../../marketing/data/metrics";
import {
  adopters,
  lineage,
  platforms,
} from "../../marketing/data/platforms";
import { PUBLICATIONS_PATH } from "../../marketing/constants/pages";

/**
 * The /impact/ hub, added in rebuild phase 3 against .dev/ia-proposal.md.
 *
 * It replaces a flat list of five case studies with three tiers, because the
 * reference material distinguishes them and a single list does not: platforms
 * the team builds and runs, organizations that adopted the components on their
 * own, and the lineage the components came out of. The middle tier is new to
 * the site and is the most persuasive evidence on it.
 *
 * /case-studies/ is still live and still renders the old flat page. Phase 4
 * retires it, once the home page stops linking into its fragments, and writes
 * the 301. Until then the two coexist and nothing is user-visible either way,
 * since production still serves the Gatsby site.
 *
 * Three of the seven tier 1 cards do not link anywhere yet: OHCRN, PCGL and the
 * Drug Discovery Portal need a portal URL and their own page. They are listed
 * regardless, because the aggregate band above them claims seven platforms and
 * showing four would read as a discrepancy.
 */
export default function ImpactPage() {
  return (
    <MarketingPage
      className="ImpactPage"
      title="Overture Impact"
      description="Seven research data platforms in production, the organizations building on Overture independently, and the projects the components came out of."
    >
      {/* No figure is typed into this page, here included: the subtitle reads
          from metrics.ts like everything else. */}
      <Hero
        title="Impact"
        subtitle={`In production on ${metrics.activePlatforms.value} platforms, the oldest of them running since ${metrics.firstDeployment.value}.`}
      />

      {/* Aggregate band. Every figure comes from data/metrics.ts; nothing here
          is typed in, which is the rule that stopped the last set going stale. */}
      <section className="ImpactAggregate grey-bg" aria-label="Overture at a glance">
        <div className="container">
          <dl className="ow:grid ow:gap-8 ow:md:grid-cols-3">
            {[
              { figure: metrics.activePlatforms.value, label: "platforms in production today" },
              { figure: metrics.stableReleaseHistory.value, label: "of stable releases across the components" },
              { figure: metrics.firstDeployment.value, label: "first deployment, still running" },
            ].map((stat) => (
              <div key={stat.label} className="ow:flex ow:flex-col ow:gap-2">
                {/* `first-letter:uppercase` rather than a capitalized value in
                    metrics.ts: "seven" is the published form of that figure and
                    reads correctly mid-sentence, it just cannot start a stat
                    tile in lower case. Numerals are unaffected. */}
                <dt className="ow:text-4xl ow:font-black ow:text-navy ow:first-letter:uppercase">
                  {stat.figure}
                </dt>
                <dd className="ow:text-lg ow:text-ink">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        className="ImpactTier ow:scroll-mt-20"
        id="platforms"
        aria-labelledby="platforms-heading"
      >
        <div className="container">
          <div className="ow:max-w-3xl">
            <H2 className="ow:text-left" id="platforms-heading">
              Platforms we build and run
            </H2>
            <div className="yellow-bar ow:my-6" />
            <P1>
              Each one is a production deployment with its own institutions,
              governance and users. Overture is the layer underneath.
            </P1>
          </div>

          <ul className="ow:mt-10 ow:grid ow:gap-8 ow:md:grid-cols-2 ow:lg:grid-cols-3">
            {platforms.map((platform) => (
              // The id is the anchor today's /case-studies/#slug links land on
              // once that route redirects here. Do not tidy these to match the
              // page slugs.
              <li
                key={platform.id}
                id={platform.id}
                className="ow:scroll-mt-20 ow:flex ow:flex-col ow:gap-3 ow:border-t-4 ow:border-accent ow:pt-6"
              >
                <H3>{platform.name}</H3>
                {platform.launched ? (
                  <p className="ow:text-base ow:text-ink">
                    Launched {platform.launched}
                  </p>
                ) : (
                  <p className="ow:text-base ow:text-ink">In development</p>
                )}
                <p className="ow:text-lg ow:leading-8 ow:text-navy">
                  {platform.summary}
                </p>
                <div className="ow:mt-auto ow:pt-3 ow:flex ow:flex-col ow:gap-2">
                  {platform.href && (
                    <Link
                      to={platform.href}
                      className="ow:text-lg ow:font-bold ow:text-link"
                    >
                      How Overture is used here
                    </Link>
                  )}
                  {platform.portal && (
                    <Link to={platform.portal} className="ow:text-lg ow:text-link">
                      Visit the platform
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="ImpactTier blue-bg ow:scroll-mt-20"
        id="adopters"
        aria-labelledby="adopters-heading"
      >
        <div className="container">
          <div className="ow:max-w-3xl">
            <H2 className="ow:text-left" id="adopters-heading">
              Built on Overture independently
            </H2>
            <div className="yellow-bar ow:my-6" />
            <P1>
              Institutions running Overture components in their own stacks,
              without us. They chose the parts they needed and deployed them.
            </P1>
          </div>

          <ul className="ow:mt-10 ow:grid ow:gap-8 ow:md:grid-cols-2 ow:lg:grid-cols-3">
            {adopters.map((adopter) => (
              <li key={adopter.name} className="ow:flex ow:flex-col ow:gap-2">
                <H3>{adopter.name}</H3>
                <p className="ow:text-base ow:text-ink">{adopter.where}</p>
                <p className="ow:text-lg ow:leading-8 ow:text-navy">
                  {adopter.uses}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="ImpactTier ow:scroll-mt-20"
        id="lineage"
        aria-labelledby="lineage-heading"
      >
        <div className="container">
          <div className="ow:max-w-3xl">
            <H2 className="ow:text-left" id="lineage-heading">
              Lineage
            </H2>
            <div className="yellow-bar ow:my-6" />
            <P1>
              Where the components came from. These are not platforms the team
              runs today, and the site says so rather than counting them twice.
            </P1>
          </div>

          <ul className="ow:mt-10 ow:grid ow:gap-8 ow:md:grid-cols-2 ow:lg:grid-cols-3">
            {lineage.map((project) => (
              <li
                key={project.id}
                id={project.id}
                className="ow:scroll-mt-20 ow:flex ow:flex-col ow:gap-2"
              >
                <H3>{project.name}</H3>
                <p className="ow:text-lg ow:leading-8 ow:text-navy">
                  {project.summary}
                </p>
                <Link
                  to={project.link}
                  className="ow:mt-auto ow:pt-2 ow:text-lg ow:font-bold ow:text-link"
                >
                  Visit {project.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ImpactPublications grey-bg">
        <div className="container">
          <div className="ow:max-w-3xl">
            <H3>Published work</H3>
            <p className="ow:mt-4 ow:text-lg ow:leading-8 ow:text-navy">
              The Overture paper, the author list, and how to cite the software
              are on the{" "}
              <Link to={PUBLICATIONS_PATH} className="ow:font-bold">
                publications page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}
