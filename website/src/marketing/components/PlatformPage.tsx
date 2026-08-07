import React from "react";
import MarketingPage from "../MarketingPage";
import CaseStudy from "./CaseStudy";
import Hero from "./Hero";
import Link from "./Link";
import caseStudies from "../data/caseStudies";
import { platforms } from "../data/platforms";
import { IMPACT_PATH } from "../constants/pages";

/**
 * One platform under /impact/, given its slug.
 *
 * The four platforms that carry forward from the old case studies page share
 * this shell, so each route file is a one-liner and the four pages cannot drift
 * apart. .dev/ia-proposal.md gives each platform its own URL, description and
 * social card; the description here is the same line the hub card shows, which
 * is what makes them consistent.
 *
 * The long-form content is still `caseStudies.tsx`, rendered by the same
 * CaseStudy component /case-studies/ uses. That is deliberate: the content was
 * good, the proposal asked for it to be addressable rather than rewritten, and
 * three of the seven platforms have no content at all yet. When /case-studies/
 * retires in phase 4, that data file becomes this section's alone.
 *
 * A slug with no matching platform or case study throws here, which fails the
 * build rather than rendering a page with holes in it.
 */
export type PlatformPageProps = {
  /** Matches both `Platform.id` and `CaseStudyData.slug`. */
  slug: string;
};

export default function PlatformPage({ slug }: PlatformPageProps) {
  const platform = platforms.find((entry) => entry.id === slug);
  const caseData = caseStudies.find((entry) => entry.slug === slug);

  if (!platform || !caseData) {
    throw new Error(
      `No platform (${!!platform}) or case study (${!!caseData}) for slug "${slug}". ` +
        "Both data/platforms.ts and data/caseStudies.tsx need an entry.",
    );
  }

  return (
    <MarketingPage
      className="PlatformPage"
      title={`${platform.name} and Overture`}
      description={platform.summary}
    >
      <Hero title={platform.name} subtitle={platform.summary} />

      <CaseStudy caseData={caseData} currentScreenshot={0} showTitle={false} />

      <section className="PlatformPage__back grey-bg">
        <div className="container">
          <Link
            to={IMPACT_PATH}
            className="ow:text-lg ow:font-bold ow:text-link"
          >
            All Overture deployments
          </Link>
        </div>
      </section>
    </MarketingPage>
  );
}
