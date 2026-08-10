import React from "react";
import MarketingPage from "../../marketing/MarketingPage";
import Button from "../../marketing/components/Button";
import Hero from "../../marketing/components/Hero";
import Link from "../../marketing/components/Link";
import ProductGroup from "../../marketing/components/ProductGroup";
import { H2, P1 } from "../../marketing/components/Typography";
import {
  OVERTURE_GITHUB_LINK,
  PRELUDE_DOCS_LINK,
} from "../../marketing/constants/externalLinks";
import {
  componentsIn,
  CONTROL_DOCS_LINK,
  distinctions,
  groups,
} from "../../marketing/data/components";

const ASSETS = "/img/marketing/products";

/**
 * What Overture is made of, grouped by what each part does.
 *
 * Rewritten in rebuild phase 3 against .dev/ia-proposal.md § /products/. What
 * it replaced was seven near-identical sections of three feature tiles each,
 * one per component, in codename order. Three things changed:
 *
 *   - The stack is grouped as Collect, Explore and Control, which is how the
 *     component diagram in .dev/referenceMaterial/ describes it, so an evaluator
 *     reads a shape rather than a catalogue.
 *   - Components are named functionally with the codename beside them, which is
 *     the house style fixed in the proposal. This is the page that teaches the
 *     pairing: someone who arrives knowing only "Arranger" leaves knowing it is
 *     the search service, and someone who needs search finds it without knowing
 *     any codename at all.
 *   - A "Where Overture is different" section, which is the most linkable
 *     content the site has and the thing an evaluator actually wants.
 *
 * The copy is data, in src/marketing/data/components.ts, so this file is a
 * layout and nothing on it needs a code change to reword.
 *
 * Still owed here: the Collect / Explore / Control diagram itself, which the
 * proposal puts at the top of this page and on the home page. It is blocked on
 * the source file, see .dev/roadmap.md § Inputs needed. The page is written to
 * read correctly without it rather than to hold a gap open.
 */
export default function ProductsPage() {
  const [collect, explore, control] = groups;

  return (
    <MarketingPage
      className="ProductsPage"
      title="Overture Products"
      description="Seven modular components for building research data platforms: collect data, make it discoverable, and keep control of who reaches it."
    >
      <Hero
        title="What Overture is made of"
        subtitle="Seven components, grouped by what they do. Take one where you have a gap, or the whole stack as a platform."
      />

      <ProductGroup group={collect} components={componentsIn("collect")} />

      <ProductGroup
        group={explore}
        components={componentsIn("explore")}
        isGrey
      />

      {/* Control is a band around the other two rather than a component we
          ship, so it renders as prose with no rows. */}
      <section
        className="ProductsControl ow:scroll-mt-20 blue-bg"
        id={control.id}
        aria-labelledby="control-heading"
      >
        <div className="container">
          <div className="ow:max-w-3xl">
            <H2 className="ow:text-left" id="control-heading">
              {control.title}
            </H2>
            <div className="yellow-bar ow:my-6" />
            <P1>{control.blurb}</P1>
            <Link
              to={CONTROL_DOCS_LINK}
              className="ow:inline-block ow:mt-6 ow:text-lg ow:font-bold ow:text-link"
            >
              Configuring access and authorization
            </Link>
          </div>
        </div>
      </section>

      <section
        className="ProductsDifferent ow:scroll-mt-20"
        id="compare"
        aria-labelledby="different-heading"
      >
        <div className="container">
          <H2 className="ow:text-left" id="different-heading">
            Where Overture is different
          </H2>
          <div className="yellow-bar ow:my-6" />

          <ul className="ow:mt-6 ow:grid ow:gap-6 ow:lg:grid-cols-2">
            {distinctions.map((distinction) => (
              <li
                key={distinction.title}
                className="ow:border-l-4 ow:border-rule ow:pl-6"
              >
                <p className="ow:text-lg ow:leading-8 ow:text-navy">
                  <strong>{distinction.title}.</strong> {distinction.text}
                </p>
              </li>
            ))}
          </ul>
          <p className="ow:mt-8 ow:max-w-3xl ow:text-lg ow:leading-8 ow:text-navy">
            All seven components are developed in the open at{" "}
            <Link to={OVERTURE_GITHUB_LINK} className="ow:font-bold">
              github.com/overture-stack
            </Link>
            .
          </p>
        </div>
      </section>

      {/* lower blue section */}
      <section className="lower-blue-section">
        <div className="lower-blue-section__container">
          <div className="lower-blue-section__holder">
            <div className="lower-blue-section__title-holder">
              <H2>Getting Started</H2>
            </div>
            {/* div with the blue background */}
            <div className="lower-blue-section__top-gradient"></div>
            <div className="lower-blue-section__content-holder">
              <div className="lower-blue-section__img-holder">
                <img
                  src={`${ASSETS}/overtureQuickstartPortal.webp`}
                  alt="Overture QuickStart Portal screenshot"
                  className="lower-blue-section__img"
                />
              </div>
              <div className="lower-blue-section__text-button-holder">
                <div className="lower-blue-section__text-holder">
                  <P1 className="lower-blue-section__text">
                    <span>
                      Built from our core collection of microservices, Prelude
                      stands the whole stack up locally so you can try it before
                      committing to a deployment.
                    </span>
                  </P1>
                </div>
                <div className="lower-blue-section__button-holder">
                  <Button
                    link={PRELUDE_DOCS_LINK}
                    type="primary"
                    size="medium"
                    className="lower-blue-section__button"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}
