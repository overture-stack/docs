import React from "react";
import MarketingPage from "../MarketingPage";
import Button from "../components/Button";
import HeroDiagram from "../components/HeroDiagram";
import HomeCapabilities from "../components/HomeCapabilities";
import HomeCollaborate from "../components/HomeCollaborate";
import HomeDocs from "../components/HomeDocs";
import HomeQuickstart from "../components/HomeQuickstart";
import LogoCarousel from "../components/LogoCarousel";
import { ComponentHighlightProvider } from "../context/ComponentHighlightContext";
import { H1, P1 } from "../components/Typography";

export default function HomePage() {
  return (
    <MarketingPage
      className="HomePage"
      title="Home"
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
              <H1>Build. Deploy. Discover.</H1>
              <P1>
                Open-source software for building platforms to collect,
                discover, and reuse research data.
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
