import React from "react";
import Layout from "@theme/Layout";
import "./styles/index.scss";

/**
 * The shell every ported marketing route renders inside.
 *
 * It replaces the Gatsby site's `Layout` component, `NavBar`, `MegaMenu` and
 * `Footer`: docusaurus.config.ts supplies all of those, and the swizzled
 * src/theme/Layout mounts Matomo, so `gatsby-plugin-matomo` has no successor to
 * port. `<Head>` and react-helmet likewise collapse into Layout's own title and
 * description props.
 *
 * `wrapperClassName` puts `.marketing` on the content wrapper only, which is
 * what keeps Bulma's resets off the documentation pages in the same build.
 */
export type MarketingPageProps = {
  title: string;
  description: string;
  className: string;
  children: React.ReactNode;
};

export default function MarketingPage({
  title,
  description,
  className,
  children,
}: MarketingPageProps) {
  return (
    <Layout title={title} description={description} wrapperClassName="marketing">
      <main className={className}>{children}</main>
    </Layout>
  );
}
