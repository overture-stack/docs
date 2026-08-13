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
 * Control (in development), positioned to match the reference artwork
 * rather than evenly spaced. Each icon is a focusable/hoverable hotspot
 * linking to `/products/#<id>` with a name/codename/summary tooltip.
 *
 * Who runs Overture used to live here too, as a second carousel slide; it's
 * now LogoCarousel, its own scrolling section right below the hero.
 *
 * Hovering a hotspot filters LogoCarousel below to platforms using that
 * component; hovering a platform there highlights its components back here
 * (both via `data/componentUsage.ts` and shared `ComponentHighlightContext`).
 * Every hotspot is always on screen, so this direction just dims the rest
 * rather than filtering.
 *
 * The tooltip is `position: fixed`, positioned in JS from the hovered
 * hotspot's `getBoundingClientRect()` (utils/floatingTooltip.ts) rather than
 * `position: absolute`: an absolute tooltip could cover the rest of the
 * diagram, or run off-window near a shorter viewport's top edge.
 *
 * Rendered only from `tablet-up` (see _home.scss), hidden with
 * `display: none` so nothing here sits in the tab order when the artwork
 * isn't shown.
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
        // overwrites `onMouseEnter` internally (for hover-preload), silently
        // discarding any passed in. Pointer events are untouched by it.
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
            // Preference only: defaults to pointing away from the ring's
            // center (a top-half hotspot throws its tooltip up, not over
            // the portal) unless overridden via `tooltipSide` in
            // data/heroDiagram.ts. Flips either way if it would run
            // off-window.
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
