import React from "react";
import Button from "./Button";
import { H2, P1 } from "./Typography";
import { OVERTURE_DOCUMENTATION_SUPPORT_LINK } from "../constants/externalLinks";

export type ServicesPageSectionProps = {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  items?: string[];
  buttonText?: string;
  contactMessage?: string;
  /** Customized css for the section with a grey background. */
  isGrey?: boolean;
  /** Customized css for the section with no list. */
  isNoList?: boolean;
};

export default function ServicesPageSection({
  src,
  alt,
  title,
  subtitle,
  items = [],
  buttonText,
  contactMessage,
  isGrey,
  isNoList,
}: ServicesPageSectionProps) {
  return (
    <section className={`ServicesPageSection ${isGrey ? "grey-bg" : ""}`}>
      <div className="container">
        <div className="ServicesPageSection__holder">
          <div
            className={`ServicesPageSection__img-holder ${
              isGrey ? "ServicesPageSection__flexbox-order" : ""
            }`}
          >
            <img src={src} alt={alt} className="ServicesPageSection__img" />
          </div>
          {/* div that holds all the text and button */}
          <div className="ServicesPageSection__text-holder">
            <div className="ServicesPageSection__title-holder">
              <H2 className="ServicesPageSection__title">{title}</H2>
            </div>
            <div className="ServicesPageSection__subtitle-holder">
              <P1>{subtitle}</P1>
              <ul className={isNoList ? "ServicesPageSection__no-list" : ""}>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            {buttonText && (
              <div className="ServicesPageSection__button-holder">
                <Button
                  link={OVERTURE_DOCUMENTATION_SUPPORT_LINK}
                  type="primary"
                  size="medium"
                  className="ServicesPageSection__button"
                >
                  {buttonText}
                </Button>
              </div>
            )}
            <div>
              <p className="ServicesPageSection__contact">{contactMessage}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
