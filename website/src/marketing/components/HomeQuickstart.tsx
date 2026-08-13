import React from "react";
import useBrokenLinks from "@docusaurus/useBrokenLinks";
import Button from "./Button";
import { Icon } from "./Icon";
import Link from "./Link";
import Terminal from "./Terminal";
import { H2, H3, P1 } from "./Typography";
import {
  quickstartClaim,
  quickstartPortalUrl,
  quickstartSteps,
} from "../data/quickstart";
import { WORKSHOP_DOCS_LINK } from "../constants/externalLinks";

const PORTAL_SCREENSHOT = "/img/marketing/home/overtureQuickstartPortal.webp";

/**
 * The quickstart, at the foot of the home page: an introduction, a blue band
 * under it, and the portal screenshot straddling the seam between the two.
 * The introduction carries the documentation band's own grey rather than
 * white, so that seam is the section's only colour change.
 *
 * Commands are mirrored from the documentation, not rewritten —
 * data/quickstart.ts names the files to check when the demo changes, and
 * derives the "3 steps, 2 commands" claim from the steps themselves so the
 * subtitle can't fall behind.
 *
 * Last on the page deliberately: the hero's first button points here, so
 * the page's first CTA and last section are the same offer, and scrolling
 * the whole way lands on something runnable.
 */
export default function HomeQuickstart() {
  // The hero's button links in-page to `#quickstart`; a plain React page
  // registers no anchors on its own for Docusaurus's broken-anchor check,
  // so this does it by hand (same as HomeDocs).
  useBrokenLinks().collectAnchor("quickstart");

  return (
    <section
      className="HomeQuickstart"
      id="quickstart"
      aria-labelledby="quickstart-heading"
    >
      {/* Same grey as the documentation band above, so the two read as one
          surface and the section's only colour break is the blue band below,
          where the screenshot crosses it. */}
      <div className="HomeQuickstart__intro">
        <div className="container">
          <H2 id="quickstart-heading">Getting Started</H2>
          <p className="HomeQuickstart__claim">
            <code>{quickstartClaim.steps}</code> Steps,{" "}
            <code>{quickstartClaim.commands}</code> Commands,{" "}
            <code>{quickstartClaim.platforms}</code> Platform
          </p>
          <P1 className="HomeQuickstart__lede">
            The Overture Quickstart enables a fast and frictionless setup of our
            data platform locally.
          </P1>
        </div>
      </div>

      <div className="HomeQuickstart__band">
        {/* Decorative (`alt=""`): what the portal looks like is the payoff,
            not a step. First in source order since it visually joins the two
            halves of the section; a screen reader reading an empty image
            first costs nothing. Outside `.container`: it's positioned
            against the blue band's own top edge, avoiding having to cancel
            `.container`'s padding. See _quickstart.scss. */}
        <div className="HomeQuickstart__figure">
          <img
            src={PORTAL_SCREENSHOT}
            alt=""
            className="HomeQuickstart__screenshot"
          />
        </div>

        <div className="container">
          <div className="HomeQuickstart__body">
            <ol className="HomeQuickstart__steps">
              {quickstartSteps.map((step, index) => (
                <li key={step.id} className="HomeQuickstart__step">
                  <H3
                    className="HomeQuickstart__stepTitle"
                    id={`quickstart-${step.id}`}
                  >
                    <span
                      className="HomeQuickstart__stepNumber"
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>
                    <span>
                      {step.title}
                      {step.titleLink && (
                        <>
                          {" "}
                          <Link
                            to={step.titleLink.href}
                            className="HomeQuickstart__stepLink"
                          >
                            {step.titleLink.label}
                          </Link>
                        </>
                      )}
                    </span>
                  </H3>

                  {step.note && (
                    <p className="HomeQuickstart__note">{step.note}</p>
                  )}

                  {step.settings && (
                    <div className="HomeQuickstart__settings">
                      <Icon
                        alt=""
                        img="cog"
                        size={26}
                        className="HomeQuickstart__cog"
                      />
                      <dl className="HomeQuickstart__settingsList">
                        {step.settings.map((setting) => (
                          <div
                            key={setting.label}
                            className="HomeQuickstart__setting"
                          >
                            <dt>{setting.label}</dt>
                            <dd>
                              <code>{setting.value}</code>
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}

                  {step.footnote && (
                    <p className="HomeQuickstart__note">{step.footnote}</p>
                  )}

                  {step.commands && (
                    <Terminal commands={step.commands} label={step.title} />
                  )}
                </li>
              ))}
            </ol>

            <p className="HomeQuickstart__outcome">
              Your portal will now be accessible from your{" "}
              <code>{quickstartPortalUrl}</code>.
            </p>

            <div className="HomeQuickstart__cta">
              <Button link={WORKSHOP_DOCS_LINK} size="medium" type="primary">
                Guides &amp; Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
