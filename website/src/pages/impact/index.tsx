import React, { useEffect, useState } from "react";
import clsx from "clsx";
import MarketingPage from "../../marketing/MarketingPage";
import Hero from "../../marketing/components/Hero";
import Link from "../../marketing/components/Link";
import { H3 } from "../../marketing/components/Typography";
import {
  OVERTURE_DOCUMENTATION_CITING,
  OVERTURE_DOCUMENTATION_FUNDING,
  OVERTURE_GITHUB_LINK,
} from "../../marketing/constants/externalLinks";
import { PRODUCTS_PATH } from "../../marketing/constants/pages";
import { componentIcon, componentLabel } from "../../marketing/data/components";
import {
  DEPLOYMENTS_ANCHOR,
  deploymentRows,
} from "../../marketing/data/deployments";
import {
  DOCKER_HUB_LINK,
  GHCR_PACKAGES_LINK,
  NPM_SCOPE_LINK,
  containerRegistries,
  ghcrTags,
  npmPackageLink,
  npmPackages,
  releaseHistory,
} from "../../marketing/data/distribution";
import metrics from "../../marketing/data/metrics";
import publications from "../../marketing/data/publications";
import { floatingTooltipPosition } from "../../marketing/utils/floatingTooltip";
import { hoverIntentHandlers } from "../../marketing/utils/hoverIntent";

/**
 * The /impact/ hub, in three sections: who runs Overture, what has been
 * published about it, and how far the code travels.
 *
 *   - **Deployments** (`#platforms`): one table of every deployment there
 *     is, ours and other people's — consolidated from two separate card
 *     grids, since one table reads faster than two.
 *   - **Publications** (`#publications`), five papers.
 *   - **Distribution and release history** (`#distribution`), the
 *     registries and the release table.
 *
 * **Every claim on this page links to the source it came from**, and that is the
 * rule the sections are built to rather than a finishing touch. The one
 * exception is our own documentation traffic, which is our analytics and cannot
 * be checked from outside; the page says so in the sentence that gives the
 * figure rather than letting it sit among the linked ones.
 *
 * Rows are ordered by launch year, most recent first, undated at the foot:
 * see the sort in `data/deployments.ts`, which also owns the type and
 * row-building now — moved out of this file so /products/'s "Used by"
 * column (ComponentTable.tsx) can read the same rows and never link to one
 * that isn't here. Replaced an order that put other people's deployments
 * above ours with an `Independent` badge; the Led by column names the
 * institution behind every row instead.
 *
 * Every row carries its own anchor id, `Platform.id` and the same slug
 * case studies have used since the Gatsby site, so `/impact/#icgcargo` and
 * the 301 from `/case-studies/#icgcargo` still land — on a table row now,
 * not a write-up. `data/caseStudies.tsx` and `components/CaseStudy` had no
 * caller left once the write-up sections were removed, and were deleted.
 *
 * All seven platform rows link to a live portal as of 2026-08-12, when the
 * developer confirmed OHCRN's and PCGL's URLs, except the Drug Discovery
 * Portal, whose access is internal to one group.
 *
 * The lineage tier is still cut from this page; `lineage` stays in
 * `data/platforms.ts` because the home page logo carousel reads it. `adopters`
 * is gone from that file entirely, replaced by `data/dependents.ts`, which is
 * where the AGARI and CQDG rows come from.
 */

/**
 * The aggregate band, three figures.
 *
 * Container pulls and package downloads are gone from here: both count
 * activity (`npm install` runs per CI job, not per person) rather than
 * adoption, and get a fuller treatment in `#distribution`. The
 * external-projects count is gone too: at two organizations, a bare
 * number overstated a claim `#beyond` makes better with names and
 * sources. Every figure that remains carries its source in the label — a
 * figure a reader can't check is one they have to trust, and this page's
 * whole argument is that they don't have to.
 *
 * `key` is its own field since every label is now an element, not a
 * string. Figures come from data/metrics.ts without exception; nothing
 * here is typed in, which is the rule that stopped the last set going stale.
 */
const aggregates: { key: string; figure: string; label: React.ReactNode }[] = [
  {
    key: "platforms",
    figure: metrics.activePlatforms.value,
    label: (
      <>
        <Link to={`#${DEPLOYMENTS_ANCHOR}`}>platforms in production</Link>{" "}
        today
      </>
    ),
  },
  {
    key: "releases",
    figure: metrics.releaseTags.value,
    label: (
      <>
        <Link to="#distribution">published releases</Link> across{" "}
        {metrics.stableReleaseHistory.value}
      </>
    ),
  },
  {
    key: "grants",
    figure: metrics.activeGrants.value,
    label: (
      <>
        active grants <Link to={OVERTURE_DOCUMENTATION_FUNDING}>funding</Link>{" "}
        the platform
      </>
    ),
  },
];

export default function ImpactPage() {
  /**
   * One floating tooltip, two things in it: a screenshot of a deployment, from
   * a row's name, and the name of a component, from an icon in its Runs cell.
   * One piece of state rather than two, because only one can ever be open —
   * they are both driven by the pointer — and two would let a stale one sit
   * behind the other.
   *
   * Rows and icons that have nothing to show are simply not triggers, rather
   * than triggers that open onto nothing: every independent adopter and two of
   * the seven platforms have no screenshot.
   */
  const [tooltip, setTooltip] = useState<{
    kind: "shot" | "label";
    content: string;
    rect: DOMRect;
  } | null>(null);
  const showTooltip =
    (kind: "shot" | "label", content: string) =>
    (event: React.SyntheticEvent<HTMLElement>) => {
      setTooltip({
        kind,
        content,
        rect: event.currentTarget.getBoundingClientRect(),
      });
    };
  const hideTooltip = () => setTooltip(null);

  /**
   * The component id to highlight on arrival, from /products/'s "N
   * deployments" link (ComponentTable.tsx): that link can't point `:target`
   * at several rows at once, so it carries the component id as a query param
   * instead — `?used-by=arranger#platforms` — and this reads it back
   * client-side. Read in an effect rather than during render, so the page's
   * initial markup is the same with or without the param and only gains the
   * highlight after mount, the same way `tooltip` above starts closed on
   * both server and client.
   *
   * The id itself, not a precomputed row list: it drives two things a row id
   * alone couldn't — which rows light up (`highlightedRowIds` below) and
   * which icon in each of those rows' Runs cell gets the glow, the same one
   * the home hero's diagram gives a highlighted hotspot (see
   * `HeroDiagram.tsx`'s `--highlighted` and `_hero-diagram.scss`).
   */
  const [highlightedComponent, setHighlightedComponent] = useState<
    string | null
  >(null);
  /**
   * A single row's own anchor id to highlight on arrival, from the home
   * page's logo carousel (data/partnerLogos.ts): every logo there is exactly
   * one deployment, so it carries that deployment's own id as `?highlight=`
   * — the same param name and "highlight this one thing" meaning
   * ComponentTable.tsx's own `?highlight=` gives a component on /products/ —
   * rather than `used-by` above, which is for a component with several
   * deployments to fan out to. Kept separate from `highlightedComponent`
   * rather than folded into one id, since they answer different questions (a
   * component id vs. a row's own id) and a visitor could in principle arrive
   * with either.
   */
  const [highlightedDeployment, setHighlightedDeployment] = useState<
    string | null
  >(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const componentId = params.get("used-by");
    if (componentId) setHighlightedComponent(componentId);
    const deploymentId = params.get("highlight");
    if (deploymentId) setHighlightedDeployment(deploymentId);
  }, []);

  const highlightedRowIds =
    highlightedComponent || highlightedDeployment
      ? new Set([
          ...(highlightedComponent
            ? deploymentRows
                .filter((row) => row.runs.includes(highlightedComponent))
                .map((row) => row.anchorId)
            : []),
          ...(highlightedDeployment ? [highlightedDeployment] : []),
        ])
      : null;

  // Clears the highlight on a click outside every highlighted row's own
  // bounds, rather than fading it on a timer: with several rows lit at once
  // (see above), a reader scrolling down the table to find all of them could
  // otherwise arrive after the fade had already finished. Only listens while
  // something is actually highlighted, and a click inside a highlighted
  // row — its deployment name, a Runs icon — leaves it lit.
  useEffect(() => {
    if (!highlightedComponent && !highlightedDeployment) return;
    const clearOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".ImpactTable__highlight")) {
        setHighlightedComponent(null);
        setHighlightedDeployment(null);
      }
    };
    document.addEventListener("click", clearOnOutsideClick);
    return () => document.removeEventListener("click", clearOnOutsideClick);
  }, [highlightedComponent, highlightedDeployment]);

  return (
    <MarketingPage
      className="ImpactPage"
      title="Overture Impact"
      description="The research data platforms Overture runs in production, who else builds on it, and the published, downloadable evidence for both."
    >
      {/* No figure is typed into this page, here included: the subtitle reads
          from metrics.ts like everything else. */}
      <Hero
        title="Impact"
        subtitle={`In production on ${metrics.activePlatforms.value} platforms, the oldest of them running since ${metrics.firstDeployment.value}.`}
      />

      {/* Aggregate band. Three figures, each linked to what it was counted
          from. See `aggregates` above. */}
      <section
        className="ImpactAggregate grey-bg"
        aria-label="Overture at a glance"
      >
        <div className="container">
          <dl className="ow:grid ow:gap-6 ow:sm:grid-cols-3">
            {aggregates.map((stat) => (
              <div
                key={stat.key}
                className="ow:flex ow:flex-col ow:gap-1 ow:items-center ow:text-center"
              >
                {/* `first-letter:uppercase` for a figure metrics.ts spells as a
                    word: those read correctly mid-sentence in the subtitle above
                    but cannot start a stat tile in lower case. Numerals, which
                    all six of these are today, are unaffected. */}
                <dt className="ow:text-3xl ow:font-black ow:text-navy ow:first-letter:uppercase">
                  {stat.figure}
                </dt>
                <dd className="ow:text-base ow:text-ink">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* One table, both tiers: the platforms we build and run, and the
          organizations running Overture with no involvement from us. Every row
          carries its own anchor id, since there are no write-up sections below
          for those ids to live on any more; see the note at the top of this
          file. */}
      {/* A heading and a lede stood here until 2026-08-12, then just a lede
          until the developer had the heading restored the same day to match
          the yellow-bar-under-heading pattern the Publications and
          Distribution sections below use. No lede: the table's own column
          heads say what the table is. */}
      <section
        className="ImpactDeployments ow:scroll-mt-20"
        id={DEPLOYMENTS_ANCHOR}
        aria-labelledby="deployments-heading"
      >
        <div className="container">
          <H3 id="deployments-heading" className="ow:text-left">
            Deployments
          </H3>
          <div className="yellow-bar ow:my-6" />

          <table className="ImpactTable ImpactTable--deployments">
            <thead>
              <tr>
                <th scope="col">Deployment</th>
                <th scope="col">What it is</th>
                <th scope="col">Led by</th>
                <th scope="col">Runs</th>
                <th scope="col">Live since</th>
                <th scope="col">Link</th>
              </tr>
            </thead>
            <tbody>
              {deploymentRows.map((row) => (
                <tr
                  key={row.id}
                  id={row.anchorId}
                  className={clsx(
                    "ow:scroll-mt-20",
                    highlightedRowIds?.has(row.anchorId) &&
                      "ImpactTable__highlight",
                  )}
                >
                  <th scope="row">
                    {/* The name is the deployment: hovering it previews the
                        running portal where there is a shot of one, and
                        clicking it opens the thing itself. It was a `span`
                        with nowhere to go until 2026-08-12, which made the one
                        element on the row that shows you the portal the one
                        element that could not take you to it. Rows with no
                        `href` (the internal one) stay plain text. */}
                    {row.href ? (
                      <Link
                        to={row.href}
                        className="ImpactTable__nameTrigger"
                        aria-describedby={
                          row.screenshot ? "ImpactTable-tooltip" : undefined
                        }
                        {...(row.screenshot
                          ? hoverIntentHandlers(
                              showTooltip("shot", row.screenshot),
                              hideTooltip,
                            )
                          : {})}
                      >
                        {row.name}
                      </Link>
                    ) : (
                      row.name
                    )}
                  </th>
                  <td>{row.summary}</td>
                  <td>
                    {[row.institution, row.where].filter(Boolean).join(" · ") ||
                      "—"}
                  </td>
                  {/* Icons rather than the comma-joined list of names this
                      cell used to hold. Seven functional names with their
                      codenames beside them ran to five lines in a column this
                      narrow and was the widest thing in the table; the same
                      seven as artwork is one line. The name is not lost, it
                      moves to the hover, and each icon links to its component
                      on /products/, which the words never did. Same artwork the
                      home hero's diagram and the products table use, by id, so
                      no icon here can drift from the component it names.

                      The link also carries `?highlight={componentId}`, the
                      mirror of this table's own `used-by` param (see above):
                      ComponentTable.tsx reads it back client-side and gives
                      the matching row the same persistent highlight this
                      page's `ImpactTable__highlight` gives a row lit from
                      /products/, rather than only the brief `:target` flash
                      an anchor jump gets on its own. */}
                  <td>
                    {row.runs.length > 0 ? (
                      <ul className="ImpactTable__runs">
                        {row.runs.map((componentId) => (
                          <li key={componentId}>
                            <Link
                              to={`${PRODUCTS_PATH}?highlight=${componentId}#${componentId}`}
                              className={clsx(
                                "ImpactTable__runsLink",
                                componentId === highlightedComponent &&
                                  "ImpactTable__runsLink--highlighted",
                              )}
                              // The icon is decorative and the visible label
                              // only appears on hover, so the accessible name
                              // has to be the whole of it here.
                              aria-label={componentLabel(componentId)}
                              aria-describedby="ImpactTable-tooltip"
                              {...hoverIntentHandlers(
                                showTooltip(
                                  "label",
                                  componentLabel(componentId),
                                ),
                                hideTooltip,
                              )}
                            >
                              <img
                                src={componentIcon(componentId)}
                                alt=""
                                loading="lazy"
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>{row.since ? `Launched ${row.since}` : "—"}</td>
                  <td>
                    <ul className="ImpactTable__linkList">
                      {row.links.map((link) => (
                        <li key={link.href}>
                          <Link to={link.href}>{link.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* One tooltip element for both kinds, sized to what it is about to
            hold: a portal screenshot needs a box, a component's name needs a
            line, and passing the screenshot's dimensions for a label would flip
            it to the wrong side of a trigger near the foot of the window. */}
        {tooltip && (
          <div
            className={`ImpactTable__tooltip ImpactTable__tooltip--${tooltip.kind}`}
            role="tooltip"
            id="ImpactTable-tooltip"
            style={floatingTooltipPosition(
              tooltip.rect,
              "below",
              tooltip.kind === "shot"
                ? { width: 280, estimatedHeight: 180 }
                : { width: 220, estimatedHeight: 44 },
            )}
          >
            {tooltip.kind === "shot" ? (
              <img src={tooltip.content} alt="" />
            ) : (
              tooltip.content
            )}
          </div>
        )}
      </section>

      {/* The four long-form write-up sections stood here, one per platform with
          a case study, each with its own way back up to the table. Removed
          2026-08-12 on the developer's instruction. Their anchor ids moved onto
          the table rows, so the links that used to land on them still land; see
          the note at the top of this file. data/caseStudies.tsx and
          components/CaseStudy were deleted with them, having had no caller
          left on this site. */}

      {/* The peer-reviewed record. Not a citation page: docs.overture.bio owns
          how to cite us and the link at the foot of this section says so. What
          this section is for is the statement that the work has been reviewed
          at all, which this site made nowhere after /impact/publications/ was
          retired. */}
      <section
        className="ImpactPublications grey-bg ow:scroll-mt-20"
        id="publications"
        aria-labelledby="publications-heading"
      >
        <div className="container">
          <H3 id="publications-heading" className="ow:text-left">
            Publications
          </H3>
          <div className="yellow-bar ow:my-6" />

          <ul className="ImpactPublications__list">
            {publications.map((paper) => (
              <li key={paper.id} className="ImpactPublications__item">
                <p className="ImpactPublications__authors">{paper.authors}</p>
                {/* The title is the link, since the DOI is what a reader
                    follows and the title is what they are following it for.
                    The one paper with no DOI is not a link and says why in the
                    line under it rather than resolving to nothing. */}
                <p className="ImpactPublications__title">
                  {paper.href ? (
                    <Link to={paper.href}>{paper.title}</Link>
                  ) : (
                    paper.title
                  )}
                </p>
                <p className="ImpactPublications__venue">
                  {paper.venue}
                  {paper.year ? ` (${paper.year})` : ""}
                  {paper.doi ? ` · ${paper.doi}` : ""}
                  {paper.status ? ` · ${paper.status}` : ""}
                </p>
                <p className="ImpactPublications__relevance">
                  {paper.relevance}
                </p>
              </li>
            ))}
          </ul>

          <p className="ImpactBeyond__note">
            <Link to={OVERTURE_DOCUMENTATION_CITING}>How to cite Overture</Link>{" "}
            is on the documentation site, with the full author list and a
            citation block.
          </p>
        </div>
      </section>

      {/* How far the code travels, and how long it has been travelling. Last,
          because it is the section a reader scrolls to rather than the one they
          arrive for, and because the release table is the longest thing on the
          page. */}
      <section
        className="ImpactDistribution ow:scroll-mt-20"
        id="distribution"
        aria-labelledby="distribution-heading"
      >
        <div className="container">
          <H3 id="distribution-heading" className="ow:text-left">
            Distribution and release history
          </H3>
          <div className="yellow-bar ow:my-6" />

          <div className="ImpactDistribution__figures">
            <div>
              <H3 className="ImpactBeyond__subhead" id="packages-heading">
                Packages
              </H3>
              <p className="ImpactDistribution__figure">
                {metrics.npmDownloads.value}
              </p>
              <p className="ImpactDistribution__caption">
                downloads in the twelve months to 9 August 2026, across{" "}
                <Link to={NPM_SCOPE_LINK}>
                  {metrics.npmPackages.value} published packages
                </Link>
                .
              </p>
              {/* All thirteen, not a top five. The tail is the more interesting
                  half: it says the packages are being taken individually rather
                  than as one bundle. */}
              <dl className="ImpactDistribution__packages">
                {npmPackages.map((pkg) => (
                  <div key={pkg.name}>
                    <dt>
                      <Link to={npmPackageLink(pkg.name)}>{pkg.name}</Link>
                    </dt>
                    <dd>{pkg.downloads}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <H3 className="ImpactBeyond__subhead" id="container-images-heading">
                Container images
              </H3>
              <p className="ImpactDistribution__figure">
                {metrics.containerPulls.value}
              </p>
              <p className="ImpactDistribution__caption">
                cumulative pulls of the seven components&rsquo; images on{" "}
                <Link to={DOCKER_HUB_LINK}>Docker Hub</Link>, led by{" "}
                {containerRegistries
                  .map((image) => `${image.label} at ${image.pulls}`)
                  .join(", ")}
                . Docker Hub is the historical registry. Current distribution
                is the{" "}
                <Link to={GHCR_PACKAGES_LINK}>GitHub Container Registry</Link>,
                which publishes no pull count but carries{" "}
                {ghcrTags.map((image, index) => (
                  <React.Fragment key={image.id}>
                    {index > 0 ? ", " : ""}
                    {image.tags} tags for {image.label}
                  </React.Fragment>
                ))}
                . The figure above therefore stops growing at the point
                distribution moved, and understates use rather than overstating
                it.
              </p>
            </div>
          </div>

          <H3 className="ImpactBeyond__subhead" id="releases-heading">
            Releases
          </H3>
          <p className="ImpactDistribution__figure">
            {metrics.releaseTags.value}
          </p>
          <p className="ImpactDistribution__caption">
            {metrics.releaseTags.value} published releases in total:
            npm packages, container images, and merged release builds where
            that is a component's own mechanism, counted from each one's
            registry rather than from git tags, which this org uses too
            inconsistently to total on their own, spanning{" "}
            {metrics.stableReleaseHistory.value} of continuous release
            activity. All seven components are{" "}
            <Link to={OVERTURE_GITHUB_LINK}>developed in the open</Link>{" "}
            under an OSI-approved AGPL-3.0 licence.
          </p>

          <table className="ImpactTable">
            <thead>
              <tr>
                <th scope="col">Component</th>
                <th scope="col">First release</th>
                <th scope="col">Releases</th>
                <th scope="col">Latest</th>
                <th scope="col">Contributors</th>
              </tr>
            </thead>
            <tbody>
              {releaseHistory.map((component) => (
                <tr key={component.id}>
                  <th scope="row">
                    <Link to={component.tagsHref}>
                      {component.name} ({component.codename})
                    </Link>
                  </th>
                  <td>
                    <Link to={component.firstReleaseHref}>
                      {component.firstRelease}
                    </Link>
                  </td>
                  <td>{component.tags}</td>
                  <td>
                    <Link to={component.latestHref}>{component.latest}</Link>
                  </td>
                  <td>
                    <Link to={component.contributorsHref}>
                      {component.contributors}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </MarketingPage>
  );
}
