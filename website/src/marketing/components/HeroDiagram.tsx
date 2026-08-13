import React, { useState } from "react";
import clsx from "clsx";
import Link from "./Link";
import {
  heroDiagramHotspots,
  type HeroDiagramHotspot,
} from "../data/heroDiagram";
import { componentUsage } from "../data/componentUsage";
import { useComponentHighlight } from "../context/ComponentHighlightContext";
import { floatingTooltipPosition } from "../utils/floatingTooltip";
import { hoverIntentHandlers } from "../utils/hoverIntent";

const PORTAL = "/img/marketing/home/portal.svg";

/**
 * The home hero's diagram: an orbit of Overture's seven components plus
 * Control (still in development), positioned to match the reference
 * artwork's own coordinates rather than an evenly-spaced redistribution. Each
 * icon is a real focusable/hoverable hotspot, linking to `/products/#<id>`
 * and showing a tooltip with its name, codename and summary.
 *
 * Who runs Overture used to live here too, as a second carousel slide; it's
 * now LogoCarousel, its own scrolling section right below the hero.
 *
 * Hovering or focusing a hotspot filters LogoCarousel below to the platforms
 * that use that component; hovering or focusing a platform there highlights
 * the components it uses back here (both data/componentUsage.ts, via
 * ComponentHighlightContext shared between the two siblings). Unlike the
 * carousel, every hotspot is always on screen at once, so the second
 * direction just dims the rest in place rather than filtering anything out.
 *
 * The tooltip is a single `position: fixed` element, positioned in JS from
 * the hovered hotspot's own `getBoundingClientRect()` (see
 * utils/floatingTooltip.ts), not a `position: absolute` span anchored to
 * each icon: a plain CSS tooltip anchored to one hotspot could still cover
 * the rest of the diagram, or run off the browser window for a hotspot near
 * the top of a shorter one — both real, both caught by the developer using
 * the real page rather than in a screenshot of one hotspot in isolation.
 *
 * Rendered only from `tablet-up`: see _home.scss. Hidden with `display: none`
 * rather than merely visually, so nothing here sits in the tab order on a
 * viewport where the artwork isn't shown at all.
 */
export default function HeroDiagram() {
  const { setHighlightedComponent, highlightedPlatform } =
    useComponentHighlight();
  const [tooltip, setTooltip] = useState<{
    hotspot: HeroDiagramHotspot;
    rect: DOMRect;
  } | null>(null);

  return (
    <div
      className="HeroDiagram"
      role="group"
      aria-label="Overture's components"
    >
      <div className="HeroDiagram__disc" />
      <div className="HeroDiagram__ring" />

      <div className="HeroDiagram__portal">
        <img className="HeroDiagram__portalImage" src={PORTAL} alt="" />
      </div>

      {heroDiagramHotspots.map((hotspot) => {
        const usedByHoveredPlatform = highlightedPlatform
          ? (componentUsage[highlightedPlatform]?.includes(hotspot.id) ?? false)
          : false;
        const style: React.CSSProperties = {
          left: `${hotspot.left}%`,
          top: `${hotspot.top}%`,
          width: `${hotspot.width}%`,
          height: `${hotspot.height}%`,
        };
        const icon = (
          <img
            className="HeroDiagram__icon"
            src={hotspot.icon}
            alt=""
            style={
              hotspot.rotate
                ? { transform: `rotate(${hotspot.rotate}deg)` }
                : undefined
            }
          />
        );

        // Pointer events, not onMouseEnter/onMouseLeave: @docusaurus/Link
        // spreads `...props` and then unconditionally sets its own
        // `onMouseEnter` after (for its hover-preload behaviour), silently
        // discarding whatever the caller passed in. Pointer events are
        // untouched by it and fire for the same mouse interactions.
        const showTooltip = (event: React.SyntheticEvent<HTMLElement>) => {
          setHighlightedComponent(hotspot.id);
          setTooltip({
            hotspot,
            rect: event.currentTarget.getBoundingClientRect(),
          });
        };
        const hideTooltip = () => {
          setHighlightedComponent(null);
          setTooltip(null);
        };
        const highlightHandlers = hoverIntentHandlers(showTooltip, hideTooltip);
        const platformHighlightClassName = clsx(
          "HeroDiagram__hotspot",
          usedByHoveredPlatform && "HeroDiagram__hotspot--highlighted",
          highlightedPlatform &&
            !usedByHoveredPlatform &&
            "HeroDiagram__hotspot--dimmed",
        );

        if (hotspot.comingSoon || !hotspot.href) {
          return (
            <span
              key={hotspot.id}
              className={clsx(
                platformHighlightClassName,
                "HeroDiagram__hotspot--disabled",
              )}
              style={style}
              tabIndex={0}
              aria-label={`${hotspot.name}: ${hotspot.summary}`}
              {...highlightHandlers}
            >
              {icon}
            </span>
          );
        }

        return (
          <Link
            key={hotspot.id}
            to={hotspot.href}
            className={platformHighlightClassName}
            style={style}
            aria-label={`${hotspot.name}${
              hotspot.codename ? ` (${hotspot.codename})` : ""
            }: ${hotspot.summary}`}
            {...highlightHandlers}
          >
            {icon}
          </Link>
        );
      })}

      {tooltip && (
        <div
          className="HeroDiagram__tooltip"
          role="tooltip"
          style={floatingTooltipPosition(
            tooltip.rect,
            // Preference only, not a guarantee: pointed away from the
            // ring's own center by default — a hotspot in the top half
            // throws its tooltip further up, not down over the portal —
            // unless the hotspot overrides that on its own visual call
            // (see `tooltipSide` in data/heroDiagram.ts). Either way, flips
            // if that would run off the browser window.
            tooltip.hotspot.tooltipSide ??
              (tooltip.hotspot.top < 50 ? "above" : "below"),
            { width: 200, estimatedHeight: 130 },
          )}
        >
          <strong className="HeroDiagram__tooltipName">
            {tooltip.hotspot.name}
            {tooltip.hotspot.codename ? ` (${tooltip.hotspot.codename})` : ""}
          </strong>
          <span className="HeroDiagram__tooltipSummary">
            {tooltip.hotspot.summary}
          </span>
        </div>
      )}
    </div>
  );
}
