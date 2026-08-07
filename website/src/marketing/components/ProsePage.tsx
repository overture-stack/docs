import React from "react";
import MarketingPage from "../MarketingPage";
import { H1 } from "./Typography";

/**
 * The shell for the marketing site's prose routes (privacy, terms).
 *
 * These pages are a hero and a single column of words, so their copy lives in
 * Markdown under src/marketing/content/ and the route file is just a call to
 * this component. That is the whole point of the split: the prose is editable
 * without touching React, which it was not while it was 476 lines of JSX.
 *
 * The Markdown is imported as a component and rendered as `children` rather than
 * the page being a `.mdx` file in src/pages/. Docusaurus does route `.mdx` there,
 * but its MDXPage theme component wraps the content in Infima's
 * `container container--fluid` plus a row/col grid and a table of contents, and
 * puts `wrapperClassName` on `<html>` rather than on the content wrapper. All
 * three fight this layout. Importing the Markdown instead keeps Docusaurus's
 * page pipeline out of it and costs one small file per route.
 *
 * Markdown emits plain `h2`, `p`, `ul` and `ol`, so the per-page partials style
 * those element selectors. There is no `MDXComponents` override, deliberately:
 * that mapping is global and would reach the documentation pages too.
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
