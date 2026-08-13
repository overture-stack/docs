import React from "react";
import CardTile from "./CardTile";
import { H2, P1 } from "./Typography";
import { capabilities } from "../data/capabilities";
import { platforms } from "../data/platforms";
import { IMPACT_PATH } from "../constants/pages";

/**
 * "What you can do with Overture": four capability cards, each opening with a
 * screenshot as proof it's a running system. Copy is data/capabilities.ts;
 * the platform, name, launch year and screenshot each card cites are
 * resolved by id from data/platforms.ts, so none of it can drift from
 * /impact/. The fourth card has no real deployment behind it and carries a
 * labelled mockup instead.
 *
 * Uses `CardTile`, the same tile `HomeDocs` uses below, with the whole card
 * as one link: the four claims vary by up to five lines, and a per-card box
 * keeps each link flush with its own floor rather than trailing the
 * sentence above it.
 */
export default function HomeCapabilities() {
  return (
    // White, as the first band under the blue carousel; the grey went to
    // `HomeCollaborate` below when the two swapped, so colours stayed put.
    // Tiles take that grey back via `--card-tile-bg` in pages/_home.scss.
    <section
      className="HomeCapabilities section"
      aria-labelledby="capabilities-heading"
    >
      <div className="container">
        <H2 id="capabilities-heading" className="HomeCapabilities__title">
          What you can do with Overture
        </H2>
        {/* Same bar under the same size of heading as "What we do" in
            HomeCollaborate: the two bands open identically. */}
        <div className="yellow-bar ow:my-6" />
        <P1 className="HomeCapabilities__lede">
          Modular, flexible and reusable components, built for problems of all
          shapes and sizes.
        </P1>

        {/* Four cards on a two-by-two grid, the same `CardTile` the
            documentation band below is built from. These were four columns
            separated by a yellow rule; the tile's edges do that job now,
            plus a link line flush with every card's floor rather than
            wherever the outcome sentence ends. */}
        <ul className="HomeCapabilities__grid">
          {capabilities.map((capability) => {
            const platform = platforms.find(
              (entry) => entry.id === capability.platform,
            );

            // `?highlight={id}#{id}`, not `platform.href`'s bare fragment:
            // the same param partnerLogos.ts uses for LogoCarousel, so a
            // card here gets the persistent `ImpactTable__highlight`, not
            // just a `:target` flash.
            const href =
              capability.href ??
              (platform
                ? `${IMPACT_PATH}?highlight=${platform.id}#${platform.id}`
                : IMPACT_PATH);

            return (
              <CardTile
                key={capability.id}
                className="CardTile--split"
                title={capability.action}
                href={href}
                image={capability.screenshot ?? platform?.screenshot}
                imageBadge={capability.screenshotBadge}
                linkLabel={
                  capability.linkLabel ?? (platform ? `Read more` : "See where")
                }
              >
                <p>{capability.outcome}</p>
                {capability.note && (
                  <p className="CardTile__note">{capability.note}</p>
                )}
              </CardTile>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
