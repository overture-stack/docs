import React from "react";
import MarketingPage from "../../marketing/MarketingPage";
import Button from "../../marketing/components/Button";
import HeroDiagram from "../../marketing/components/HeroDiagram";
import HomeCapabilities from "../../marketing/components/HomeCapabilities";
import HomeCollaborate from "../../marketing/components/HomeCollaborate";
import HomeDocs from "../../marketing/components/HomeDocs";
import HomeQuickstart from "../../marketing/components/HomeQuickstart";
import LogoCarousel from "../../marketing/components/LogoCarousel";
import { ComponentHighlightProvider } from "../../marketing/context/ComponentHighlightContext";
import { H1, P1 } from "../../marketing/components/Typography";

/**
 * The marketing home page. One job, unchanged since .dev/ia-proposal.md § Home:
 * get each of the three audiences to the right second page inside one scroll.
 *
 * Four bands under the hero group, each answering a different question, in the
 * order a visitor asks them (see .dev/home-rebuild-plan.md):
 *
 *   1. **What can I do with this?** `HomeCapabilities`. It replaced a band that
 *      led with a platform's name, which answered "who uses this" instead. Same
 *      evidence, inverted: the capability is the heading, the platform proves it.
 *   2. **Who do I talk to?** `HomeCollaborate`. What to contact us about and how
 *      to do it.
 *   3. **Where do I read?** `HomeDocs`, one column per hands-on journey.
 *   4. **Can I just run it?** `HomeQuickstart`, which is where the hero's first
 *      button lands.
 *
 * The first two have swapped places twice, each time on the developer's call,
 * and are now back to capabilities first: the hero says what Overture is and the
 * carousel says who runs it, so the next thing a visitor asks is what it does,
 * not who we are. `HomeCollaborate` reads as the staffed route offered just
 * ahead of the two self-serve ones below it.
 *
 * The background colours have never moved with them. The band right under the
 * carousel is white and the one after it is grey, whichever content is in them,
 * so the page's colour rhythm and its floating cubes are unchanged by either
 * swap and only the content order is: pages/_home.scss keeps `grey-bg` and
 * `--card-tile-bg` on the slot rather than on the band, which is why a swap here
 * is two edits there and not a repaint.
 *
 * Gone with this rebuild: the "Publicly funded, openly built" band, whose one
 * substantive claim is now a paragraph inside `HomeCollaborate` and whose three
 * links are the row at that band's foot. It was a second ending in front of the
 * quickstart.
 *
 * Still owed: the funder logos and the labelled Collect / Explore / Control
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
              <div className="Hero__small-buttons-container">
                {/* Points at the quickstart at the foot of this page, not out
                    to the documentation: the page's first CTA and its last
                    section are now the same offer. A bare hash goes to the
                    browser rather than the router, see Link.tsx. */}
                <Button link="#quickstart" size="medium" type="primary">
                  Run Quickstart
                </Button>
                {/* Points at the documentation band further down this page,
                    not out to the docs site: same in-page pattern as Run
                    Quickstart above. A bare hash goes to the browser rather
                    than the router, see Link.tsx. */}
                <Button link="#docs" size="medium" type="primary">
                  Read Documentation
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

      <HomeCapabilities />
      <HomeCollaborate />
      <HomeDocs />
      <HomeQuickstart />
    </MarketingPage>
  );
}
