import React from "react";
import Button from "./Button";
import { H2, H3, L1 } from "./Typography";
import type { CaseStudyData } from "../data/caseStudies";

/**
 * A case study is made up of a:
 * title, description, logo, list items, url, and a set of details and corresponding screenshots.
 */
export type CaseStudyProps = {
  caseData: CaseStudyData;
  currentScreenshot: number;
};

export default function CaseStudy({
  caseData,
  currentScreenshot,
}: CaseStudyProps) {
  const detail = caseData.details[currentScreenshot];

  return (
    <section className="Case-Study" id={caseData.slug}>
      <div className="container">
        <div className="case-heading">
          <H2>{caseData.title}</H2>
        </div>
        {/* top segment */}
        <div className=" top-segment">
          <div className="columns">
            {/* left paragraph */}
            <div className="column is-6">
              {React.cloneElement(caseData.description, {
                className: "case-description",
              })}
            </div>
            {/* right list */}
            <div className="column is-offset-0 top-bullets">
              <ul>
                {caseData.listItems[0].map((listItem) => (
                  <L1 key={listItem}>
                    <li className="client-list-item indent-group">
                      {listItem}
                    </li>
                  </L1>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Lower Container */}
        <div className="bottom-segment">
          <div className="columns">
            <div className="column is-6 img-holder">
              <img
                src={detail.screenshot}
                alt={`${caseData.title}: ${detail.description}`}
              />
            </div>

            <div className="column is-offset-0 ">
              <div className="lower-title-holder indent-group">
                <H3>How was Overture used?</H3>
              </div>
              <ul>
                {caseData.listItems[1].map((listItem) => {
                  const [component, usage] = Object.entries(listItem)[0];
                  return (
                    <L1 key={component}>
                      <li className="client-list-item indent-group">
                        <b>{component}</b> {usage}
                      </li>
                    </L1>
                  );
                })}
              </ul>
              <div className="button-holder indent-group">
                <Button type="primary" size="medium" link={caseData.clientLink}>
                  Check it out!
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
