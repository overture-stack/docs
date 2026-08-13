import type React from "react";

/**
 * Whether a pointer event is real mouse hover, not a touch or pen tap's
 * `pointerenter`, which fires at the moment of contact — before the browser
 * has decided the gesture is a tap rather than a swipe — with no matching
 * leave event until the visitor touches something else.
 */
export function isHoverIntent(event: { pointerType: string }): boolean {
  return event.pointerType === "mouse";
}

/**
 * Whether a `focus` event is one a hover-style hint should answer to. A tap
 * focuses whatever it lands on, and that focus has no matching blur until
 * something else is touched — the same "stuck open" shape as a touch's
 * compatibility `pointerenter`. `:focus-visible` is the browser's own answer
 * to which focus wants showing (keyboard yes, pointer no), so this asks it
 * rather than guessing from the event.
 */
export function wantsFocusHint(element: HTMLElement): boolean {
  try {
    return element.matches(":focus-visible");
  } catch {
    // A browser old enough not to know the selector throws on it. There,
    // every focus counts, which is the behaviour this replaces.
    return true;
  }
}

/**
 * Pointer and focus handlers for a hover-triggered element (a tooltip, a
 * highlight) that only answers to real mouse hover and keyboard focus, not
 * the compatibility events a touch tap fires with no matching "leave" —
 * see `isHoverIntent` and `wantsFocusHint`. `onShow` receives the
 * triggering event, so a caller can read `event.currentTarget` for its rect
 * or other properties.
 */
export function hoverIntentHandlers<T extends HTMLElement>(
  onShow: (event: React.SyntheticEvent<T>) => void,
  onHide: () => void,
) {
  return {
    onPointerEnter: (event: React.PointerEvent<T>) => {
      if (isHoverIntent(event)) {
        onShow(event);
      }
    },
    onPointerLeave: onHide,
    onFocus: (event: React.FocusEvent<T>) => {
      if (wantsFocusHint(event.currentTarget)) {
        onShow(event);
      }
    },
    onBlur: onHide,
  };
}
