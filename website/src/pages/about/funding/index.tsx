import React from "react";
import MarketingPage from "../../../marketing/MarketingPage";
import Hero from "../../../marketing/components/Hero";
import Link from "../../../marketing/components/Link";
import { H2, H3, L1, P2 } from "../../../marketing/components/Typography";
import { EMAIL_LINK } from "../../../marketing/constants/externalLinks";

const PCGL_LINK = "https://genomelibrary.ca/";
const GA4GH_LINK = "https://www.ga4gh.org/";
const VIRUSSEQ_PORTAL_LINK = "https://virusseq-dataportal.ca/";
const EMBL_EBI_LINK = "https://www.ebi.ac.uk/";
const FERRETTI_LAB_LINK = "https://ferlab.bio/a-propos";
const SANBI_LINK = "https://www.sanbi.ac.za/";

/**
 * The canonical funder page, replacing the retired /acknowledgements/.
 *
 * Content moves here from docs/community-docs/02-funding.md, which was the
 * maintained version while /acknowledgements/ listed two grants and went stale;
 * that file is now a pointer. Funder-facing content is canonical on the
 * marketing site, per .dev/ia-proposal.md § The boundary between the two sites.
 *
 * [NEEDS: logo files] Funder logos are wanted here and in the home page band.
 * The page reads correctly without them, so they can land later.
 */
export default function FundingPage() {
  return (
    <MarketingPage
      className="FundingPage"
      title="Overture Funding"
      description="The grants and organizations funding the development of Overture, an open-source platform developed and built by the Genome Informatics program at the Ontario Institute for Cancer Research."
    >
      {/* Keep the subtitle short: the hero graphic starts at 560px on
          desktop-up, and a longer first line runs underneath it. */}
      <Hero
        title="Funding"
        subtitle="The grants and organizations that make Overture possible."
      />

      {/* Digital Research Alliance of Canada */}
      <section>
        <div className="container">
          <div className="header">
            <H2>Digital Research Alliance of Canada</H2>
          </div>

          <div className="detail-holder">
            <div className="detail">
              <H3>2026 to 2028</H3>
              <P2>
                Under this grant we are transforming Overture from a data
                catalogue into an AI-assisted discovery and analysis platform.
                Using the Model Context Protocol (MCP), researchers will be able
                to explore, analyze, and visualize data through transparent,
                reproducible conversational workflows across Canadian research
                platforms including ICGC-ARGO, OHCRN, and iMicroSeq.
              </P2>
            </div>
          </div>
        </div>
      </section>

      {/* Canadian Institutes of Health Research */}
      <section className="grey-bg">
        <div className="container">
          <div className="header">
            <H2>Canadian Institutes of Health Research</H2>
          </div>

          <div className="detail-holder">
            <div className="detail">
              <H3>2023 to 2028</H3>
              <P2>
                As working group 2, we are developing a federated framework for
                genomic data access and analysis, specifically building an
                enhanced Overture data submission system to facilitate the
                ingestion, validation, and tracking of clinical and molecular
                data into the PCGL platform.
              </P2>
            </div>

            <div className="detail">
              <H3>Project</H3>
              <L1>
                <li>
                  <Link to={PCGL_LINK}>Pan-Canadian Genome Library (PCGL)</Link>
                </li>
              </L1>
            </div>
          </div>
        </div>
      </section>

      {/* National Cancer Institute */}
      <section>
        <div className="container">
          <div className="header">
            <H2>
              National Cancer Institute at the US National Institutes of Health
            </H2>
          </div>

          <div className="detail-holder">
            <div className="detail">
              <H3>2021 to 2026</H3>
              <P2>
                Under this grant we are making the Overture platform more
                accessible by breaking down barriers to adoption, integrating
                existing analysis tools and adding federated search
                functionality between distributed Overture instances using
                standardized data governance frameworks (
                <Link to={GA4GH_LINK}>GA4GH</Link>).
              </P2>
            </div>

            <div className="detail">
              <H3>Grant number</H3>
              <L1>
                <li>#U24CA253529</li>
              </L1>
            </div>
          </div>
        </div>
      </section>

      {/* Canadian COVID-19 Genomic Data Infrastructure */}
      <section className="grey-bg">
        <div className="container">
          <div className="header">
            <H2>Canadian COVID-19 Genomic Data Infrastructure</H2>
          </div>

          <div className="detail-holder">
            <div className="detail">
              <H3>2020 to 2024</H3>
              <P2>
                The{" "}
                <Link to={VIRUSSEQ_PORTAL_LINK}>VirusSeq Data Portal</Link>,
                since renamed iMicroSeq, demonstrated Overture&apos;s expansion
                beyond oncology data management. This funding adapted the
                platform to support viral genomic data, and enabled the
                development, deployment and ongoing maintenance of Canada&apos;s
                central SARS-CoV-2 sequence repository.
              </P2>
            </div>

            <div className="detail">
              <H3>Project</H3>
              <L1>
                <li>VirusSeq Data Portal, now iMicroSeq</li>
              </L1>
            </div>
          </div>
        </div>
      </section>

      {/* Government of Ontario */}
      <section>
        <div className="container">
          <div className="header">
            <H2>The Government of Ontario</H2>
          </div>

          <div className="detail-holder">
            <div className="detail">
              <P2>
                Overture is developed and built by the Genome Informatics
                program at the Ontario Institute for Cancer Research. Our team
                is partly supported through operational funding from the
                Government of Ontario via OICR, which receives core funding from
                the Government of Ontario through the Ministry of Colleges and
                Universities.
              </P2>
            </div>
          </div>
        </div>
      </section>

      {/* Additional support */}
      <section className="grey-bg">
        <div className="container">
          <div className="header">
            <H2>Additional Support</H2>
          </div>

          <div className="detail-holder">
            <div className="detail">
              <P2>
                We also thank the following organizations for their
                contributions to Overture.
              </P2>
              <L1>
                <li>
                  <Link to={EMBL_EBI_LINK}>
                    EMBL&apos;s European Bioinformatics Institute
                  </Link>
                  , for contributions to Lectern.
                </li>
                <li>
                  <Link to={FERRETTI_LAB_LINK}>
                    The Ferretti Lab at the Research Center of the CHU
                    Sainte-Justine
                  </Link>
                  , for contributions to Arranger.
                </li>
                <li>
                  <Link to={SANBI_LINK}>
                    The South African National Bioinformatics Institute (SANBI)
                  </Link>
                  , for feedback that identified documentation gaps and
                  improvements to the platform and its user experience.
                </li>
              </L1>
            </div>

            <div className="detail">
              <H3>Talk to us about funding</H3>
              <P2>
                For more information about our funding, or to discuss a
                potential collaboration, email us at{" "}
                <Link to={EMAIL_LINK}>contact@overture.bio</Link>.
              </P2>
            </div>
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}
