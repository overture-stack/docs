import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import Link from "./Link";
import { H3 } from "./Typography";
import { partnerLogos, type PartnerLogo } from "../data/partnerLogos";
import { componentUsage } from "../data/componentUsage";
import { useComponentHighlight } from "../context/ComponentHighlightContext";
import { floatingTooltipPosition } from "../utils/floatingTooltip";
import {
  hoverIntentHandlers,
  isHoverIntent,
  wantsFocusHint,
} from "../utils/hoverIntent";
import { OVERTURE_DOCUMENTATION_FUNDING } from "../constants/externalLinks";

// The one line under the heading. Only shown where the interaction it describes
// is possible: tablet-up (see _logo-carousel.scss).
const HOVER_HINT =
  "Hover a component above, or a platform below, to see how they connect";

// Pixels per millisecond. Slow enough that a logo is legible for a couple of
// seconds as it drifts past, not just a blur you have to stop to read.
const SPEED = 0.015;

// How long the loop keeps its hands off `scrollLeft` after something other
// than itself last moved it. A touch swipe hands over to momentum once the
// finger lifts, and every momentum frame refreshes this, so the figure only
// has to outlast the gap between two frames of that glide rather than the
// whole of it.
const EXTERNAL_SCROLL_HOLD = 700;

// Pixels of mouse movement past a mousedown before this treats the gesture
// as a drag rather than a click. Below this, nothing here touches
// `scrollLeft` or captures the pointer, so a plain click still reaches
// whatever logo link is under it — see the note on `handlePointerDown`.
const DRAG_THRESHOLD = 4;

type TooltipInfo = { id: string; name: string; impact: string; rect: DOMRect };

// Internal to this file, not exported: a way for any LogoItem, however deep
// (the marquee's two lists, or the filtered view), to hand its impact
// tooltip up to the one place that renders it, without threading a callback
// prop through LogoList as well.
const LogoTooltipContext = React.createContext<
  (info: TooltipInfo | null) => void
>(() => {});

function LogoItem({
  logo,
  hiddenForLoop,
  highlighted,
}: {
  logo: PartnerLogo;
  hiddenForLoop: boolean;
  highlighted: boolean;
}) {
  const { setHighlightedPlatform } = useComponentHighlight();
  const setTooltip = useContext(LogoTooltipContext);
  const content = (
    <img
      className="LogoCarousel__logo"
      src={logo.icon}
      alt={hiddenForLoop ? "" : logo.name}
      draggable={false}
    />
  );
  // No production date rendered under the logo (still in
  // data/partnerLogos.ts, unused here). A logo with an impact statement
  // skips the plain browser `title` in favor of the tooltip below, so the
  // two never stack.
  const title = logo.name;
  const itemClassName = clsx(
    "LogoCarousel__item",
    highlighted && "LogoCarousel__item--highlighted",
  );

  // Pointer events, not onMouseEnter/onMouseLeave: @docusaurus/Link spreads
  // `...props` and then unconditionally sets its own `onMouseEnter` after
  // (for its hover-preload behaviour), silently discarding whatever the
  // caller passed in. Pointer events are untouched by it.
  const handleEnter = (element: HTMLElement) => {
    setHighlightedPlatform(logo.id);
    if (logo.impact) {
      setTooltip({
        id: logo.id,
        name: logo.name,
        impact: logo.impact,
        rect: element.getBoundingClientRect(),
      });
    }
  };
  const handleLeave = () => {
    setHighlightedPlatform(null);
    setTooltip(null);
  };
  // Guarded to mouse-only pointer events and keyboard-caused focus: a
  // touchscreen has no hover, which is why the hint line above the logos and
  // the diagram this highlights are both `display: none` below tablet-up
  // (_logo-carousel.scss, _home.scss). A tap on a logo follows its link, as
  // it did before.
  const highlightHandlers = hoverIntentHandlers<HTMLElement>(
    (event) => handleEnter(event.currentTarget),
    handleLeave,
  );

  if (!logo.href) {
    return (
      <li className={itemClassName}>
        <span
          className="LogoCarousel__link LogoCarousel__link--disabled"
          title={logo.impact ? undefined : title}
          tabIndex={-1}
          aria-describedby={logo.impact ? "LogoCarousel-tooltip" : undefined}
          {...highlightHandlers}
        >
          {content}
        </span>
      </li>
    );
  }
  return (
    <li className={itemClassName}>
      <Link
        to={logo.href}
        className="LogoCarousel__link"
        title={logo.impact ? undefined : title}
        tabIndex={hiddenForLoop ? -1 : 0}
        aria-describedby={logo.impact ? "LogoCarousel-tooltip" : undefined}
        draggable={false}
        {...highlightHandlers}
      >
        {content}
      </Link>
    </li>
  );
}

const LogoList = React.forwardRef<HTMLUListElement, { hidden: boolean }>(
  function LogoList({ hidden }, ref) {
    return (
      <ul className="LogoCarousel__list" aria-hidden={hidden} ref={ref}>
        {partnerLogos.map((logo) => (
          <LogoItem
            key={logo.id}
            logo={logo}
            hiddenForLoop={hidden}
            highlighted={false}
          />
        ))}
      </ul>
    );
  },
);

/**
 * Who runs Overture, scrolling right below the hero: a continuous marquee,
 * so every logo shows at once rather than hiding behind an arrow.
 *
 * The list renders twice back to back inside a real scroll container
 * (`overflow-x: auto`), not a CSS transform animation, so a
 * `requestAnimationFrame` loop can advance `scrollLeft` each frame while
 * still letting a trackpad swipe, shift+wheel, or mouse drag take over
 * without fighting it. The second copy is `aria-hidden`/`tabIndex={-1}` (it
 * only exists to make the loop seamless) and drops out entirely under
 * `prefers-reduced-motion`.
 *
 * Two independent links through `ComponentHighlightContext`: hovering a
 * component in HeroDiagram swaps the marquee for a static list of the
 * platforms that use it (dimming in place would miss anything currently
 * off-screen); hovering a logo here sets `highlightedPlatform`, which
 * HeroDiagram reads to highlight its own matching components.
 *
 * The impact-statement tooltip is `position: fixed`, not the `position:
 * absolute` popup HeroDiagram's tooltip uses, because `&__viewport` needs
 * `overflow-y: hidden` for the marquee illusion, which would clip anything
 * anchored inside it.
 */
export default function LogoCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const filteredListRef = useRef<HTMLUListElement>(null);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  // A finger or pen resting on the viewport, separate from `draggingRef`
  // (the mouse drag this component runs itself) — touch scrolling is the
  // browser's; this only needs to stay out of its way.
  const touchHoldRef = useRef(false);
  const dragStartRef = useRef({ x: 0, scrollLeft: 0 });
  // A mousedown not yet proven a drag, kept separate from
  // `dragStartRef`/`draggingRef` so a plain click never captures the
  // pointer — see `DRAG_THRESHOLD`.
  const dragCandidateRef = useRef<{
    pointerId: number;
    x: number;
    scrollLeft: number;
  } | null>(null);
  const highlightedComponentRef = useRef<string | null>(null);
  const { highlightedComponent } = useComponentHighlight();
  const [tooltip, setTooltip] = useState<TooltipInfo | null>(null);
  const [filteredScale, setFilteredScale] = useState(1);

  // The filtered view only ever shrinks to fit one line, never grows or
  // wraps. `scrollWidth` reads the list's natural width regardless of any
  // transform already applied, so recomputing repeatedly is safe.
  useLayoutEffect(() => {
    const list = filteredListRef.current;
    const stage = stageRef.current;
    if (!highlightedComponent || !list || !stage) {
      setFilteredScale(1);
      return;
    }

    const recompute = () => {
      const naturalWidth = list.scrollWidth;
      if (naturalWidth === 0) return;
      setFilteredScale(Math.min(1, stage.clientWidth / naturalWidth));
    };

    recompute();
    const observer = new ResizeObserver(recompute);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [highlightedComponent]);

  useEffect(() => {
    highlightedComponentRef.current = highlightedComponent;
  }, [highlightedComponent]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const list = listRef.current;
    if (!viewport || !list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame: number;
    let last: number | null = null;
    // `scrollLeft` is integer-quantized; at this speed each frame's move is
    // under a pixel, so writing straight to it would round to zero forever.
    // Tracked as a float here, only rounded on write.
    let position = viewport.scrollLeft;
    // The previous frame's `scrollLeft`, the only way to tell this loop's
    // own writes apart from the visitor's.
    let lastSeen: number | null = null;
    // `-Infinity`, not `0`: a plain zero would read as a recent scroll for
    // the first `EXTERNAL_SCROLL_HOLD` of the page's life.
    let externalScrollAt = Number.NEGATIVE_INFINITY;

    const tick = (now: number) => {
      const elapsed = last === null ? 0 : now - last;
      last = now;
      const listWidth = list.offsetWidth;
      if (listWidth === 0) {
        frame = requestAnimationFrame(tick);
        return;
      }

      // Native scrolling (touch, trackpad, shift+wheel) only shows up as
      // `scrollLeft` moving since the last frame; nothing else marks it.
      const actual = viewport.scrollLeft;
      if (lastSeen !== null && Math.abs(actual - lastSeen) > 1) {
        externalScrollAt = now;
      }

      if (
        pausedRef.current ||
        draggingRef.current ||
        touchHoldRef.current ||
        now - externalScrollAt < EXTERNAL_SCROLL_HOLD ||
        highlightedComponentRef.current !== null
      ) {
        // Resync from the real offset so resuming continues from there,
        // not a snap back.
        position = actual;
      } else {
        position += SPEED * elapsed;
        if (position >= listWidth) {
          position -= listWidth;
        } else if (position < 0) {
          position += listWidth;
        }
        viewport.scrollLeft = position;
      }

      // Read back after writing, not before: `scrollLeft` is quantized and
      // clamped, so the next frame must compare against what's actually
      // there, not what was requested.
      lastSeen = viewport.scrollLeft;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Mouse hover only: a touchscreen has none, and the compatibility
  // `mouseenter` a tap fires has no matching `mouseleave`, which would leave
  // the marquee paused for good after one tap.
  const pause = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isHoverIntent(event)) return;
    pausedRef.current = true;
  };
  const resume = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isHoverIntent(event)) return;
    pausedRef.current = false;
  };
  // `event.target`, not `currentTarget`: React's `onFocus` is `focusin`, so
  // `currentTarget` is the viewport, but it's the focused link inside it
  // that needs checking. Blur stays unconditional; clearing an unset pause
  // costs nothing.
  const pauseForFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!wantsFocusHint(event.target as HTMLElement)) return;
    pausedRef.current = true;
  };
  const resumeFromFocus = () => {
    pausedRef.current = false;
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    // Touch and pen already get native drag-to-scroll; only mouse drag
    // needs handling here. The loop still needs to know contact exists — a
    // still finger scrolls nothing for it to notice otherwise.
    if (event.pointerType !== "mouse") {
      touchHoldRef.current = true;
      return;
    }
    const viewport = viewportRef.current;
    if (!viewport) return;
    // Not yet a drag: `draggingRef` stays false and the pointer uncaptured
    // until `handlePointerMove` confirms movement past `DRAG_THRESHOLD`.
    // Capturing here instead would retarget the browser's own `click` onto
    // this viewport, making every logo unclickable by mouse.
    dragCandidateRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      scrollLeft: viewport.scrollLeft,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    if (draggingRef.current) {
      const { x, scrollLeft } = dragStartRef.current;
      viewport.scrollLeft = scrollLeft - (event.clientX - x);
      return;
    }
    const candidate = dragCandidateRef.current;
    if (!candidate || candidate.pointerId !== event.pointerId) return;
    if (Math.abs(event.clientX - candidate.x) < DRAG_THRESHOLD) return;
    // Crossed the slop: a drag, not a click. Captured only now, so the
    // click-retargeting only applies to a confirmed drag.
    draggingRef.current = true;
    viewport.setPointerCapture(event.pointerId);
    dragStartRef.current = { x: candidate.x, scrollLeft: candidate.scrollLeft };
    viewport.scrollLeft = candidate.scrollLeft - (event.clientX - candidate.x);
  };

  // Before the `draggingRef` guard: touch never sets that ref, so returning
  // early here would leave the hold set for good after the first tap.
  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    touchHoldRef.current = false;
    dragCandidateRef.current = null;
    if (!draggingRef.current) return;
    draggingRef.current = false;
    viewportRef.current?.releasePointerCapture(event.pointerId);
  };

  const matches = highlightedComponent
    ? partnerLogos.filter((logo) =>
        componentUsage[logo.id]?.includes(highlightedComponent),
      )
    : null;

  return (
    <LogoTooltipContext.Provider value={setTooltip}>
      <section
        className="LogoCarousel"
        aria-label="Platforms and partners running on Overture"
      >
        <div className="container">
          <div className="LogoCarousel__band">
            <div className="LogoCarousel__heading">
              <p className="LogoCarousel__hint">{HOVER_HINT}</p>
            </div>

            <div className="LogoCarousel__stage" ref={stageRef}>
              <div
                className={clsx(
                  "LogoCarousel__viewport",
                  matches && "LogoCarousel__viewport--hidden",
                )}
                ref={viewportRef}
                onPointerEnter={pause}
                onPointerLeave={resume}
                onFocus={pauseForFocus}
                onBlur={resumeFromFocus}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
              >
                <div className="LogoCarousel__track">
                  <LogoList ref={listRef} hidden={false} />
                  <LogoList hidden />
                </div>
              </div>
              <div
                className={clsx(
                  "LogoCarousel__fade",
                  "LogoCarousel__fade--left",
                  matches && "LogoCarousel__fade--hidden",
                )}
              />
              <div
                className={clsx(
                  "LogoCarousel__fade",
                  "LogoCarousel__fade--right",
                  matches && "LogoCarousel__fade--hidden",
                )}
              />

              {/* Always mounted, not conditional on `matches`, so the crossfade
                  with the marquee above has something to transition between —
                  a freshly-mounted element has no "before" state to animate
                  from. */}
              <div
                className={clsx(
                  "LogoCarousel__filtered",
                  matches && "LogoCarousel__filtered--visible",
                )}
              >
                {matches &&
                  (matches.length > 0 ? (
                    <ul
                      ref={filteredListRef}
                      className="LogoCarousel__list LogoCarousel__list--filtered"
                      // Never bigger than normal size, shrunk only as much as
                      // needed to fit one line. `translate(-50%, -50%)` is
                      // centering, not sizing — flex centering breaks down
                      // once this list is wider than its container, which it
                      // is before scaling.
                      style={{
                        transform: `translate(-50%, -50%) scale(${filteredScale})`,
                      }}
                    >
                      {matches.map((logo) => (
                        <LogoItem
                          key={logo.id}
                          logo={logo}
                          hiddenForLoop={false}
                          highlighted
                        />
                      ))}
                    </ul>
                  ) : (
                    <p className="LogoCarousel__empty">
                      No confirmed platforms yet for this component.
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {tooltip && (
        <div
          className="LogoCarousel__tooltip"
          role="tooltip"
          id="LogoCarousel-tooltip"
          // Above the logo by default; `floatingTooltipPosition` still flips
          // to "below" if there's no room (a chip near the top, or a short
          // window).
          style={floatingTooltipPosition(tooltip.rect, "above", {
            width: 220,
            estimatedHeight: 110,
          })}
        >
          <strong className="LogoCarousel__tooltipName">{tooltip.name}</strong>
          <span className="LogoCarousel__tooltipImpact">{tooltip.impact}</span>
        </div>
      )}
    </LogoTooltipContext.Provider>
  );
}
