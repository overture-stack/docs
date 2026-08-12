import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Link from "./Link";
import { H3 } from "./Typography";
import { partnerLogos, type PartnerLogo } from "../data/partnerLogos";
import { componentUsage } from "../data/componentUsage";
import { useComponentHighlight } from "../context/ComponentHighlightContext";
import { floatingTooltipPosition } from "../utils/floatingTooltip";
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

type TooltipInfo = { id: string; name: string; impact: string; rect: DOMRect };

/**
 * Whether a `focus` event is one the hover treatments should answer to.
 *
 * Not every focus is a visitor asking to be shown something: a tap focuses
 * whatever link it lands on, and that focus then stays exactly where it is
 * until they touch something else. Treating it as hover left the marquee
 * stopped and an impact tooltip on screen for as long after the tap as the
 * visitor cared to keep reading — the same "no matching leave event" shape
 * as the compatibility `mouseenter` a tap also fires, arrived at from the
 * other side.
 *
 * `:focus-visible` is the browser's own answer to which focus wants showing —
 * keyboard yes, pointer no — so this asks it rather than guessing from the
 * event. The keyboard path is unaffected, which is the point: it is the only
 * way to reach any of this without a mouse.
 */
function wantsFocusHint(element: HTMLElement): boolean {
  try {
    return element.matches(":focus-visible");
  } catch {
    // A browser old enough not to know the selector throws on it. There,
    // every focus counts, which is exactly the behaviour this replaced.
    return true;
  }
}

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
  // No production date under the logo any more, on the developer's call: each
  // one added a line of text plus its gap under every chip, and the band has to
  // finish above the fold together with the hero. `date` is still in
  // data/partnerLogos.ts (it reads as the record of when each platform ran, and
  // `startYear` next to it still orders this list), just not rendered here.
  // The impact tooltip (below) replaces the plain title for a logo that has
  // one, rather than stacking a duplicate browser tooltip a second after the
  // custom one; a logo without an impact statement yet still gets the plain
  // title, same as before.
  const title = logo.name;
  const itemClassName = `LogoCarousel__item${
    highlighted ? " LogoCarousel__item--highlighted" : ""
  }`;

  // Pointer events, not onMouseEnter/onMouseLeave: @docusaurus/Link spreads
  // `...props` and then unconditionally sets its own `onMouseEnter` after
  // (for its hover-preload behaviour), silently discarding whatever the
  // caller passed in. Pointer events are untouched by it. See HeroDiagram,
  // where the same bug showed up first.
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
  // Mouse only, on the pointer path. `pointerenter` fires for a finger too,
  // at the moment it touches down and before the browser has decided whether
  // the gesture is a tap or a swipe: on a phone that put the impact tooltip
  // on screen under the visitor's own finger for the length of every swipe
  // across the logos, cleared again by the `pointercancel` that ends it.
  // There is nothing for it to do there in any case — a touchscreen has no
  // hover, which is why the hint line above the logos and the diagram this
  // highlights are both `display: none` below tablet-up (_logo-carousel.scss,
  // _home.scss). A tap on a logo follows its link, as it did before.
  //
  // The keyboard path keeps calling this unconditionally: a `focus` event
  // carries no pointer type because no pointer caused it.
  const handlePointerEnter = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    handleEnter(event.currentTarget);
  };
  const highlightHandlers = {
    onPointerEnter: handlePointerEnter,
    onPointerLeave: handleLeave,
    onFocus: (event: React.FocusEvent<HTMLElement>) => {
      if (!wantsFocusHint(event.currentTarget)) return;
      handleEnter(event.currentTarget);
    },
    onBlur: handleLeave,
  };

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
 * Who runs Overture, scrolling right below the hero: a continuous marquee
 * rather than a click-through carousel, since the previous phase 4 rebuild
 * already argued its way out of one of those (see .dev/roadmap.md) and a
 * marquee shows every logo at once instead of hiding most of them behind an
 * arrow.
 *
 * The list renders twice, back to back, and the viewport is a real scroll
 * container (`overflow-x: auto`), not a CSS `transform` animation: a
 * `requestAnimationFrame` loop just adds to `scrollLeft` every frame when
 * nothing else is moving it, and wraps by exactly one list's width so the
 * loop point (the two copies being identical) is invisible. Being a real
 * scroll container is what lets a visitor take over with a trackpad swipe,
 * shift+wheel, or a mouse drag (handled here directly, since browsers don't
 * do that one on their own) without fighting the animation: hovering or
 * focusing anything inside pauses the loop outright rather than merely
 * slowing it, so the visitor's own scroll position is never being fought
 * from underneath them.
 *
 * A touch swipe is the fourth way in and the one none of that covered, since
 * a finger neither hovers nor focuses: the loop went on writing `scrollLeft`
 * a frame at a time throughout the gesture. Two things stop it now — the
 * contact itself (`touchHoldRef`, so a finger resting on the row is enough,
 * even before it moves) and any movement of `scrollLeft` this loop did not
 * write, which is what covers the momentum still gliding after the finger
 * has gone. Both branches resync `position` from the real scroll offset, so
 * the marquee picks up from wherever the visitor left it rather than
 * snapping back.
 *
 * The second copy is `aria-hidden` and every one of its links is
 * `tabIndex={-1}`: it exists only to make the loop seamless, never as
 * content to tab into or hear twice. Under `prefers-reduced-motion` the loop
 * never starts and the duplicate list drops out entirely (see
 * _logo-carousel.scss), leaving a static, wrapped row.
 *
 * Two independent directions through ComponentHighlightContext: hovering or
 * focusing a component in HeroDiagram doesn't just dim the non-matching
 * logos here in place — whatever uses the component might not be scrolled
 * into view at that moment, and dimming something off-screen shows the
 * visitor nothing. It swaps the marquee out for a static, centered list of
 * just the matches instead, laid over the same space (`visibility: hidden`
 * on the marquee, not unmounted, so its scroll position and animation frame
 * survive the swap rather than resetting every time). The other direction —
 * hovering or focusing a logo here — sets `highlightedPlatform`, which
 * HeroDiagram reads itself to highlight the components that platform uses;
 * this component doesn't need to do anything with it beyond setting it.
 *
 * A third, unrelated thing the same hover/focus triggers: a tooltip with the
 * platform's impact statement (data/partnerLogos.ts's `impact` field),
 * mirroring HeroDiagram's own tooltip. It can't be positioned the same way
 * HeroDiagram's is (a plain `position: absolute` child, popping above the
 * icon): every logo here sits inside `&__viewport`, which needs
 * `overflow-y: hidden` for the marquee illusion to work, and that clips
 * anything that pops outside a row's own height exactly like the highlight
 * ring's `transform: scale` did earlier in this file's history. Rendered
 * instead as a single `position: fixed` element, positioned from the
 * hovered item's own `getBoundingClientRect()`: `fixed` is positioned
 * against the viewport itself, so no ancestor's `overflow` touches it.
 */
export default function LogoCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const filteredListRef = useRef<HTMLUListElement>(null);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  // A finger (or pen) resting on the viewport. Separate from `draggingRef`,
  // which is the mouse drag this component runs itself: touch scrolling is
  // the browser's, and all this loop has to do about it is keep out of the
  // way for as long as the contact lasts, whether or not it ever moves.
  const touchHoldRef = useRef(false);
  const dragStartRef = useRef({ x: 0, scrollLeft: 0 });
  const highlightedComponentRef = useRef<string | null>(null);
  const { highlightedComponent } = useComponentHighlight();
  const [tooltip, setTooltip] = useState<TooltipInfo | null>(null);
  const [filteredScale, setFilteredScale] = useState(1);

  // The filtered view never wraps to a second row and never grows past each
  // logo's own normal size — only ever shrinks, and only as much as it has
  // to, to keep however many matches there are on one line. `scrollWidth`
  // reads the list's natural, unscaled width regardless of any transform
  // already applied (`transform` doesn't affect layout size), so this is
  // stable to recompute repeatedly rather than compounding.
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
    // `scrollLeft` itself is integer-quantized: at this speed each frame's
    // move is under a pixel, and writing that straight to `scrollLeft` and
    // reading it back next frame rounds it down to zero forever. Keeping the
    // real position in a float here, and only ever writing the rounded
    // result to the DOM, is what lets the sub-pixel amounts actually add up.
    let position = viewport.scrollLeft;
    // What `scrollLeft` read at the end of the previous frame, which is the
    // only way to tell this loop's own scrolling apart from everyone else's:
    // if the value moved between two frames by more than this loop wrote, the
    // visitor moved it.
    let lastSeen: number | null = null;
    // `-Infinity` and not `0`: `now` is milliseconds since the page loaded, so
    // a plain zero would read as "scrolled a moment ago" for the first
    // `EXTERNAL_SCROLL_HOLD` of the page's life.
    let externalScrollAt = Number.NEGATIVE_INFINITY;

    const tick = (now: number) => {
      const elapsed = last === null ? 0 : now - last;
      last = now;
      const listWidth = list.offsetWidth;
      if (listWidth === 0) {
        frame = requestAnimationFrame(tick);
        return;
      }

      // Native scrolling — a touch swipe and the momentum that follows it, a
      // trackpad or shift+wheel gesture — announces itself only by having
      // moved `scrollLeft` since the last frame. Nothing here paused for it,
      // so on a phone this loop spent the whole swipe writing its own
      // position back over the visitor's, a frame at a time: the row fought
      // the finger on the way and snapped back the moment it lifted.
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
        // A drag, native scrolling, or the filtered view being shown over
        // this may have moved (or simply frozen) the real scrollLeft; resync
        // so resuming continues from there instead of snapping back to
        // wherever this was before the interruption.
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

      // After the write, not before: `scrollLeft` is integer-quantized and
      // clamped to the scrollable range, so what the element actually holds
      // is what the next frame has to compare against. Reading back what was
      // asked for instead would show a difference of its own every frame and
      // read as the visitor scrolling.
      lastSeen = viewport.scrollLeft;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Hover, and only hover: a touchscreen has none, and the compatibility
  // `mouseenter` a browser fires after a tap is not it. That event has no
  // matching `mouseleave` until the visitor taps something else entirely, so
  // `onMouseEnter={pause}` (what this was) left the marquee stopped for good
  // after a single tap anywhere on it — the most visible half of the bug this
  // pair was reported for. `pointerenter` carries the device that caused it.
  const pause = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    pausedRef.current = true;
  };
  const resume = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    pausedRef.current = false;
  };
  // `event.target`, not `currentTarget`: React's `onFocus` is `focusin`, so
  // what arrives here is the viewport with the focus sitting on a link
  // somewhere inside it, and the link is what has to be asked. Blur stays
  // unconditional — clearing a pause that was never set costs nothing, and
  // there is no version of "stop pausing" worth being selective about.
  const pauseForFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!wantsFocusHint(event.target as HTMLElement)) return;
    pausedRef.current = true;
  };
  const resumeFromFocus = () => {
    pausedRef.current = false;
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    // Touch and pen already get native drag-to-scroll from `overflow-x:
    // auto`; only a mouse drag needs to be done by hand here. The loop above
    // still has to know the contact exists, though: a finger held still on
    // the row scrolls nothing for it to notice, and without this the marquee
    // carried on sliding out from under it.
    if (event.pointerType !== "mouse") {
      touchHoldRef.current = true;
      return;
    }
    const viewport = viewportRef.current;
    if (!viewport) return;
    draggingRef.current = true;
    viewport.setPointerCapture(event.pointerId);
    dragStartRef.current = {
      x: event.clientX,
      scrollLeft: viewport.scrollLeft,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    const { x, scrollLeft } = dragStartRef.current;
    viewport.scrollLeft = scrollLeft - (event.clientX - x);
  };

  // Before the `draggingRef` guard, not after it: a touch never sets that ref
  // (the browser does its scrolling), so an early return would leave the hold
  // set for good and the marquee stopped from the first tap onwards — the same
  // failure `pause` had, arrived at from the other end.
  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    touchHoldRef.current = false;
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
                className={`LogoCarousel__viewport${
                  matches ? " LogoCarousel__viewport--hidden" : ""
                }`}
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
                className={`LogoCarousel__fade LogoCarousel__fade--left${
                  matches ? " LogoCarousel__fade--hidden" : ""
                }`}
              />
              <div
                className={`LogoCarousel__fade LogoCarousel__fade--right${
                  matches ? " LogoCarousel__fade--hidden" : ""
                }`}
              />

              {/* Always mounted, not conditional on `matches`, so the crossfade
                  with the marquee above has something to transition between —
                  a freshly-mounted element has no "before" state to animate
                  from. */}
              <div
                className={`LogoCarousel__filtered${
                  matches ? " LogoCarousel__filtered--visible" : ""
                }`}
              >
                {matches &&
                  (matches.length > 0 ? (
                    <ul
                      ref={filteredListRef}
                      className="LogoCarousel__list LogoCarousel__list--filtered"
                      // Never bigger than each logo's own normal size (`scale`
                      // only ever shrinks, capped at 1 in the effect above),
                      // and only as small as it has to be to keep this on one
                      // line — a component a lot of platforms use ends up
                      // small; three or four stay at full size. The
                      // `translate(-50%, -50%)` is centering (see
                      // _logo-carousel.scss's `&--filtered`), not part of the
                      // sizing — flex centering breaks down once this list is
                      // wider than its container, which it is before scaling.
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
          // Above the logo, on request. `floatingTooltipPosition` still
          // flips to "below" as a fallback if there's no room above (a chip
          // near the top of the carousel, or a very short window), the same
          // clamping it already did the other direction when this preferred
          // "below".
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
