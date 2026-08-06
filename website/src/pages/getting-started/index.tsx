import React from "react";
import MarketingPage from "../../marketing/MarketingPage";
import Link from "../../marketing/components/Link";
import NoteBox from "../../marketing/components/NoteBox";
import YellowButton from "../../marketing/components/YellowButton";
import { Icon } from "../../marketing/components/Icon";
import { Terminal } from "../../marketing/components/Terminal";
import { H2, H3, P2, P3 } from "../../marketing/components/Typography";
import {
  API_REFERENCE_GUIDE,
  DOCKER_DOWNLOAD,
  DOCS_COMMUNITY,
  DOCS_DEPLOY,
  DOCS_DEVELOP,
  DOCS_USE,
  DOCUMENTATION_LINK,
  OVERTURE_DOCUMENTATION_CONTRIBUTION_LINK,
  OVERTURE_GITHUB_DISCUSSION_LINK,
} from "../../marketing/constants/externalLinks";

const QUICKSTART_SCREENSHOT =
  "/img/marketing/getting-started/overtureQuickstartPortal.webp";

/**
 * The site's one deliberate handoff into the documentation: the four journeys
 * with a line each, above the Quickstart and prerequisites content.
 */
export default function GettingStartedPage() {
  return (
    <MarketingPage
      className="GettingStartedPage"
      title="Overture Getting Started"
      description="Overture is about flexible solutions that meet the diverse needs of the scientific community. Here's how you can get started with our software."
    >
      <section className="grey-bg">
        <div className="container">
          <div className="upper-grey-section__holder">
            <div className="upper-grey-section__title-holder">
              <H2>Run our QuickStart</H2>
            </div>
            <div className="upper-grey-section__content-holder">
              {/* The img holding div below displays in mobile/tablet view.*/}
              <div className="upper-grey-section__img-holder upper-grey-section__mobile-tablet-img-holder">
                <img
                  alt="QuickStart screenshot"
                  src={QUICKSTART_SCREENSHOT}
                  className="img"
                />
              </div>
              <div className="upper-grey-section__text-holder">
                <P2 className="text-section">
                  <b>
                    1. Download and configure{" "}
                    <Link to={DOCKER_DOWNLOAD}>Docker Desktop (4.39.0+)</Link>
                  </b>
                </P2>

                <span className="text-section">
                  In Docker Desktop click the cog{" "}
                  <Icon
                    alt=""
                    img="cog"
                    size={32}
                    style={{ verticalAlign: "middle" }}
                  />{" "}
                  icon , then resources. We recommend at minimum setting your
                  CPU limit to <code>8</code>, memory to <code>8GB</code>, swap
                  to <code>4GB</code>, with <code>64GB</code> of virtual disk
                  space available. If you have Docker already installed ensure
                  it is up to date.
                </span>

                <P2 className="text-section">
                  <b>2. Clone the QuickStart Repository</b>
                </P2>

                <div className="relative">
                  <Terminal
                    prompts={[
                      "git clone  -b quickstart https://github.com/overture-stack/prelude.git && cd prelude",
                    ]}
                  />
                </div>
                <P2 className="text-section">
                  <b>3. Run the Docker Compose</b>
                </P2>

                <div className="relative">
                  <span className="text-section">For Unix/macOS run:</span>
                  <Terminal prompts={["make platform"]} />
                  <span className="text-section">For Windows run:</span>
                  <Terminal prompts={["./make.bat platform"]} />
                  <span className="text-section">
                    Your portal will now be accessible from your:{" "}
                    <code>localhost:3000</code>
                  </span>
                </div>
              </div>
              {/* The img holding div below displays in desktop view.*/}
              <div className="upper-grey-section__desktop-img-holder upper-grey-section__img-holder">
                <img
                  alt="Overture Quickstart screenshot"
                  src={QUICKSTART_SCREENSHOT}
                  className="upper-grey-section__img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="upper-grey-section white-bg">
        <div className="container">
          <div>
            <H2>Explore Our Resources</H2>

            <div className="text-subtitle">
              <P2>
                Guides and documentation to get you started using our platform
              </P2>
            </div>
          </div>

          <div className="text-section">
            <H3>Four Ways In</H3>
            <P2>
              Our documentation is organized by what you are trying to do. Each
              section below is a starting point on{" "}
              <Link to={DOCUMENTATION_LINK}>docs.overture.bio</Link>.
            </P2>
          </div>

          <div className="list-section">
            <ul className="doc-column">
              <li className="bullet-item">
                <Link to={DOCS_DEPLOY}>Deploy:</Link> stand up an Overture
                platform, component by component, from authorization through to
                the data portal.
              </li>
              <li className="bullet-item">
                <Link to={DOCS_USE}>Use:</Link> submit and retrieve data, and
                administer a running platform.
              </li>
              <li className="bullet-item">
                <Link to={DOCS_DEVELOP}>Develop:</Link> reference for each
                component, including configuration and the{" "}
                <Link to={API_REFERENCE_GUIDE}>API reference</Link>.
              </li>
              <li className="bullet-item">
                <Link to={DOCS_COMMUNITY}>Community:</Link> support,
                contributing, licensing, and how to cite Overture.
              </li>
            </ul>
          </div>

          <div>
            <NoteBox
              icon="notes2"
              title="Help us make our docs better"
              className="getting-started-notebox"
            >
              If you can&apos;t find what you are looking for, please let us
              know{" "}
              <b>
                <Link to={OVERTURE_GITHUB_DISCUSSION_LINK}>
                  using our ideas discussion forum.
                </Link>
              </b>
            </NoteBox>
          </div>
        </div>
      </section>

      {/* lower grey section */}
      <section className="lower-grey-section grey-bg">
        <div className="container">
          <div className="lower-grey-section__holder">
            <div className="lower-grey-section__titles-holder">
              <div className="lower-grey-section__title-holder">
                <h1 className="lower-grey-section__title">
                  Connect with Our Community
                </h1>
              </div>
              <div className="lower-grey-seciton__subtitle-holder">
                <P3 className="lower-grey-section__subtitle-mobile-tablet">
                  Join us in contributing software tools that accelerate
                  scientific discovery.
                </P3>
                <P3 className="lower-grey-section__subtitle-desktop">
                  Get help, share knowledge, and stay current.
                </P3>
              </div>
            </div>
            <div className="lower-grey-section__yellow-buttons-holder">
              <YellowButton
                link={OVERTURE_DOCUMENTATION_CONTRIBUTION_LINK}
                img_src="githubYellow"
                alt=""
                title="Get Involved"
              />
              <YellowButton
                link={OVERTURE_GITHUB_DISCUSSION_LINK}
                img_src="githubFindUs"
                alt=""
                title="Reach Out"
              />
            </div>
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}
