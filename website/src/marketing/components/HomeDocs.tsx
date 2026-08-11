import React from "react";
import CardTile from "./CardTile";
import { H2, P1 } from "./Typography";
import { docJourneys } from "../data/docJourneys";

/**
 * The documentation band: one card per hands-on journey.
 *
 * The cards are `CardTile`, the documentation site's entry tile rebuilt on this
 * side of the build and shared with `HomeCapabilities` above. What is shared
 * with the documentation site outright is the part that would otherwise drift,
 * the journey colours (`--journey-*-color` in css/custom.css), so a "Browse
 * Deploy" line is the same teal on both.
 *
 * No deep links inside the cards and no "All documentation" button under them,
 * on the developer's call: three named destinations is the whole offer here, and
 * a card carrying four links no longer reads as one thing to click. The links
 * that were here are all reachable one click further in, from the journey
 * landing page each card opens.
 *
 * The Algolia search that briefly sat between the lede and the cards is gone
 * again, and the navbar's is the one that stays: with the navbar sticky it is
 * within reach from this scroll position anyway, and two search boxes on one
 * page split one affordance rather than offering two.
 *
 * Each card's "who it is for" line is quoted from that journey's own landing
 * page rather than written here, which is why data/docJourneys.ts names the files
 * to check. Every link is a cross-host docs.overture.bio URL that onBrokenLinks
 * cannot validate, so they go through the URL-check script instead.
 */
export default function HomeDocs() {
  return (
    <section
      className="HomeDocs section"
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
