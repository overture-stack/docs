import React from "react";
import MarketingPage from "../../MarketingPage";
import Hero from "../../components/Hero";
import ComponentTable from "../../components/ComponentTable";

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
