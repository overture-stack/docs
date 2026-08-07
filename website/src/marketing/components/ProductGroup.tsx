import React from "react";
import Link from "./Link";
import { H2, H3, P1 } from "./Typography";
import type { ComponentGroup, OvertureComponent } from "../data/components";

/**
 * One band of the products page: a group heading and its component rows.
 *
 * This replaces ProductsPageSection, which rendered one full-width section per
 * component with artwork, a description and three feature tiles. Seven of those
 * was a spec sheet the documentation site already does better, and it needed
 * three icons and a piece of section artwork per component that we do not have.
 * .dev/ia-proposal.md § /products/ replaced it with this: one row per component,
 * functional name with the codename beside it, one sentence, one link.
 *
 * Built with `ow:` utilities rather than a new SCSS partial, which is what
 * rebuild phase 2 settled on for new work. Two things to know before editing:
 * a utility is `!important` here and cannot be overridden from SCSS (remove the
 * utility instead of escalating), and the brand font comes from a rule in
 * `_products.scss`, because `.marketing` sets size and colour but not family.
 */
export type ProductGroupProps = {
  group: ComponentGroup;
  components: OvertureComponent[];
  /** Renders the band on the grey background, for alternating sections. */
  isGrey?: boolean;
};

export default function ProductGroup({
  group,
  components,
  isGrey,
}: ProductGroupProps) {
  return (
    <section
      className={`ProductGroup ow:scroll-mt-20 ${isGrey ? "grey-bg" : ""}`}
      id={group.id}
      aria-labelledby={`${group.id}-heading`}
    >
      <div className="container">
        <div className="ow:max-w-3xl">
          <H2 className="ow:text-left" id={`${group.id}-heading`}>
            {group.title}
          </H2>
          <div className="yellow-bar ow:my-6" />
          <P1>{group.blurb}</P1>
        </div>

        <ul className="ow:mt-10">
          {components.map((component) => (
            // The id is the anchor: /products/#song and its siblings are linked
            // from the home page and predate this page. See data/components.ts.
            <li
              key={component.id}
              id={component.id}
              className="ow:scroll-mt-20 ow:border-t ow:border-rule ow:py-8 ow:flex ow:flex-col ow:gap-4 ow:lg:flex-row ow:lg:gap-12"
            >
              <div className="ow:lg:w-2/6 ow:shrink-0">
                <H3>{component.name}</H3>
                <p className="ow:mt-1 ow:text-lg ow:text-ink">
                  {component.codename}
                </p>
              </div>

              <div className="ow:lg:flex-1">
                <p className="ow:text-lg ow:leading-8 ow:text-navy">
                  {component.summary}
                </p>
                <Link
                  to={component.docs}
                  className="ow:inline-block ow:mt-4 ow:text-lg ow:font-bold ow:text-link"
                >
                  {component.name} documentation
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
