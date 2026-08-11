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
 * Still owed here: the Collect / Explore / Control diagram itself, which the
 * proposal puts at the top of this page and on the home page. It is blocked on
 * the source file, see .dev/roadmap.md § Inputs needed. The page is written to
 * read correctly without it rather than to hold a gap open.
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
