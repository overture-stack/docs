export type TooltipSide = "above" | "below";

/**
 * Shared by HeroDiagram and LogoCarousel: both position a tooltip from a
 * hovered element's own `getBoundingClientRect()` rather than a plain CSS
 * `position: absolute` popup, because both sit inside an ancestor that
 * clips or gets covered by one (LogoCarousel's `overflow-y: hidden`
 * viewport; HeroDiagram had no clipping ancestor, but a tooltip anchored to
 * one hotspot could still cover the rest of the diagram, or run off the
 * browser window entirely for a hotspot near the top of a shorter one —
 * both caught by the developer using the real page, not in isolation).
 *
 * `preferredSide` is a starting point, not a guarantee: this flips to the
 * other side when the preferred one doesn't have `estimatedHeight` of room
 * before the viewport edge, and always clamps horizontally so the tooltip
 * never runs off the left or right edge either.
 */
export function floatingTooltipPosition(
  rect: DOMRect,
  preferredSide: TooltipSide,
  opts: { width?: number; estimatedHeight?: number; gap?: number } = {},
): React.CSSProperties {
  const width = opts.width ?? 220;
  const estimatedHeight = opts.estimatedHeight ?? 140;
  const gap = opts.gap ?? 10;

  const margin = width / 2 + 12;
  const left = Math.min(
    Math.max(rect.left + rect.width / 2, margin),
    window.innerWidth - margin,
  );

  let side = preferredSide;
  if (side === "above" && rect.top - gap - estimatedHeight < 8) {
    side = "below";
  } else if (
    side === "below" &&
    rect.bottom + gap + estimatedHeight > window.innerHeight - 8
  ) {
    side = "above";
  }

  return side === "above"
    ? { left, bottom: window.innerHeight - rect.top + gap }
    : { left, top: rect.bottom + gap };
}
