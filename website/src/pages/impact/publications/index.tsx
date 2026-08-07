import React from "react";
import MarketingPage from "../../../marketing/MarketingPage";
import Hero from "../../../marketing/components/Hero";
import Link from "../../../marketing/components/Link";
import { H2, H3, L1, P2 } from "../../../marketing/components/Typography";

const DOI = "https://doi.org/10.1093/gigascience/giaf038";
const CC_BY_LINK = "https://creativecommons.org/licenses/by/4.0/";

/**
 * Canonical home for the Overture publication and how to cite it.
 *
 * Content moves here from docs/community-docs/06-citing-us.md, which is now a
 * pointer: a paper and its citation formats are funder-facing and belong on the
 * marketing site, per .dev/ia-proposal.md § The boundary between the two sites.
 *
 * The route sits under /impact/ ahead of the hub itself, which rebuild phase 3
 * builds. Nothing renders at /impact/ until then.
 */
export default function PublicationsPage() {
  return (
    <MarketingPage
      className="PublicationsPage"
      title="Overture Publications"
      description="Overture is published in GigaScience. Read the paper describing the platform, and find the citation formats for referencing it in your own work."
    >
      {/* Keep the subtitle short: the hero graphic starts at 560px on
          desktop-up, and a longer first line runs underneath it. */}
      <Hero
        title="Publications"
        subtitle="The paper describing Overture, and how to cite it."
      />

      {/* The paper */}
      <section>
        <div className="container">
          <div className="header">
            <H2>Overture: an open-source genomics data platform</H2>
          </div>

          <div className="detail-holder">
            <div className="detail">
              <P2>
                Published in <i>GigaScience</i>, volume 14, 2025, article
                giaf038. The paper describes Overture&apos;s architecture, the
                responsibilities of each component, and the research platforms
                built on it.
              </P2>
              <P2>
                <Link to={DOI}>Read the paper</Link>, available under a{" "}
                <Link to={CC_BY_LINK}>
                  Creative Commons Attribution 4.0 International licence
                </Link>
                .
              </P2>
            </div>

            <div className="detail">
              <H3>Details</H3>
              <L1>
                <li>Journal: GigaScience</li>
                <li>Volume 14, 2025</li>
                <li>Article ID: giaf038</li>
                <li>
                  DOI: <Link to={DOI}>10.1093/gigascience/giaf038</Link>
                </li>
                <li>Licence: CC BY 4.0</li>
              </L1>
            </div>
          </div>
        </div>
      </section>

      {/* How to cite */}
      <section className="grey-bg">
        <div className="container">
          <div className="header">
            <H2>How to cite Overture</H2>
          </div>

          <div className="detail-holder">
            <div className="detail">
              <P2>
                Please cite the paper when you use Overture components in your
                research, build a data platform with them, reference the
                architecture, or compare genomics data platforms.
              </P2>
            </div>
          </div>

          <H3 className="citation-heading">Standard</H3>
          <pre className="citation">
            {`Shiell, M., Bajari, R., Andric, D., et al. Overture: an open-source genomics data platform.
GigaScience 14, giaf038 (2025). https://doi.org/10.1093/gigascience/giaf038`}
          </pre>

          <H3 className="citation-heading">APA</H3>
          <pre className="citation">
            {`Shiell, M., Bajari, R., Andric, D., Eubank, J., Chan, B. F., Richardsson, A. J., ... Yung, C. K. (2025).
Overture: an open-source genomics data platform. GigaScience, 14, giaf038.
https://doi.org/10.1093/gigascience/giaf038`}
          </pre>

          <H3 className="citation-heading">Vancouver</H3>
          <pre className="citation">
            {`Shiell M, Bajari R, Andric D, Eubank J, Chan BF, Richardsson AJ, et al.
Overture: an open-source genomics data platform. GigaScience. 2025;14:giaf038.
Available from: https://doi.org/10.1093/gigascience/giaf038`}
          </pre>

          <H3 className="citation-heading">BibTeX</H3>
          <pre className="citation">
            {`@article{shiell2025overture,
  title={Overture: an open-source genomics data platform},
  author={Shiell, Mitchell and Bajari, Rosi and Andric, Dusan and Eubank, Jon and Chan, Brandon F and Richardsson, Anders J and Ali, Azher and Allabadi, Bashar and Alturmessov, Yelizar and Baker, Jared and others},
  journal={GigaScience},
  volume={14},
  pages={giaf038},
  year={2025},
  publisher={Oxford University Press},
  doi={10.1093/gigascience/giaf038},
  url={https://doi.org/10.1093/gigascience/giaf038}
}`}
          </pre>
        </div>
      </section>

      {/* Authors */}
      <section>
        <div className="container">
          <div className="header">
            <H2>Authors</H2>
          </div>

          <div className="detail-holder">
            <div className="detail">
              <P2>
                Mitchell Shiell, Rosi Bajari, Dusan Andric, Jon Eubank, Brandon
                F Chan, Anders J Richardsson, Azher Ali, Bashar Allabadi,
                Yelizar Alturmessov, Jared Baker, Ann Catton, Kim Cullion,
                Daniel DeMaria, Patrick Dos Santos, Henrich Feher, Francois
                Gerthoffert, Minh Ha, Robin A Haw, Atul Kachru, Alexandru Lepsa,
                Alexis Li, Rakesh N Mistry, Hardeep K Nahal-Bose, Aleksandra
                Pejovic, Samantha Rich, Leonardo Rivera, Ciar&aacute;n
                Sch&uuml;tte, Edmund Su, Robert Tisma, Jaser Uddin, Chang Wang,
                Alex N Wilmer, Linda Xiang, Junjun Zhang, Lincoln D Stein,
                Vincent Ferretti, M&eacute;lanie Courtot, Christina K Yung.
              </P2>
            </div>
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}
