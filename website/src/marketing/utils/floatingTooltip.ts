export type TooltipSide = "above" | "below";

/**
 * Shared by HeroDiagram and LogoCarousel: both position a tooltip from the
 * hovered element's own `getBoundingClientRect()` rather than a CSS
 * `position: absolute` popup, since both sit where that would clip
 * (LogoCarousel's `overflow-y: hidden` viewport) or overflow badly
 * (HeroDiagram: a tooltip could cover the rest of the diagram, or run
 * off-window near a shorter viewport's top).
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
