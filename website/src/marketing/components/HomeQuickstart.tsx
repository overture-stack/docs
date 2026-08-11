import React from "react";
import useBrokenLinks from "@docusaurus/useBrokenLinks";
import Button from "./Button";
import Link from "./Link";
import Terminal from "./Terminal";
import { H2, H3, P1 } from "./Typography";
import { quickstartPortalUrl, quickstartSteps } from "../data/quickstart";
import { PRELUDE_DOCS_LINK } from "../constants/externalLinks";

const PORTAL_SCREENSHOT = "/img/marketing/home/overtureQuickstartPortal.webp";

/**
 * The quickstart, at the foot of the home page.
 *
 * Restores the Gatsby home page's "Getting Started" band, which phase 1 ported
 * and phase 4 removed (.dev/ia-proposal.md finding 5, that a second copy of the
 * setup steps goes stale the moment the first one moves). Back on the
 * developer's own call, with the commands mirrored from the documentation
 * rather than rewritten: see data/quickstart.ts, which is the one file to check
 * against `docs/deploy-docs/01-prelude.md` when Prelude's setup changes.
 *
 * It is the last thing on the page deliberately. The hero's "Get Started"
 * button now points here rather than out to the documentation, so the page's
 * first CTA and its last section are the same offer, and a visitor who scrolls
 * the whole way lands on something they can run.
 *
 * The commands are the content, so they carry the width: the screenshot is
 * decoration and drops out below `lg`, where two columns of this would leave
 * the terminal blocks too narrow to read a command without wrapping it.
 */
export default function HomeQuickstart() {
  // The hero's button is an in-page link to `#quickstart`, and Docusaurus's
  // broken-anchor check only knows about anchors something registers. A plain
  // React page registers none on its own; same reason ProductGroup does this.
  useBrokenLinks().collectAnchor("quickstart");

  return (
    <section
      className="HomeQuickstart section"
      id="quickstart"
      aria-labelledby="quickstart-heading"
    >
      <div className="container">
        <div className="ow:max-w-3xl">
          <H2 className="ow:text-left" id="quickstart-heading">
            Run it yourself
          </H2>
          <div className="yellow-bar ow:my-6" />
          <P1>
            Prelude stands the whole stack up on your own machine: no cloud
            account, nothing to provision, and four steps from an empty
            directory to a working portal.
          </P1>
        </div>

        <div className="HomeQuickstart__body">
          <ol className="HomeQuickstart__steps">
            {quickstartSteps.map((step, index) => (
              <li key={step.id} className="HomeQuickstart__step">
                <H3 className="HomeQuickstart__stepTitle">
                  <span className="HomeQuickstart__stepNumber" aria-hidden="true">
                    {index + 1}
                  </span>
                  {step.title}
                </H3>
                {step.note && <p className="HomeQuickstart__note">{step.note}</p>}
                {step.commands && (
                  <Terminal commands={step.commands} label={step.title} />
                )}
                {step.link && (
                  <Link
                    to={step.link.href}
                    className="ow:text-lg ow:font-bold ow:text-link"
                  >
                    {step.link.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>

          {/* Decoration, so it is `alt=""` and last in the source order: what
              the portal looks like is the payoff, not a step. */}
          <div className="HomeQuickstart__figure">
            <img
              src={PORTAL_SCREENSHOT}
              alt=""
              className="HomeQuickstart__screenshot"
            />
          </div>
        </div>

        <p className="HomeQuickstart__outcome">
          Your portal is then at <code>{quickstartPortalUrl}</code>.
        </p>

        <div className="ow:mt-8">
          <Button link={PRELUDE_DOCS_LINK} size="medium" type="primary">
            Guides and documentation
          </Button>
        </div>
      </div>
    </section>
  );
}
