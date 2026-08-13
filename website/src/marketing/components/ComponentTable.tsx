import React, { useEffect, useState } from "react";
import useBrokenLinks from "@docusaurus/useBrokenLinks";
import clsx from "clsx";
import Link from "./Link";
import { H2 } from "./Typography";
import { IMPACT_PATH } from "../constants/pages";
import {
  componentIcon,
  componentsIn,
  groups,
  type ComponentGroupId,
} from "../data/components";
import { DEPLOYMENTS_ANCHOR, usedBy } from "../data/deployments";
import { floatingTooltipPosition } from "../utils/floatingTooltip";
import { hoverIntentHandlers } from "../utils/hoverIntent";

/**
 * The column headers, written once so the real `<thead>` row and the row
 * repeated at the top of every group (see the note on `ComponentTable` below)
 * cannot say two different things.
 */
const COLUMN_HEADERS = ["Component", "What it does", "Documentation", "Used by"];

/**
 * The whole stack, as one table in one section.
 *
 * This replaces ProductGroup, which rendered Collect and Explore as two
 * alternating full-width bands with a row list each, and the Control prose
 * section that followed them. One table reads as one inventory: a reader
 * comparing two components no longer scrolls past a section boundary to do it,
 * and the page lost two bands of chrome without losing a line of copy. The
 * Collect / Explore / Control grouping survives as a group row inside the table
 * (`<th scope="colgroup">`), which is what the group blurbs below explain.
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
 * A real `<table>`, not a grid of divs, because this is tabular: four columns,
 * one row per component, and a group row that spans them. That does mean fighting
 * Infima's global table styles (cell borders, striped rows, `display: block`),
 * which is why the table's look lives in `_products.scss` rather than in `ow:`
 * utilities here — see the note there. Utilities are `!important` in this build,
 * so anything set here could not be overridden from SCSS afterwards.
 *
 * The fourth column, Used by, is the reverse of /impact/'s Runs column: each
 * component links out to the deployments running it, `IMPACT_PATH#anchorId`,
 * reading `usedBy` from `data/deployments.ts` — the same array /impact/ renders
 * its own table from, so a component here can never link to a deployment that
 * has no row to land on. Text links rather than icons, unlike Runs: there is no
 * normalized deployment-logo set the way `componentIcon` normalizes every
 * component to one square box, and several deployments here (the two
 * independent adopters, three of the platforms) have no logo at all.
 *
 * A component used by more than one deployment (Arranger runs in seven)
 * collapses to a single "N deployments" link rather than naming each one: a
 * list that long made that row by far the tallest in the table, on the one
 * column where a reader is here to check "is this used anywhere real" rather
 * than to read every name. Hovering or focusing it opens a tooltip with the
 * full list, and clicking it goes to `IMPACT_PATH?used-by={component.id}#{DEPLOYMENTS_ANCHOR}`
 * — the Deployments section, there being no single row among several to send
 * a reader to instead. impact/index.tsx reads the `used-by` param back out
 * client-side (its `highlightedComponent` state) and highlights every
 * matching row and, in each, the one Runs icon the reader actually asked
 * about, since `:target` can only ever point at one element. A component used
 * by exactly one deployment still names it and links straight to that
 * deployment's own row, the same as before collapsing existed.
 *
 * The column headers repeat at the top of every group (`COLUMN_HEADERS`,
 * rendered again inside each `<tbody>`): with only the true `<thead>` at the
 * very top of the table, scrolling into Explore or Control loses the header
 * row entirely and a reader can no longer tell which column is which.
 */
export default function ComponentTable() {
  // MDX headings and list items register their own anchors as they render, so
  // Docusaurus's broken-anchor check knows about them; a plain React page like
  // this one never does that registration on its own, so anything linking to a
  // group's or a component's id reads as broken even though the anchor is really
  // there. HeroDiagram is the first internal link into these ids.
  const brokenLinks = useBrokenLinks();

  const componentGroups: ComponentGroupId[] = ["collect", "explore", "control"];

  // The one tooltip a "N deployments" link opens: the full list of names, in
  // the same floating-card style /impact/'s own tooltip uses for a
  // component's name (`floatingTooltipPosition`, shared rather than
  // reimplemented). Only one kind here, unlike that page's two, so state is
  // just the text and the trigger's rect.
  const [tooltip, setTooltip] = useState<{
    content: string;
    rect: DOMRect;
  } | null>(null);
  const showTooltip = (content: string) => (event: React.SyntheticEvent<HTMLElement>) => {
    setTooltip({ content, rect: event.currentTarget.getBoundingClientRect() });
  };
  const hideTooltip = () => setTooltip(null);

  // The component id to highlight on arrival, from /impact/'s Runs column
  // (impact/index.tsx): each icon there links here as
  // `${PRODUCTS_PATH}?highlight={componentId}#{componentId}`, the mirror of
  // this table's own "N deployments" link, which carries `used-by` the other
  // way for the same reason — impact/index.tsx's `highlightedComponent`.
  // Read in an effect rather than during render, so this page's initial
  // markup is the same with or without the param and only gains the
  // highlight after mount.
  //
  // A row here is never one of several the way a "used-by" deployment can be,
  // so the fragment alone would already scroll to the right row and give it
  // the brief `:target` flash every anchor jump on this table gets (see
  // `tbody tr:target` in pages/_products.scss). This state gives it the same
  // persistent highlight /impact/'s own rows get instead, so a product
  // followed from a Runs icon reads the same way a deployment followed from
  // this table's Used by column does.
  const [highlightedComponentId, setHighlightedComponentId] = useState<
    string | null
  >(null);
  useEffect(() => {
    const componentId = new URLSearchParams(window.location.search).get(
      "highlight",
    );
    if (componentId) setHighlightedComponentId(componentId);
  }, []);

  // Clears the highlight on a click outside the highlighted row, the same
  // rule impact/index.tsx uses for its own `highlightedComponent` — see the
  // note there.
  useEffect(() => {
    if (!highlightedComponentId) return;
    const clearOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".ProductsTable__highlight")) {
        setHighlightedComponentId(null);
      }
    };
    document.addEventListener("click", clearOnOutsideClick);
    return () => document.removeEventListener("click", clearOnOutsideClick);
  }, [highlightedComponentId]);

  return (
    <section className="ProductsTable" aria-label="Overture's components">
      <div className="container">
        <table className="ProductsTable__table">
          <thead>
            <tr>
              {COLUMN_HEADERS.map((label) => (
                <th key={label} scope="col">
                  {label}
                </th>
              ))}
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
                  <th scope="colgroup" colSpan={4}>
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

                {/* Repeats the real `<thead>` row's words at the top of every
                    group; see the note on the component above. `th scope="col"`
                    here too, since these are column headers for the rows below
                    them and not row headers. */}
                <tr className="ProductsTable__columnHeader">
                  {COLUMN_HEADERS.map((label) => (
                    <th key={label} scope="col">
                      {label}
                    </th>
                  ))}
                </tr>

                {componentsIn(groupId).map((component) => {
                  // The id is the anchor: /products/#song and its siblings are
                  // linked from the home hero's diagram and predate this page.
                  brokenLinks.collectAnchor(component.id);
                  const deployments = usedBy(component.id);
                  return (
                    <tr
                      key={component.id}
                      id={component.id}
                      className={clsx(
                        "ow:scroll-mt-20",
                        component.id === highlightedComponentId &&
                          "ProductsTable__highlight",
                      )}
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
                      <td>
                        {deployments.length === 0 && "—"}
                        {deployments.length === 1 && (
                          <Link
                            to={`${IMPACT_PATH}#${deployments[0].anchorId}`}
                            className="ProductsTable__usedByLink"
                          >
                            {deployments[0].name}
                          </Link>
                        )}
                        {deployments.length > 1 && (
                          <Link
                            to={`${IMPACT_PATH}?used-by=${component.id}#${DEPLOYMENTS_ANCHOR}`}
                            className="ProductsTable__usedByLink"
                            aria-describedby="ProductsTable-tooltip"
                            {...hoverIntentHandlers(
                              showTooltip(
                                deployments.map((d) => d.name).join(", "),
                              ),
                              hideTooltip,
                            )}
                          >
                            {deployments.length} deployments
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            );
          })}
        </table>
      </div>

      {tooltip && (
        <div
          className="ProductsTable__tooltip"
          role="tooltip"
          id="ProductsTable-tooltip"
          style={floatingTooltipPosition(tooltip.rect, "below", {
            width: 220,
            estimatedHeight: 44,
          })}
        >
          {tooltip.content}
        </div>
      )}
    </section>
  );
}
