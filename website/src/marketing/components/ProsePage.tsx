import React from "react";
import MarketingPage from "../MarketingPage";
import { H1 } from "./Typography";

/**
 * The shell for the marketing site's prose routes (privacy, terms).
 *
 * Copy lives in Markdown under src/marketing/content/; the route file is
 * just a call to this component. The prose is editable without touching
 * React, which it wasn't at 476 lines of JSX.
 *
 * Markdown is imported as a component and rendered as `children`, rather
 * than as a `.mdx` page: Docusaurus's `MDXPage` theme wraps content in
 * Infima's grid/TOC and puts `wrapperClassName` on `<html>`, all of which
 * fights this layout. Importing instead keeps Docusaurus's page pipeline
 * out of it.
 *
 * Markdown emits plain `h2`, `p`, `ul` and `ol`, so the per-page partials
 * style those element selectors. No `MDXComponents` override: that mapping
 * is global and would reach the documentation pages too.
 */
export type ProsePageProps = {
  /** The `h1` in the hero. Markdown files carry no `#` of their own. */
  heading: string;
  title: string;
  description: string;
  /** Page class the matching SCSS partial hangs its prose rules off. */
  className: string;
  children: React.ReactNode;
};

export default function ProsePage({
  heading,
  title,
  description,
  className,
  children,
}: ProsePageProps) {
  return (
    <MarketingPage className={className} title={title} description={description}>
      <section className="hero bg-green">
        <div className="hero-body">
          <div className="container">
            <H1 className="ow:py-8">{heading}</H1>
          </div>
        </div>
      </section>

      <article className="container section ow:py-4">{children}</article>
    </MarketingPage>
  );
}
