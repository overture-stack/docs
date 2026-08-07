import React from "react";
import ProsePage from "../../marketing/components/ProsePage";
import Prose from "../../marketing/content/terms-conditions.mdx";

/**
 * The copy for this page is in src/marketing/content/terms-conditions.mdx. Edit
 * it there, including the section numbers.
 */
export default function TermsConditionsPage() {
  return (
    <ProsePage
      className="TermsConditionsPage"
      heading="Terms & Conditions"
      title="Terms & Conditions"
      description="The terms and conditions governing use of the Overture website."
    >
      <Prose />
    </ProsePage>
  );
}
