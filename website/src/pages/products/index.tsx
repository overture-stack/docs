import React from "react";
import MarketingPage from "../../marketing/MarketingPage";
import Hero from "../../marketing/components/Hero";
import ComponentTable from "../../marketing/components/ComponentTable";

/**
 * What Overture is made of: a hero and one table.
 *
 * Rewritten in rebuild phase 3 against .dev/ia-proposal.md § /products/. What
 * it replaced was seven near-identical sections of three feature tiles each,
 * one per component, in codename order. Three things changed:
 *
 *   - The stack is grouped as Collect, Explore and Control, which is how the
 *     component diagram in .dev/referenceMaterial/ describes it, so an evaluator
 *     reads a shape rather than a catalogue. All three are group rows in one
 *     table (ComponentTable) rather than a band each: Control was the last one
 *     still rendering as prose here, and it now holds the row for the
 *     authorization service being built.
 *   - Components are named functionally with the codename beside them, which is
 *     the house style fixed in the proposal. This is the page that teaches the
 *     pairing: someone who arrives knowing only "Arranger" leaves knowing it is
 *     the search service, and someone who needs search finds it without knowing
 *     any codename at all.
 *
 * The copy is data, in src/marketing/data/components.ts, so this file is a
 * layout and nothing on it needs a code change to reword.
 *
 * `StackDiagram` (a flow diagram of the same seven components, drawn per
 * .dev/products-diagram-plan.md) lived here briefly and was pulled on
 * request: the click-through to a table row cut instantly with no visual
 * continuity ("loses my place"), and the diagram's own footprint read as
 * unexplained empty space even after two rounds of tightening it. Not
 * deleted — `components/StackDiagram.tsx`, `data/componentFlow.ts`,
 * `data/techIcons.ts` and `styles/components/_stack-diagram.scss` are still
 * in the tree, just unreferenced — in case it's reworked or finds a home
 * elsewhere (the plan's own open question was always whether it belonged on
 * `/home/` instead). `ComponentTable`'s hover/focus row highlighting, which
 * existed only to sync with the diagram, was reverted with it.
 */
export default function ProductsPage() {
  return (
    <MarketingPage
      className="ProductsPage"
      title="Overture Products"
      description="Seven modular components for building research data platforms: collect data, make it discoverable, and keep control of who reaches it."
    >
      <Hero
        title="What Overture is made of"
        subtitle="Eight components, grouped by what they do. Take one where you have a gap, or the whole stack as a platform."
      />

      <ComponentTable />
    </MarketingPage>
  );
}
