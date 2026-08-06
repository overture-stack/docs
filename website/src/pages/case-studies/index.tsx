import React, { useEffect, useRef, useState } from "react";
import MarketingPage from "../../marketing/MarketingPage";
import CaseStudy from "../../marketing/components/CaseStudy";
import CaseStudiesNav from "../../marketing/components/CaseStudiesNav";
import Hero from "../../marketing/components/Hero";
import caseData from "../../marketing/data/caseStudies";

/**
 * The Case Studies page: one section per case study, plus a logo strip that
 * jumps between them and tracks which one is on screen.
 *
 * The Gatsby version was a class component using react-waypoint for that
 * tracking. It is a function component here, and the tracking is an
 * IntersectionObserver: one fewer unmaintained dependency, and the effect runs
 * only in the browser, which is what Docusaurus's SSR needs.
 */
export default function CaseStudiesPage() {
  const [currentCase, setCurrentCase] = useState<string | null>(null);
  const [navFixed, setNavFixed] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const handleScroll = () => setNavFixed(window.scrollY > 254);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry) => {
            const title = (entry.target as HTMLElement).dataset.caseTitle;
            if (title) {
              setCurrentCase(title);
            }
          });
      },
      { threshold: 0 },
    );

    Object.values(sectionRefs.current).forEach((node) => {
      if (node) {
        observer.observe(node);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (slug: string) => {
    const node = sectionRefs.current[slug];
    if (!node) {
      return;
    }
    const top = node.getBoundingClientRect().top + window.scrollY - 190;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <MarketingPage
      className="CaseStudiesPage"
      title="Overture Case Studies"
      description="See how Overture is being used to tackle challenges across multiple projects."
    >
      {/* HERO */}
      <Hero
        title="Case Studies"
        subtitle="See how Overture is tackling diverse challenges across multiple projects."
      />

      {/* Case Study Interactive NavBar */}
      <CaseStudiesNav
        caseData={caseData}
        isFixed={navFixed}
        currentCase={currentCase}
        scrollTo={scrollTo}
      />

      {/* Case Study Component */}
      {caseData.map((data, index) => (
        <div
          key={data.slug}
          ref={(node) => {
            sectionRefs.current[data.slug] = node;
          }}
          data-case-title={data.title}
          style={{ backgroundColor: index % 2 === 0 ? undefined : "#F2F3F5" }}
        >
          <CaseStudy caseData={data} currentScreenshot={0} />
        </div>
      ))}
    </MarketingPage>
  );
}
