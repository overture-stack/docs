import React from "react";
import useBrokenLinks from "@docusaurus/useBrokenLinks";
import CardTile from "./CardTile";
import { H2, P1 } from "./Typography";
import { docJourneys } from "../data/docJourneys";

/**
 * The documentation band: one card per hands-on journey.
 *
 * Cards are `CardTile`, shared with `HomeCapabilities` above. Journey
 * colours (`--journey-*-color` in css/custom.css) are shared outright with
 * the documentation site, so a "Browse Deploy" line is the same teal on both.
 *
 * No deep links inside the cards and no "All documentation" button under
 * them: three named destinations is the whole offer, and a card with four
 * links no longer reads as one click. Those links are all one click
 * further in, from the journey landing page each card opens.
 *
 * No Algolia search here: the navbar's sticky one is already in reach, and
 * two search boxes on one page would split one affordance rather than add
 * a second.
 *
 * Each card's "who it is for" line is quoted from that journey's landing
 * page (data/docJourneys.ts names the files to check). Links are cross-host
 * docs.overture.bio URLs onBrokenLinks can't validate, so they go through
 * the URL-check script instead.
 */
export default function HomeDocs() {
  // The hero's second button links in-page to `#docs`; a plain React page
  // registers no anchors on its own for Docusaurus's broken-anchor check,
  // so this does it by hand (same as HomeQuickstart).
  useBrokenLinks().collectAnchor("docs");

  return (
    <section
      className="HomeDocs section"
      id="docs"
      aria-labelledby="docs-heading"
    >
      <div className="container">
        {/* Heading, bar and lede match `HomeCapabilities` above and "What we
            do" before it: the three bands open identically. */}
        <H2 id="docs-heading" className="HomeDocs__title">
          Getting hands on
        </H2>
        <div className="yellow-bar ow:my-6" />
        <P1 className="HomeDocs__lede">
          The documentation is organized by what you are doing rather than by
          what we built, so each journey starts from a different question.
        </P1>

        <ul className="HomeDocs__journeys">
          {docJourneys.map((journey) => (
            // The journey ids are the same three the documentation site names
            // its colours after, so the accent is composed rather than mapped
            // here: a fourth journey would arrive with its colour already set.
            <CardTile
              key={journey.id}
              title={journey.title}
              href={journey.href}
              linkLabel={`Browse ${journey.title}`}
              accent={`var(--journey-${journey.id}-color)`}
            >
              <p>{journey.audience}</p>
            </CardTile>
          ))}
        </ul>
      </div>
    </section>
  );
}
