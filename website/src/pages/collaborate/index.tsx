import React from "react";
import useBrokenLinks from "@docusaurus/useBrokenLinks";
import MarketingPage from "../../marketing/MarketingPage";
import Button from "../../marketing/components/Button";
import Hero from "../../marketing/components/Hero";
import Link from "../../marketing/components/Link";
import { H2, H3, P1 } from "../../marketing/components/Typography";
import { engagements, offers } from "../../marketing/data/collaboration";
import metrics from "../../marketing/data/metrics";
import { EMAIL_LINK } from "../../marketing/constants/externalLinks";

/**
 * /collaborate/, which replaced /services/ in rebuild phase 4.
 *
 * Three changes from the page it replaces, all from .dev/ia-proposal.md:
 *
 *   - Academic partnership leads, because it is the highest-value ask. It used
 *     to be third, under technical support and consulting.
 *   - One contact route at the foot instead of the same email address repeated
 *     under each of the three offers.
 *   - The engagement record, which is what turns a menu into an invitation. The
 *     team gives time to roughly eight groups a year and several of the named
 *     ones became platforms; saying so is more persuasive than describing the
 *     offers again.
 *
 * "Services" read commercial for a not-for-profit. The offers did not change.
 */
export default function CollaboratePage() {
  // Docusaurus only knows about anchors something registers, and a plain React
  // page registers none on its own, so every `id` on this page reads as broken
  // to any other page linking at it. The home page's collaborate band is the
  // first thing to link into these three, which is why this was invisible
  // until now; same fix, same reason, as ProductGroup.
  const brokenLinks = useBrokenLinks();
  offers.forEach((offer) => brokenLinks.collectAnchor(offer.id));
  brokenLinks.collectAnchor("engagements");
  brokenLinks.collectAnchor("contact");

  return (
    <MarketingPage
      className="CollaboratePage"
      title="Collaborate with Overture"
      description="Academic partnership, consulting and technical support from the team that builds Overture. We are a not-for-profit: funds are reinvested into the software."
    >
      <Hero
        title="Collaborate"
        subtitle="Work with the team that builds Overture, on a grant proposal, a deployment, or a problem you are stuck on."
      />

      {offers.map((offer, index) => (
        <section
          key={offer.id}
          id={offer.id}
          className={`CollaborateOffer ow:scroll-mt-20 ${
            index % 2 === 1 ? "grey-bg" : ""
          }`}
          aria-labelledby={`${offer.id}-heading`}
        >
          <div className="container">
            <div className="ow:flex ow:flex-col ow:gap-8 ow:lg:flex-row ow:lg:items-center ow:lg:gap-16">
              {/* Artwork second in the source order so it reads after the
                  heading for a screen reader, and `lg:order-first` on the
                  alternating rows only, which is what gives the page its
                  left-right rhythm without reordering the content. */}
              <div
                className={`ow:lg:w-2/5 ${
                  index % 2 === 1 ? "ow:lg:order-last" : ""
                }`}
              >
                <img src={offer.image} alt="" className="ow:w-full" />
              </div>

              <div className="ow:lg:flex-1">
                <H2 className="ow:text-left" id={`${offer.id}-heading`}>
                  {offer.title}
                </H2>
                <div className="yellow-bar ow:my-6" />
                <P1>{offer.blurb}</P1>

                <ul className="ow:mt-6 ow:flex ow:flex-col ow:gap-2">
                  {offer.includes.map((item) => (
                    <li
                      key={item}
                      className="ow:text-lg ow:leading-8 ow:text-navy ow:list-disc ow:ml-6"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                {offer.selfServe && (
                  <Link
                    to={offer.selfServe.href}
                    className="ow:inline-block ow:mt-6 ow:text-lg ow:font-bold ow:text-link"
                  >
                    {offer.selfServe.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      <section
        className="CollaborateEngagements blue-bg ow:scroll-mt-20"
        id="engagements"
        aria-labelledby="engagements-heading"
      >
        <div className="container">
          <div className="ow:max-w-3xl">
            <H2 className="ow:text-left" id="engagements-heading">
              Who we have worked with
            </H2>
            <div className="yellow-bar ow:my-6" />
            <P1>
              The team gives time to around {metrics.annualEngagements.value}{" "}
              groups a year: platform demonstrations, needs assessments and
              technical guidance, across academic, clinical and government
              research. Several of those conversations became platforms.
            </P1>
          </div>

          <ul className="ow:mt-8 ow:flex ow:flex-wrap ow:gap-x-8 ow:gap-y-3">
            {engagements.map((engagement) => (
              <li
                key={engagement.name}
                className="ow:text-lg ow:leading-8 ow:text-navy"
              >
                <strong>{engagement.name}</strong>
                {engagement.outcome && ` (${engagement.outcome})`}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* One contact route, which is the whole point of the section. The old
          page printed the same address three times, once under each offer. */}
      <section
        className="CollaborateContact ow:scroll-mt-20"
        id="contact"
        aria-labelledby="contact-heading"
      >
        <div className="container">
          <div className="ow:max-w-3xl">
            <H3 id="contact-heading">Get in touch</H3>
            <p className="ow:mt-4 ow:text-lg ow:leading-8 ow:text-navy">
              Email us and say what you are building. We are a not-for-profit,
              so anything we charge for goes back into the software.
            </p>
            <div className="ow:mt-6">
              <Button link={EMAIL_LINK} type="primary" size="medium">
                contact@overture.bio
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}
