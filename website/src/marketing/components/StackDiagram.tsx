import React, { useState } from "react";
import Link from "./Link";
import { components } from "../data/components";
import {
  flowNodes,
  flowNodesMobile,
  flowEdges,
  flowPoint,
  flowNodeStorage,
  flowBand,
  flowBandMobile,
  flowControlLabel,
  flowControlLabelMobile,
  flowSearchIndex,
  flowSearchIndexMobile,
  type FlowNode,
  type FlowAnnotation,
} from "../data/componentFlow";
import { useComponentHighlight } from "../context/ComponentHighlightContext";
import { floatingTooltipPosition } from "../utils/floatingTooltip";
import { techIcons } from "../data/techIcons";

const CONTROL = components.find((c) => c.id === "control")!;

type TooltipState =
  | { node: FlowNode; rect: DOMRect }
  | { control: true; rect: DOMRect };

/** A `data/techIcons.ts` mark, inline rather than an `<img>`: `currentColor`
 * fill is what lets it pick up the same muted grey as the label beside it,
 * and brightens with it on hover/focus. */
function TechIconGlyph({ name, className }: { name: string; className?: string }) {
  const icon = techIcons[name];
  if (!icon) return null;
  return (
    <svg className={className} viewBox={icon.viewBox} aria-hidden="true">
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}

function edgePath(from: { x: number; y: number }, to: { x: number; y: number }): string {
  if (from.y === to.y) {
    return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  }
  // A diagonal edge gets an S-curve rather than a straight diagonal, so it
  // reads as a merge into the next node's lane instead of a line cutting
  // across the ones between them.
  const midX = (from.x + to.x) / 2;
  return `M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`;
}

type LayoutProps = {
  variant: "desktop" | "mobile";
  nodes: FlowNode[];
  band: { x: number; y: number; width: number; height: number; rx: number };
  controlLabel: { x: number; y: number };
  searchIndex: FlowAnnotation;
  highlightedComponent: string | null;
  getHref: (id: string) => string;
  onShowNode: (node: FlowNode) => (event: React.SyntheticEvent<HTMLElement>) => void;
  onShowControl: (event: React.SyntheticEvent<HTMLElement>) => void;
  onHide: () => void;
};

/**
 * One rendering of the flow: the same nodes and edges, laid out either
 * left-to-right (`flowNodes`, tablet-up) or top-to-bottom (`flowNodesMobile`,
 * below `mobile`) per `data/componentFlow.ts`. StackDiagram renders both and
 * `_stack-diagram.scss` shows whichever one applies, rather than reflowing
 * one layout in place: the node cards are fixed-size (labels have to stay
 * legible at any width), so the same coordinates can't serve both — see the
 * comment on `flowNodesMobile` for why this was checked against a real phone
 * screenshot rather than decided in the abstract.
 */
function StackDiagramLayout({
  variant,
  nodes,
  band,
  controlLabel,
  searchIndex,
  highlightedComponent,
  getHref,
  onShowNode,
  onShowControl,
  onHide,
}: LayoutProps) {
  const controlActive = highlightedComponent === CONTROL.id;
  // The band encloses every node, so hovering it (or its own table row)
  // dims nothing: there is nothing here it does not apply to. Hovering any
  // other node dims the rest, per .dev/products-diagram-plan.md § Phase 1.
  const dimming = highlightedComponent !== null && !controlActive;
  // The search index isn't a link (no table row to land on), so it has no
  // hover of its own — it just follows whichever of its two neighbours,
  // Maestro or Arranger, is active, the same way an edge between two
  // highlighted nodes would.
  const searchIndexActive =
    highlightedComponent === "maestro" || highlightedComponent === "arranger";
  const searchIndexDimmed = dimming && !searchIndexActive;

  const handlersFor = (fn: (e: React.SyntheticEvent<HTMLElement>) => void) => ({
    onPointerEnter: fn,
    onFocus: fn,
    onPointerLeave: onHide,
    onBlur: onHide,
  });

  return (
    <div
      className={`StackDiagram__diagram StackDiagram__diagram--${variant}`}
      role="group"
      aria-label="How Overture's components connect"
    >
      <svg
        className="StackDiagram__svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect
          className={`StackDiagram__band${controlActive ? " StackDiagram__band--active" : ""}`}
          x={band.x}
          y={band.y}
          width={band.width}
          height={band.height}
          rx={band.rx}
        />
        {flowEdges.map((edge) => {
          const from = flowPoint(edge.from, nodes, searchIndex);
          const to = flowPoint(edge.to, nodes, searchIndex);
          const active =
            highlightedComponent === edge.from ||
            highlightedComponent === edge.to;
          const edgeDimmed = dimming && !active;
          return (
            <path
              key={`${edge.from}-${edge.to}`}
              className={[
                "StackDiagram__edge",
                active && "StackDiagram__edge--active",
                edgeDimmed && "StackDiagram__edge--dimmed",
              ]
                .filter(Boolean)
                .join(" ")}
              d={edgePath(from, to)}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>

      <Link
        to={getHref(CONTROL.id)}
        className={`StackDiagram__controlTag${controlActive ? " StackDiagram__controlTag--active" : ""}`}
        style={{ left: `${controlLabel.x}%`, top: `${controlLabel.y}%` }}
        aria-label={`${CONTROL.name}: ${CONTROL.summary}`}
        {...handlersFor(onShowControl)}
      >
        <img
          className="StackDiagram__controlTagIcon"
          src="/img/marketing/home/diagram/control.png"
          alt=""
        />
        Control
      </Link>

      {/* Not a `Link`: there's no table row for infrastructure that isn't
          one of the seven components, so unlike every other element here it
          has nothing to navigate to and nothing to show a tooltip about
          beyond its own visible label. It still dims and lights with its
          neighbours, above. */}
      <span
        className={[
          "StackDiagram__indexTag",
          searchIndexActive && "StackDiagram__indexTag--active",
          searchIndexDimmed && "StackDiagram__indexTag--dimmed",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ left: `${searchIndex.x}%`, top: `${searchIndex.y}%` }}
      >
        <span className="StackDiagram__indexTagIcons">
          {searchIndex.icons.map((icon) => (
            <TechIconGlyph
              key={icon}
              name={icon}
              className="StackDiagram__indexTagIcon"
            />
          ))}
        </span>
        {searchIndex.label}
      </span>

      {nodes.map((node) => {
        const component = components.find((c) => c.id === node.id)!;
        const active = highlightedComponent === node.id;
        const nodeDimmed = dimming && !active;
        const storage = flowNodeStorage[node.id];
        const className = [
          "StackDiagram__node",
          active && "StackDiagram__node--active",
          nodeDimmed && "StackDiagram__node--dimmed",
        ]
          .filter(Boolean)
          .join(" ");
        return (
          <Link
            key={node.id}
            to={getHref(node.id)}
            className={className}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            aria-label={`${component.name} (${component.codename}): ${component.summary}${
              storage ? `. Backed by ${storage.label}.` : ""
            }`}
            {...handlersFor(onShowNode(node))}
          >
            <img
              className="StackDiagram__nodeIcon"
              src={`/img/marketing/home/diagram/${node.id}.png`}
              alt=""
            />
            <span className="StackDiagram__nodeName">{component.name}</span>
            {storage && (
              <span className="StackDiagram__nodeStorage">
                <TechIconGlyph
                  name={storage.icon}
                  className="StackDiagram__nodeStorageIcon"
                />
                {storage.label}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}

/**
 * The products page's flow diagram: the shape `data/components.ts` § `groups`
 * only ever explained in prose. Distributed metadata becomes one index, the
 * index becomes a search API, the API becomes a portal, and Control is the
 * band drawn around all of it rather than a step in the line — see
 * data/componentFlow.ts for the edges and layout, and .dev/products-diagram-plan.md
 * for why this is a left-to-right flow rather than a second copy of the home
 * hero's orbit. The search index between Maestro and Arranger, and the
 * database each of Lectern, Lyric and Song is backed by, are infrastructure
 * rather than Overture components — no table row, no `Link`, no tooltip — but
 * drawn in rather than left to the summaries alone, on request.
 *
 * Deliberately different from HeroDiagram on the one axis that matters most
 * for a click: each node's href scrolls down to its own row in ComponentTable
 * (`getHref` defaults to that), where the home hero's hotspots link out to
 * this page. `getHref` is a prop rather than a hardcoded `#${id}` so a future
 * home-page instance of this same component can pass a link out to
 * `/products/#<id>` instead, per the plan's § Reuse on the home page — not
 * built here, since that placement question is explicitly open until this
 * ships and can be seen next to what home already has.
 *
 * Nodes and the SVG edges beneath them share one 0-100 x/y coordinate space
 * (componentFlow.ts), stretched to their container by a `viewBox="0 0 100
 * 100"` with `preserveAspectRatio="none"`: both layers scale together
 * regardless of the container's actual pixel size, so nothing here has to
 * recompute anything on resize. Edges are drawn under the node cards and
 * terminate at each node's center; the card's own opaque background is what
 * makes a line look like it ends at the card's edge rather than its middle.
 *
 * No heading or lede above the diagram, on request — it's meant to be read
 * on sight rather than introduced, directly under the hero.
 */
export default function StackDiagram({
  getHref = (id: string) => `#${id}`,
}: {
  getHref?: (id: string) => string;
}) {
  const { highlightedComponent, setHighlightedComponent } =
    useComponentHighlight();
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const onShowNode =
    (node: FlowNode) => (event: React.SyntheticEvent<HTMLElement>) => {
      setHighlightedComponent(node.id);
      setTooltip({ node, rect: event.currentTarget.getBoundingClientRect() });
    };
  const onShowControl = (event: React.SyntheticEvent<HTMLElement>) => {
    setHighlightedComponent(CONTROL.id);
    setTooltip({ control: true, rect: event.currentTarget.getBoundingClientRect() });
  };
  const onHide = () => {
    setHighlightedComponent(null);
    setTooltip(null);
  };

  const sharedProps = {
    highlightedComponent,
    getHref,
    onShowNode,
    onShowControl,
    onHide,
  };

  return (
    <section
      className="StackDiagram"
      aria-label="How the components fit together"
    >
      <div className="container">
        {/* A contained card, not bare canvas: the diagram is short relative
            to the page's established section padding (Hero, ComponentTable),
            so without a visible boundary the space around it reads as an
            accident rather than a frame. See _stack-diagram.scss. */}
        <div className="StackDiagram__frame">
          <StackDiagramLayout
            variant="desktop"
            nodes={flowNodes}
            band={flowBand}
            controlLabel={flowControlLabel}
            searchIndex={flowSearchIndex}
            {...sharedProps}
          />
          <StackDiagramLayout
            variant="mobile"
            nodes={flowNodesMobile}
            band={flowBandMobile}
            controlLabel={flowControlLabelMobile}
            searchIndex={flowSearchIndexMobile}
            {...sharedProps}
          />
        </div>

        {tooltip && (
          <div
            className="StackDiagram__tooltip"
            role="tooltip"
            style={floatingTooltipPosition(
              tooltip.rect,
              "control" in tooltip
                ? "below"
                : tooltip.node.y < 50
                  ? "above"
                  : "below",
              { width: 220, estimatedHeight: 130 },
            )}
          >
            {"control" in tooltip ? (
              <>
                <strong className="StackDiagram__tooltipName">
                  {CONTROL.name}
                </strong>
                <span className="StackDiagram__tooltipSummary">
                  {CONTROL.summary}
                </span>
              </>
            ) : (
              (() => {
                const component = components.find(
                  (c) => c.id === tooltip.node.id,
                )!;
                return (
                  <>
                    <strong className="StackDiagram__tooltipName">
                      {component.name} ({component.codename})
                    </strong>
                    <span className="StackDiagram__tooltipSummary">
                      {component.summary}
                    </span>
                  </>
                );
              })()
            )}
          </div>
        )}
      </div>
    </section>
  );
}
