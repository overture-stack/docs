import React from "react";
import MarketingPage from "../../marketing/MarketingPage";
import CaseStudy from "../../marketing/components/CaseStudy";
import Hero from "../../marketing/components/Hero";
import Link from "../../marketing/components/Link";
import { H3 } from "../../marketing/components/Typography";
import { OVERTURE_DOCUMENTATION_FUNDING } from "../../marketing/constants/externalLinks";
import caseStudies from "../../marketing/data/caseStudies";
import metrics from "../../marketing/data/metrics";
import { platforms } from "../../marketing/data/platforms";

/**
 * The /impact/ hub: every deployment and every write-up on one page.
 *
 * The four platforms that had their own page under /impact/<slug>/ now render
 * their write-up here instead, in full. The card grid at the top is the link
 * tree into them, so the page reads top-down as a summary and jumps sideways
 * into whichever deployment the reader came for. Those four routes are retired
 * and redirect to the matching fragment here (see netlify/marketing-redirects.toml).
 *
 * The anchor ids live on the write-up sections, not on the cards: `CaseStudy`
 * puts `id={slug}` on its own section, and `Platform.id` is the same string, so
 * `/impact/#icgcargo` and the 301 from `/case-studies/#icgcargo` land on the
 * content rather than on a card that only summarizes it. That is also why the
 * cards carry an id only when there is no write-up to hold it — two elements
 * cannot share one.
 *
 * Two of the six cards have no write-up and no portal URL yet: OHCRN and PCGL.
 * They are listed regardless, because the aggregate band above them claims `7+`
 * platforms and showing four would read as a discrepancy.
 *
 * The adopters and lineage tiers and the published-work footer were cut from
 * this page. Both lists stay in `data/platforms.ts`: `lineage` because the home
 * page logo carousel reads it, `adopters` because the researched list is worth
 * keeping even with nothing rendering it.
 */

/**
 * The write-ups, in card order, paired with the platform they belong to.
 * `flatMap` rather than `filter` so the pair type carries no optional
 * `caseData`: a platform with no entry in caseStudies.tsx contributes nothing
 * instead of an entry with a hole in it.
 */
const writeUps = platforms.flatMap((platform) => {
  const caseData = caseStudies.find((entry) => entry.slug === platform.id);
  return caseData ? [{ platform, caseData }] : [];
});

const hasWriteUp = new Set(writeUps.map((entry) => entry.platform.id));

export default function ImpactPage() {
  return (
    <MarketingPage
      className="ImpactPage"
      title="Overture Impact"
      description="The research data platforms Overture runs in production, and how each of them uses it."
    >
      {/* No figure is typed into this page, here included: the subtitle reads
          from metrics.ts like everything else. */}
      <Hero
        title="Impact"
        subtitle={`In production on ${metrics.activePlatforms.value} platforms, the oldest of them running since ${metrics.firstDeployment.value}.`}
      />

      {/* Aggregate band. Every figure comes from data/metrics.ts; nothing here
          is typed in, which is the rule that stopped the last set going stale. */}
      <section
        className="ImpactAggregate grey-bg"
        aria-label="Overture at a glance"
      >
        <div className="container">
          {/* `key` is its own field rather than the label, because one label is
              an element now and cannot be a key. */}
          <dl className="ow:grid ow:gap-4 ow:sm:grid-cols-2 ow:lg:grid-cols-4">
            {[
              {
                key: "platforms",
                figure: metrics.activePlatforms.value,
                label: "platforms in production today",
              },
              {
                key: "releases",
                figure: metrics.stableReleaseHistory.value,
                label: "of stable releases across the components",
              },
              {
                key: "grants",
                figure: metrics.activeGrants.value,
                // The count is the one figure here a reader might want to check,
                // so the label carries the link to the list it was counted from
                // rather than a sentence under the band doing it.
                label: (
                  <>
                    active grants{" "}
                    <Link
                      to={OVERTURE_DOCUMENTATION_FUNDING}
                      className="ow:text-link"
                    >
                      funding
                    </Link>{" "}
                    the platform
                  </>
                ),
              },
              {
                key: "users",
                // ICGC-ARGO's figure, and the label says so. It is the only
                // platform whose user count the team holds, so the alternative
                // is not a platform-wide number, it is no number at all. See the
                // note on this metric before relabelling it as a total.
                figure: metrics.icgcArgoRegisteredUsers.value,
                label: "registered users on ICGC-ARGO alone",
              },
            ].map((stat) => (
              <div
                key={stat.key}
                className="ow:flex ow:flex-col ow:gap-1 ow:items-center ow:text-center"
              >
                {/* `first-letter:uppercase` for a figure metrics.ts spells as a
                    word: those read correctly mid-sentence in the subtitle above
                    but cannot start a stat tile in lower case. Numerals, which
                    all four of these are today, are unaffected. */}
                <dt className="ow:text-3xl ow:font-black ow:text-navy ow:first-letter:uppercase">
                  {stat.figure}
                </dt>
                <dd className="ow:text-base ow:text-ink">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* The link tree. Every platform is here; the four with a write-up link
          down to it, and the rest link out to their portal or nowhere yet. */}
      {/* No heading and no standfirst: the hero and the band above already say
          what these are, and the cards carry their own names. `aria-label` does
          the work `aria-labelledby` used to, so the section is still named for
          anyone navigating by landmark. */}
      <section
        className="ImpactTier ow:scroll-mt-20"
        id="platforms"
        aria-label="Platforms we build and run"
      >
        <div className="container">
          <ul className="ow:grid ow:gap-8 ow:md:grid-cols-2 ow:lg:grid-cols-3">
            {platforms.map((platform) => (
              <li
                key={platform.id}
                // Only the cards with nothing below them keep the id; see the
                // note at the top of this file. Do not tidy these to match the
                // old page slugs either way.
                id={hasWriteUp.has(platform.id) ? undefined : platform.id}
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
                  {hasWriteUp.has(platform.id) && (
                    // A bare hash, not `platform.href`: that one is the address
                    // other pages link in with, and going through the router to
                    // reach a section of the page already open would push a
                    // history entry and scroll nowhere (see components/Link).
                    <Link
                      to={`#${platform.id}`}
                      className="ow:text-lg ow:font-bold ow:text-link"
                    >
                      How Overture is used here
                    </Link>
                  )}
                  {platform.portal && (
                    <Link
                      to={platform.portal}
                      className="ow:text-lg ow:text-link"
                    >
                      Visit the platform
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The write-ups themselves, banded alternately so four of them in a row
          read as four sections rather than one long scroll. `CaseStudy` owns the
          `id`, the heading and the layout; the wrapper adds the background and
          the way back up to the link tree. */}
      {writeUps.map((entry, index) => (
        <div
          key={entry.platform.id}
          // Grey first, so the first write-up reads as a new band rather than
          // running on from the white section the link tree sits in.
          className={`ImpactWriteUp${index % 2 === 0 ? " grey-bg" : ""}`}
        >
          <CaseStudy caseData={entry.caseData} currentScreenshot={0} />
          <div className="ImpactWriteUp__back">
            <div className="container">
              <Link to="#platforms" className="ow:text-lg ow:text-link">
                Back to all platforms
              </Link>
            </div>
          </div>
        </div>
      ))}
    </MarketingPage>
  );
}
