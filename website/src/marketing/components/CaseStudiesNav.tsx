import React from "react";
import type { CaseStudyData } from "../data/caseStudies";

/**
 * The logo strip that jumps between case studies.
 *
 * In the Gatsby site this lived at `src/pages/case-studies/navigation.js`,
 * which published it as a route (`/case-studies/navigation`) by accident. It is
 * a component, so it lives with the other components here and that stray route
 * is gone.
 */
export type CaseStudiesNavProps = {
  caseData: CaseStudyData[];
  currentCase: string | null;
  isFixed: boolean;
  scrollTo: (slug: string) => void;
};

export default function CaseStudiesNav({
  caseData,
  currentCase,
  isFixed,
  scrollTo,
}: CaseStudiesNavProps) {
  const fixedClass = isFixed ? "nav-fixed" : "";

  return (
    <div className={`CaseStudies-Navigation ${fixedClass}`}>
      <div className="CaseStudies-Navigation__scroll-container">
        {caseData.map((data) => (
          <button
            key={data.slug}
            type="button"
            className="CaseStudies-Navigation__button"
            onClick={() => scrollTo(data.slug)}
          >
            <img
              alt={`${data.title} logo`}
              className={`nav-item ${currentCase === data.title ? "active" : ""}`}
              src={data.logo}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
