import React from "react";
import ProsePage from "../../components/ProsePage";
import Prose from "../../content/privacy.mdx";

/**
 * The copy for this page is in src/marketing/content/privacy.mdx. Edit it there.
 */
export default function PrivacyPage() {
  return (
    <ProsePage
      className="PrivacyPage ow:pb-8"
      heading="Website Privacy Statement"
      title="Website Privacy Statement"
      description="How the Overture website collects and uses aggregate and personal information."
    >
      <Prose />
    </ProsePage>
  );
}
