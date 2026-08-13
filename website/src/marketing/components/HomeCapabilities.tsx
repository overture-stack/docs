import React from "react";
import CardTile from "./CardTile";
import { H2, P1 } from "./Typography";
import { capabilities } from "../data/capabilities";
import { platforms } from "../data/platforms";
import { IMPACT_PATH } from "../constants/pages";

/**
 * "What you can do with Overture", the first band under the hero group, ahead of
 * `HomeCollaborate`. It was the second band for one round; the hero and the
 * carousel between them say what Overture is and who runs it, and this is the
 * band that says what those groups do with it, so it follows them directly.
 *
 * It replaces the "Running in production since 2016" band, which led with a
 * platform's name and so answered "who uses this" rather than "what is this
 * for". Same evidence, inverted: the capability is the heading and the platform
 * is what proves it. Copy is data/capabilities.ts; the platform each one cites
 * is resolved out of data/platforms.ts by id, so nothing here can drift from
 * /impact/.
 *
 * The three aggregate figures that sat above the cards are gone: a row of
 * numbers between the heading and the four claims delayed the claims without
 * supporting any one of them. Two of them (platform count, release history)
 * moved into LogoCarousel's hint line, next to the logos they are counting.
 *
 * Each capability is now a `CardTile`, the same tile `HomeDocs` uses further
 * down, so the two card bands on this page are one component and not two
 * lookalikes. It takes the whole card being one link, which is what settled a
 * question this band had left open: the four claims differ by up to five lines,
 * and with each one in its own box their link lines sit on the floor of the box
 * rather than trailing whatever length the sentence above happened to be.
 *
 * Every card opens with a screenshot, because the claim under it is that these
 * are running systems and a screenshot is the cheapest proof of that a page can
 * carry. Three of them are their platform's own portal, resolved by id out of
 * data/platforms.ts like the name and the launch year already are, so a shot
 * cannot end up on a card that cites a different platform. The fourth has no
 * production deployment behind it and carries its own, labelled as a mockup.
 */
export default function HomeCapabilities() {
  return (
    // White, because it is the first band under the blue carousel; the grey went
    // to `HomeCollaborate` below when the two swapped, so the page's colours
    // stayed where they were. The tiles take the grey this band gave up, via
    // `--card-tile-bg` in pages/_home.scss.
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
            documentation band below is built from. They were four columns
            separated by a yellow rule across the top, which is what the tile's
            edges do now; the tile also gives the band the thing that layout
            could not, a link line on the floor of every card rather than
            wherever the outcome sentence happened to end. */}
        <ul className="HomeCapabilities__grid">
          {capabilities.map((capability) => {
            const platform = platforms.find(
              (entry) => entry.id === capability.platform,
            );

            // `?highlight={id}#{id}`, not `platform.href`'s bare fragment:
            // the same param partnerLogos.ts sends LogoCarousel's logos to
            // /impact/ with, so a card here lands on its platform's row with
            // the persistent `ImpactTable__highlight`, not just the brief
            // `:target` flash a bare fragment gives.
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
