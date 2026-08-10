import React, { createContext, useContext, useMemo, useState } from "react";

type ComponentHighlightValue = {
  /** Set by HeroDiagram on hover/focus: which component LogoCarousel should filter to. */
  highlightedComponent: string | null;
  setHighlightedComponent: (id: string | null) => void;
  /** Set by LogoCarousel on hover/focus: which platform HeroDiagram should highlight the components of. */
  highlightedPlatform: string | null;
  setHighlightedPlatform: (id: string | null) => void;
};

const ComponentHighlightContext =
  createContext<ComponentHighlightValue | null>(null);

/**
 * Shared between HeroDiagram and LogoCarousel, siblings on the home page,
 * two independent axes: hovering or focusing a component in the hero
 * filters LogoCarousel to the platforms that use it, and hovering or
 * focusing a platform in LogoCarousel highlights, back in the hero, the
 * components that platform uses (both from data/componentUsage.ts). Scoped
 * to wherever it wraps rather than global, since nothing outside that
 * pairing needs it.
 */
export function ComponentHighlightProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [highlightedComponent, setHighlightedComponent] = useState<
    string | null
  >(null);
  const [highlightedPlatform, setHighlightedPlatform] = useState<
    string | null
  >(null);
  const value = useMemo(
    () => ({
      highlightedComponent,
      setHighlightedComponent,
      highlightedPlatform,
      setHighlightedPlatform,
    }),
    [highlightedComponent, highlightedPlatform],
  );
  return (
    <ComponentHighlightContext.Provider value={value}>
      {children}
    </ComponentHighlightContext.Provider>
  );
}

export function useComponentHighlight(): ComponentHighlightValue {
  const ctx = useContext(ComponentHighlightContext);
  if (!ctx) {
    // Outside the provider: a no-op fallback rather than a crash, since
    // highlighting is an enhancement neither HeroDiagram nor LogoCarousel
    // depends on to render correctly.
    return {
      highlightedComponent: null,
      setHighlightedComponent: () => {},
      highlightedPlatform: null,
      setHighlightedPlatform: () => {},
    };
  }
  return ctx;
}
