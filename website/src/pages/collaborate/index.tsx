import React from "react";
import useBrokenLinks from "@docusaurus/useBrokenLinks";
import MarketingPage from "../../marketing/MarketingPage";
import Button from "../../marketing/components/Button";
import Hero from "../../marketing/components/Hero";
import Link from "../../marketing/components/Link";
import { H2, P1 } from "../../marketing/components/Typography";
import { offers } from "../../marketing/data/collaboration";
import { EMAIL_LINK } from "../../marketing/constants/externalLinks";

/**
 * /collaborate/, which replaced /services/ in rebuild phase 4.
 *
 * One change from the page it replaces, from .dev/ia-proposal.md: academic
 * partnership leads, because it is the highest-value ask. It used to be third,
 * under technical support and consulting.
 *
 * Two things were built here and then removed on request, and both eventually
 * landed somewhere else. The named engagement record ("Who we have worked
 * with") stayed gone from this page and is now a block inside the home page's
 * collaborate band, under the figure it used to open with. The closing
 * "Get in touch" section with
 * its own email button also went, on the reasoning that the footer's Contact
 * link already routes to the same address — but each offer without its own
 * self-serve route (Academic partnership, Consulting) has since gained its
 * own "Email us" button, so the CTA is back, just per-offer instead of once
 * at the foot of the page. Technical support keeps its own self-serve link to
 * the community forum instead, since that one has a real free alternative to
 * emailing.
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
            <div className="ow:flex ow:flex-col ow:gap-6 ow:lg:flex-row ow:lg:items-center ow:lg:gap-12">
              {/* Artwork second in the source order so it reads after the
                  heading for a screen reader, and `lg:order-first` on the
                  alternating rows only, which is what gives the page its
                  left-right rhythm without reordering the content. */}
              {/* Capped below `lg`: with no width limit of its own, this
                  illustration (several run portrait, taller than wide) filled
                  the full column width at a tablet size and stretched well
                  past 1000px tall, which is most of why these sections ran so
                  long. Uncapped again at `lg`, where the fixed `2/5` column
                  already limits it, so the desktop illustration keeps its
                  original size.

                  All three also get Technical support's own aspect ratio
                  (576:411, the one image here that was never a problem), so
                  every section is the same height. A crop (`object-cover`) was
                  tried here first: cropping to that ratio meant losing roughly
                  half of Consulting's taller illustration and slicing the
                  certificate on Academic partnership down to a floating dot,
                  which read as broken rather than tidy. `object-contain`
                  shrinks the whole illustration to fit instead, so nothing is
                  cut off; an illustration further from 576:411 just sits
                  smaller within the same box, with empty space to its sides
                  rather than losing content off the top or bottom. */}
              <div
                className={`ow:w-full ow:max-w-xs ow:mx-auto ow:lg:w-2/5 ow:lg:max-w-none ow:lg:mx-0 ow:aspect-[576/411] ${
                  index % 2 === 1 ? "ow:lg:order-last" : ""
                }`}
              >
                <img
                  src={offer.image}
                  alt=""
                  className="ow:h-full ow:w-full ow:object-contain"
                />
              </div>

              <div className="ow:lg:flex-1">
                <H2 className="ow:text-left" id={`${offer.id}-heading`}>
                  {offer.title}
                </H2>
                <div className="yellow-bar ow:my-6" />
                <P1 className="CollaborateOffer__blurb">{offer.blurb}</P1>

                <ul className="ow:mt-4 ow:flex ow:flex-col ow:gap-1.5">
                  {offer.includes.map((item) => (
                    <li
                      key={item}
                      className="ow:text-base ow:leading-7 ow:text-navy ow:list-disc ow:ml-6"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                {offer.selfServe ? (
                  <Link
                    to={offer.selfServe.href}
                    className="ow:inline-block ow:mt-4 ow:text-base ow:font-bold ow:text-link"
                  >
                    {offer.selfServe.label}
                  </Link>
                ) : (
                  // Technical support has a self-serve route (the community
                  // forum); the other two don't, so this is a direct email
                  // CTA instead — the button the closing "Get in touch"
                  // section used to carry, now per-offer rather than once at
                  // the foot of the page.
                  <div className="ow:mt-4">
                    <Button link={EMAIL_LINK} type="primary" size="medium">
                      contact@overture.bio
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}
    </MarketingPage>
  );
}
