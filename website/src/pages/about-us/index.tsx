import React from "react";
import MarketingPage from "../../marketing/MarketingPage";
import Hero from "../../marketing/components/Hero";
import Link from "../../marketing/components/Link";
import YellowButton from "../../marketing/components/YellowButton";
import { H1, H2, H3, P2, P3 } from "../../marketing/components/Typography";
import metrics from "../../marketing/data/metrics";
import {
  GI_PROGRAM_LINK,
  OVERTURE_DOCUMENTATION_CONTRIBUTION_LINK,
  OVERTURE_DOCUMENTATION_SUPPORT_LINK,
  OVERTURE_DOCUMENTATION_TEAM_LINK,
} from "../../marketing/constants/externalLinks";

/**
 * The page opens with who builds Overture, ahead of the values grid.
 *
 * Inverted in rebuild phase 1: being the software output of a named cancer
 * research institute is a credential for every audience the site has, and it
 * used to sit behind a slogan. The team is described as software engineers
 * rather than as a taxonomy of roles, per .dev/ia-proposal.md § Decided.
 *
 * [NEEDS: web-resolution file, plus confirmation that everyone pictured
 * consents to publication] A team photograph belongs in the opening section and
 * does more for the collaborator and funder audiences than another values grid.
 */
export default function AboutUsPage() {
  return (
    <MarketingPage
      className="AboutUsPage"
      title="Overture About Us"
      description="Overture is developed and built by the Genome Informatics program at the Ontario Institute for Cancer Research, a software engineering team building open-source tools for those advancing the knowledge and treatment of cancer."
    >
      {/* Hero */}
      <Hero
        title="About Us"
        subtitle="We build and deploy applications that help the data science community organize and share massive genomics datasets."
      />

      {/* white background section */}
      <section className="white-section">
        <div className="container">
          <div className="white-section__holder">
            {/* titles */}
            <div className="white-section__titles-holder">
              <div className="white-section__title-holder">
                <H3>Who builds Overture</H3>
              </div>

              <P2>
                Overture is developed and built by the{" "}
                <Link to={GI_PROGRAM_LINK}>Genome Informatics program</Link> at
                the Ontario Institute for Cancer Research, a software
                engineering team of {metrics.teamSize.value}. At OICR we build
                the software, databases and infrastructure that store, organize
                and compute over the large and complex datasets our cancer
                research programs generate. Embodying OICR&apos;s values of
                collaboration and community, we are firm believers in
                open-source and open-science, so our resources and expertise are
                shared with the data science community at large.{" "}
                <Link to={OVERTURE_DOCUMENTATION_TEAM_LINK}>
                  Meet the team
                </Link>
                .
              </P2>

              <div className="white-section__title-holder">
                <H3>The Overture Story</H3>
              </div>
              <P2>
                Overture&apos;s story began in 2017 when organizations started
                approaching us, seeking guidance on deploying ICGC components
                within their environments. At the same time, we were picking up
                new projects and found ourselves rebuilding the same
                foundational features. In pursuit of efficiency, we created
                Overture, a collection of modular microservices designed to
                expedite our application development in a scalable manner.
                Learning from past challenges, we&apos;ve refined our toolkit,
                which we&apos;re now eager to extend to the broader data science
                and research software community.
              </P2>
            </div>

            <div className="white-section__title-holder">
              <H2>Our Values</H2>
            </div>

            {/* yellow buttons */}
            <div className="white-section__yellow-button-holder">
              <YellowButton
                title="Open Source"
                img_src="aboutUsOpenSource"
                alt=""
                text="We are firm believers in open science. Our software is freely available, accessible and open to contributions from the community."
              />
              <YellowButton
                title="Modular"
                img_src="aboutUsModular"
                alt=""
                text="Each component is a distinct unit with a specific responsibility, designed to seamlessly integrate and scale into a comprehensive solution."
              />
              <YellowButton
                title="Extensible"
                img_src="aboutUsExtensible"
                alt=""
                text="Our components are expandable and customizable, allowing them to meet the specific needs of software engineers and data scientists."
              />
              <YellowButton
                title="Reusable"
                img_src="aboutUsReusable"
                alt=""
                text="Each component is designed for various contexts with minimal modifications, helping free developers from redundant tasks."
              />
            </div>
          </div>
        </div>
      </section>

      {/* grey background section */}
      <section className="grey-section grey-bg">
        <div className="container">
          <div className="grey-section__holder">
            <div className="grey-section__titles-holder">
              {/* titles div */}
              <div className="grey-section__title-holder">
                <H1>Lets Connect</H1>
              </div>
              <div className="grey-section__subtitle-holder">
                <P3>
                  Join us in contributing software tools that accelerate
                  scientific discovery.
                </P3>
              </div>
            </div>
            {/* yellow button div */}
            <div className="grey-section__yellow-button-holder">
              <YellowButton
                link={OVERTURE_DOCUMENTATION_CONTRIBUTION_LINK}
                img_src="githubYellow"
                alt=""
                title="Get Involved"
              />
              <YellowButton
                link={OVERTURE_DOCUMENTATION_SUPPORT_LINK}
                img_src="githubFindUs"
                alt=""
                title="Get in Touch"
              />
            </div>
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}
