import React from "react";
import Button from "./Button";
import YellowButton from "./YellowButton";
import { H2, H3, P1 } from "./Typography";
import { DOCS_DEVELOP } from "../constants/externalLinks";

export type ProductFeature = {
  /** Icon name, resolved through the Icon component's map. */
  icon: string;
  title: string;
  text: string;
};

export type ProductsPageSectionProps = {
  /** Section artwork. Optional: not every component has one yet. */
  src?: string;
  title: string;
  subtitle: string;
  description: string;
  features: [ProductFeature, ProductFeature, ProductFeature];
  isGrey?: boolean;
};

export default function ProductsPageSection({
  src,
  title,
  subtitle,
  description,
  features,
  isGrey,
}: ProductsPageSectionProps) {
  // Component reference lives under the Develop journey on docs.overture.bio,
  // where the path segment is the component's capitalized name.
  const userDocsLink = `${DOCS_DEVELOP}/${title}/overview`;
  const gitHubLink = `https://github.com/overture-stack/${title}`;

  return (
    <section
      className={`ProductsSection ${isGrey ? "grey-bg" : ""}`}
      id={title.toLowerCase()}
    >
      <div className="container">
        <div className="holder">
          {/* image/logo container */}
          {src && (
            <div className="image-holder">
              <img alt={`${title} logo`} src={src} />
            </div>
          )}

          {/* container of text and button */}
          <div className="text-content-holder">
            {/* title text */}
            <div className="title-holder">
              <H2>{title}</H2>
            </div>
            {/* subtitle text */}
            <div className="subtitle-holder">
              <H3>{subtitle}</H3>
            </div>
            {/* description text */}
            <div className="description-holder">
              <P1 className="description">{description}</P1>
            </div>
            {/* container of the two blue coloured buttons */}
            <div className="buttons-holder">
              <Button link={gitHubLink} type="primary" size="medium">
                GitHub
              </Button>
              <Button link={userDocsLink} type="primary" size="medium">
                Documentation
              </Button>
            </div>
          </div>

          {/* container of the three yellow buttons */}
          <div className="yellow-buttons-holder">
            {features.map((feature) => (
              <YellowButton
                key={feature.title}
                img_src={feature.icon}
                title={feature.title}
                text={feature.text}
                alt=""
                isProductPage={true}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
