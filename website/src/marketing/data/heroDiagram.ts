import { componentIcon, components } from "./components";
import { PRODUCTS_PATH } from "../constants/pages";

/**
 * Layout for the home hero's diagram: what Overture is made of. Positions
 * are percentages of a 528x528 square (the diagram's aspect ratio), matching
 * the real shape coordinates from the reference artwork, not an evenly-spaced
 * redistribution.
 */
export type HeroDiagramHotspot = {
  id: string;
  icon: string;
  left: number;
  top: number;
  width: number;
  height: number;
  rotate?: number;
  name: string;
  codename?: string;
  summary: string;
  href?: string;
  comingSoon?: boolean;
  /**
   * Which side HeroDiagram's tooltip prefers (still subject to flipping if
   * that side runs off the browser window: see utils/floatingTooltip.ts).
   * Defaults to away from the ring's own center (`top < 50` prefers
   * "above") when absent; Score, Lectern, Maestro, Arranger and Stage
   * override that default where it reads better against their position.
   */
  tooltipSide?: "above" | "below";
};

function componentHotspot(
  id: string,
  layout: {
    left: number;
    top: number;
    width: number;
    height: number;
    tooltipSide?: "above" | "below";
  },
): HeroDiagramHotspot {
  const component = components.find((c) => c.id === id);
  if (!component) {
    throw new Error(`heroDiagram: no component data for "${id}"`);
  }
  return {
    id: component.id,
    icon: componentIcon(component.id),
    ...layout,
    name: component.name,
    codename: component.codename,
    summary: component.summary,
    // `?highlight={id}` mirrors /impact/'s Runs icons (impact/index.tsx) and
    // /products/'s own "N deployments" link (`used-by`, ComponentTable.tsx):
    // ComponentTable.tsx reads it back client-side and gives the matching
    // row the same persistent highlight those two get, rather than only the
    // brief `:target` flash the fragment alone gives an anchor jump.
    href: `${PRODUCTS_PATH}?highlight=${component.id}#${component.id}`,
  };
}

/**
 * The icon-to-component pairing is a content decision, not a functional one:
 * several icons (the tag carrying a music note for "Lyric", the book on its
 * stand for "Lectern") are puns on the codename, not depictions of what the
 * component does. Confirmed with the developer rather than inferred.
 */
export const heroDiagramHotspots: HeroDiagramHotspot[] = [
  {
    // Not data/components.ts's "control" group (the Keycloak-delegated band
    // with no component of its own, at /products/#control): a distinct,
    // unshipped component, confirmed with the developer 2026-08-10. No
    // `href` until it has real documentation to link to.
    id: "control",
    icon: componentIcon("control"),
    left: 16.914,
    top: 9.601,
    width: 6.771,
    height: 9.743,
    rotate: -18.3,
    name: "Control",
    summary:
      "Access and authorization for the whole stack. Currently under development.",
    comingSoon: true,
  },
  componentHotspot("lyric", {
    left: 36.362,
    top: 15.444,
    width: 8.869,
    height: 11.973,
  }),
  componentHotspot("song", {
    left: 64.286,
    top: 14.649,
    width: 9.950,
    height: 11.263,
  }),
  componentHotspot("score", {
    left: 85.052,
    top: 34.973,
    width: 11.485,
    height: 12.323,
    tooltipSide: "below",
  }),
  componentHotspot("maestro", {
    left: 82.706,
    top: 67.788,
    width: 14.924,
    height: 14.784,
    tooltipSide: "above",
  }),
  componentHotspot("arranger", {
    left: 50.527,
    top: 86.197,
    width: 16.643,
    height: 10.611,
    tooltipSide: "above",
  }),
  componentHotspot("stage", {
    left: 16.393,
    top: 66.428,
    width: 14.991,
    height: 13.194,
    tooltipSide: "above",
  }),
  componentHotspot("lectern", {
    left: 15.258,
    top: 35.388,
    width: 12.380,
    height: 11.369,
    tooltipSide: "below",
  }),
];
