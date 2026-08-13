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
 * The whole stack, as one table: comparing two components no longer means
 * scrolling past a section boundary. The Collect / Explore / Control
 * grouping survives as a group row (`<th scope="colgroup">`), explained by
 * the group blurbs below.
 *
 * Control's blurb covers today's access delegation (Keycloak); its one row
 * is the authorization service being built to replace it — named TBD,
 * linked to its repo since there's no documentation yet.
 *
 * Each icon is the same artwork the home hero's diagram uses
 * (data/components.ts owns the path), fitted into a fixed square box since
 * they're drawn at different aspect ratios.
 *
 * A real `<table>`, not divs, since this is tabular data. Fighting Infima's
 * global table styles is why the look lives in `_products.scss` rather than
 * `ow:` utilities, which are `!important` here and couldn't be overridden
 * from SCSS.
 *
 * Used by is the reverse of /impact/'s Runs column, reading `usedBy` from
 * the same `data/deployments.ts` array /impact/ renders from, so a link here
 * can never land on a missing row. Text links, not icons, since several
 * deployments have no logo.
 *
 * More than one deployment collapses to a single "N deployments" link
 * (Arranger runs in seven) rather than naming each — hover/focus opens a
 * tooltip with the full list; clicking links to
 * `IMPACT_PATH?used-by={component.id}#{DEPLOYMENTS_ANCHOR}`, which
 * impact/index.tsx reads back to highlight every matching row (`:target`
 * can only point at one). Exactly one deployment still links straight to
 * its own row.
 *
 * The column headers repeat at the top of every group (`COLUMN_HEADERS`,
 * rendered again inside each `<tbody>`): with only the true `<thead>` at the
 * very top of the table, scrolling into Explore or Control loses the header
 * row entirely and a reader can no longer tell which column is which.
 */
export default function ComponentTable() {
  // MDX registers its own anchors for Docusaurus's broken-anchor check; a
  // plain React page like this never does, so links to these ids would read
  // as broken otherwise.
  const brokenLinks = useBrokenLinks();

  const componentGroups: ComponentGroupId[] = ["collect", "explore", "control"];

  // The "N deployments" tooltip: the full name list, in the same
  // floating-card style /impact/ uses (`floatingTooltipPosition`, shared).
  // Only one kind here, so state is just text and the trigger's rect.
  const [tooltip, setTooltip] = useState<{
    content: string;
    rect: DOMRect;
  } | null>(null);
  const showTooltip = (content: string) => (event: React.SyntheticEvent<HTMLElement>) => {
    setTooltip({ content, rect: event.currentTarget.getBoundingClientRect() });
  };
  const hideTooltip = () => setTooltip(null);

  // The component id to highlight on arrival, from /impact/'s Runs column
  // linking here as `?highlight={id}#{id}` — the mirror of this table's own
  // `used-by` link. Read in an effect, not during render, so initial markup
  // is unaffected.
  //
  // A row here is never one of several, so the fragment alone already
  // scrolls to it; this state adds the persistent highlight /impact/'s own
  // rows get, instead of just the brief `:target` flash.
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
