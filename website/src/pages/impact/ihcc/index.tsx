import React from "react";
import PlatformPage from "../../../marketing/components/PlatformPage";

// Content and layout are in PlatformPage; the slug picks the platform out of
// data/platforms.ts and data/caseStudies.tsx. See .dev/ia-proposal.md.
export default function Page() {
  return <PlatformPage slug="ihcc" />;
}
