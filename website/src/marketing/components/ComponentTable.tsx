import React from "react";
import useBrokenLinks from "@docusaurus/useBrokenLinks";
import Link from "./Link";
import { H2 } from "./Typography";
import {
  componentIcon,
  componentsIn,
  groups,
  type ComponentGroupId,
} from "../data/components";

/**
 * The whole stack, as one table in one section.
 *
 * This replaces ProductGroup, which rendered Collect and Explore as two
 * alternating full-width bands with a row list each, and the Control prose
 * section that followed them. One table reads as one inventory: a reader
 * comparing two components no longer scrolls past a section boundary to do it,
 * and the page lost two bands of chrome without losing a line of copy. The
 * Collect / Explore / Control grouping survives as a group row inside the table
 * (`<th scope="colgroup">`), which is what the component diagram in
 * .dev/referenceMaterial/ groups them by and what the group blurbs explain.
 *
 * Control is the group that is not seven-eighths shipped: its blurb says what a
 * deployment does about access today (delegate to Keycloak) and links the how-to
 * for it, and its single row is the authorization service being built to replace
 * that arrangement, named TBD until it has a name and pointing at its repository
 * because there is no documentation to point at yet.
 *
 * Each component now carries its icon, the same artwork the home hero's diagram
 * uses for the same component (data/components.ts owns the path). The icons are
 * drawn at different aspect ratios, so each sits in a fixed square box and is
 * fitted inside it rather than sized directly.
 *
 * A real `<table>`, not a grid of divs, because this is tabular: three columns,
 * one row per component, and a group row that spans them. That does mean fighting
 * Infima's global table styles (cell borders, striped rows, `display: block`),
 * which is why the table's look lives in `_products.scss` rather than in `ow:`
 * utilities here — see the note there. Utilities are `!important` in this build,
 * so anything set here could not be overridden from SCSS afterwards.
 */
export default function ComponentTable() {
  // MDX headings and list items register their own anchors as they render, so
  // Docusaurus's broken-anchor check knows about them; a plain React page like
  // this one never does that registration on its own, so anything linking to a
  // group's or a component's id reads as broken even though the anchor is really
  // there. HeroDiagram is the first internal link into these ids.
  const brokenLinks = useBrokenLinks();

  const componentGroups: ComponentGroupId[] = ["collect", "explore", "control"];

  return (
    <section className="ProductsTable" aria-label="Overture's components">
      <div className="container">
        <table className="ProductsTable__table">
          <thead>
            <tr>
              <th scope="col">Component</th>
              <th scope="col">What it does</th>
              <th scope="col">Documentation</th>
            </tr>
          </thead>

          {componentGroups.map((groupId) => {
            const group = groups.find((candidate) => candidate.id === groupId)!;
            brokenLinks.collectAnchor(group.id);

            return (
              <tbody key={group.id}>
                <tr
                  className="ProductsTable__group ow:scroll-mt-20"
                  id={group.id}
                >
                  <th scope="colgroup" colSpan={3}>
                    <span className="ProductsTable__groupTitle">
                      {group.title}
                    </span>
                    <span className="ProductsTable__groupBlurb">
                      {group.blurb}
                    </span>
                    {group.link && (
                      <Link
                        to={group.link.to}
                        className="ProductsTable__groupLink"
                      >
                        {group.link.label}
                      </Link>
                    )}
                  </th>
                </tr>

                {componentsIn(groupId).map((component) => {
                  // The id is the anchor: /products/#song and its siblings are
                  // linked from the home hero's diagram and predate this page.
                  brokenLinks.collectAnchor(component.id);
                  return (
                    <tr
                      key={component.id}
                      id={component.id}
                      className="ow:scroll-mt-20"
                    >
                      <th scope="row">
                        {/* The flex row is a div inside the cell rather than
                            the cell itself: `display: flex` on a `th` stops it
                            being a table cell at all, and the browser wraps an
                            anonymous one around it. */}
                        <div className="ProductsTable__component">
                          <img
                            className="ProductsTable__icon"
                            src={componentIcon(component.id)}
                            alt=""
                          />
                          <span className="ProductsTable__name">
                            <span className="ProductsTable__nameFunctional">
                              {component.name}
                            </span>
                            {component.codename && (
                              <span className="ProductsTable__codename">
                                {component.codename}
                              </span>
                            )}
                          </span>
                        </div>
                      </th>
                      <td>{component.summary}</td>
                      <td>
                        {/* The visible words are enough beside the row's own
                            header, but a link read out of context is not, so
                            the accessible name carries the component too. */}
                        <Link
                          to={component.docs}
                          className="ProductsTable__docs"
                          aria-label={
                            component.linkAriaLabel ??
                            `${component.name} documentation`
                          }
                        >
                          {component.linkLabel ?? "Documentation"}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            );
          })}
        </table>
      </div>
    </section>
  );
}
