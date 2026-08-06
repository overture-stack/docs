import React from "react";
import MarketingPage from "../../marketing/MarketingPage";
import Button from "../../marketing/components/Button";
import Hero from "../../marketing/components/Hero";
import ProductsPageSection from "../../marketing/components/ProductsPageSection";
import { H2, P1 } from "../../marketing/components/Typography";
import { GETTING_STARTED_PATH } from "../../marketing/constants/pages";

const ASSETS = "/img/marketing/products";

/**
 * The products page covers the whole stack, so the site and the documentation
 * agree on what Overture contains.
 *
 * Lectern, Lyric and Stage are new here: they were never on the Gatsby page,
 * and the retired products (Ego and the rest) went with `constants/products.js`
 * at source. The three new sections carry no artwork, because none exists yet;
 * ProductsPageSection renders without it.
 */
export default function ProductsPage() {
  return (
    <MarketingPage
      className="ProductsPage"
      title="Overture Products"
      description="Modular software components for scalable data management systems."
    >
      <Hero
        title="Our Products"
        subtitle="Linking the gaps between data and discovery."
      />

      {/* Song section - grey background */}
      <ProductsPageSection
        src={`${ASSETS}/img_products_song.svg`}
        title="Song"
        subtitle="Metadata Submission, Tracking & Validation"
        description="Song governs the submission, validation and tracking of genomic metadata across multiple cloud storage systems. With minimal human intervention, multiple contributors can create structured metadata repositories full of accessible, interoperable, and reusable data."
        features={[
          {
            icon: "productMetadataValidation",
            title: "Metadata Validation",
            text: "All data submissions adhere to user-defined standards and structure",
          },
          {
            icon: "productMetadataTracking",
            title: "Metadata Tracking",
            text: "Automated global identifiers tracks metadata across geographically distributed Song repositories",
          },
          {
            icon: "productStateControls",
            title: "State Controls",
            text: "Control the publication status of data with configurable data states",
          },
        ]}
        isGrey
      />

      {/* Score section - white background */}
      <ProductsPageSection
        src={`${ASSETS}/img_products_score.svg`}
        title="Score"
        subtitle="File transfer and Object Storage"
        description="Score simplifies data transfer and storage to and from the cloud. File bundling and resumable download features make it easy to transfer large data sets, while BAM and CRAM slicing enables users to segment large genomic files into manageable portions."
        features={[
          {
            icon: "productHighTransfer",
            title: "Multi-Platform Support",
            text: "Support for AWS S3, Azure Storage, Google Cloud and more",
          },
          {
            icon: "productSamtools",
            title: "Built-in SamTools",
            text: "Including BAM and CRAM file slicing",
          },
          {
            icon: "productCloudSupport",
            title: "Robust File Transfers",
            text: "Resumable multipart uploads and downloads",
          },
        ]}
      />

      {/* Maestro section - grey background */}
      <ProductsPageSection
        src={`${ASSETS}/img_products_maestro.svg`}
        title="Maestro"
        subtitle="Indexing of Distributed Data"
        description="Unifies genomic metadata dispersed across numerous Song repositories into a single, searchable Elasticsearch index."
        features={[
          {
            icon: "productMultipleSongsIndex",
            title: `Multi "Song" Indexing`,
            text: "Connect to one or multiple Song servers and produce a single Elasticsearch index",
          },
          {
            icon: "productMultipleIndexLevels",
            title: "Multiple Indexing Levels",
            text: "Control indexing of discrete units of data",
          },
          {
            icon: "productSlackIntegration",
            title: "Slack Integration",
            text: "Send notifications through a Slack webhook integration",
          },
        ]}
        isGrey
      />

      {/* Arranger section - white background */}
      <ProductsPageSection
        src={`${ASSETS}/img_products_arranger.svg`}
        title="Arranger"
        subtitle="Data Portal API and UI component generation"
        description="A data-agnostic search API built alongside a collection of reusable UI components. Arranger allows admins to configure functional data portals from any Elasticsearch index, enabling users to query data, build cohorts, and export filtered data for further analysis and interpretation."
        features={[
          {
            icon: "productSearchAPI",
            title: "Search API Generation",
            text: "Generate a GraphQL API from any Elasticsearch Index",
          },
          {
            icon: "productBuiltInUIComponents",
            title: "Built-In UI Components",
            text: "Prop up a front end web portal for users to filter and query your data",
          },
          {
            icon: "productAdministrativeUI",
            title: "Highly Configurable",
            text: "Helping you create a customized discovery portal",
          },
        ]}
      />

      {/* Lectern section - grey background */}
      <ProductsPageSection
        title="Lectern"
        subtitle="Data Dictionary Management"
        description="Lectern manages collections of data dictionaries: schemas that define the structure, constraints and relationships of a data model. It tracks how those dictionaries change over time and exposes them through a REST API, so a platform has one authoritative description of the data it accepts."
        features={[
          {
            icon: "productMultipleSongsIndex",
            title: "Schema Definition",
            text: "Define the structure, constraints and relationships of your data elements",
          },
          {
            icon: "productStateControls",
            title: "Version Control",
            text: "Track how data structures change over time, and compare any two versions",
          },
          {
            icon: "productMetadataValidation",
            title: "Schema Validation",
            text: "Check dictionary schemas against the Lectern base meta-schema before they are used",
          },
        ]}
        isGrey
      />

      {/* Lyric section - white background */}
      <ProductsPageSection
        title="Lyric"
        subtitle="Tabular Data Submission"
        description="Lyric is a model-agnostic submission service for structured tabular data. It validates each submission against a Lectern dictionary, lets contributors correct their data before committing it, and keeps a full audit trail of every change."
        features={[
          {
            icon: "productMetadataValidation",
            title: "Schema-Driven Validation",
            text: "Every submission is validated against the Lectern dictionary it names",
          },
          {
            icon: "productHighTransfer",
            title: "Staged Submissions",
            text: "Contributors revise and revalidate their data before anything is committed",
          },
          {
            icon: "productMultipleIndexLevels",
            title: "Change History",
            text: "A complete audit trail of every submission and update, for data governance",
          },
        ]}
      />

      {/* Stage section - grey background */}
      <ProductsPageSection
        src={`${ASSETS}/img_DMS.svg`}
        title="Stage"
        subtitle="Data Portal User Interface"
        description="Stage is a React-based scaffold for browser-accessible data portals. It supplies the navigation, authentication and data exploration components a portal needs, so teams customize a working front end rather than building one from scratch."
        features={[
          {
            icon: "productBuiltInUIComponents",
            title: "Modular Architecture",
            text: "A component-based structure built for customizing and extending the interface",
          },
          {
            icon: "productSingleSignOn",
            title: "Identity and Access",
            text: "Login and profile pages wired to Keycloak, including SSO identity providers",
          },
          {
            icon: "productAdministrativeUI",
            title: "Theme Customization",
            text: "Fine-grained control over the appearance of individual components",
          },
        ]}
        isGrey
      />

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
                      Built from our core collection of microservices, we
                      provide an Overture Quickstart for a fast and frictionless
                      setup of our data platform locally.
                    </span>
                  </P1>
                </div>
                <div className="lower-blue-section__button-holder">
                  <Button
                    link={GETTING_STARTED_PATH}
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
