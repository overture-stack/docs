// What the home page's "What you can do with Overture" band renders: each
// heading is a thing a visitor can do, the platform underneath is the
// evidence someone already does it — capability first, proof second.
//
// `platform` is an id into data/platforms.ts, never a typed-out name, so it
// stays a single source of truth with /impact/; figures likewise come from
// metrics.ts, never written directly into a page.

import metrics from "./metrics";
import { AI_DISCOVERY_LINK } from "../constants/externalLinks";

/**
 * Where a capability keeps a screenshot of its own. Only one does. Two of the
 * rest show their platform's portal, which data/platforms.ts already names, and
 * the fourth borrows the quickstart's, below.
 */
const CAPABILITY_SHOTS = "/img/marketing/home/capabilities";

/**
 * The quickstart demo portal (same file HomeQuickstart shows below),
 * standing in on the lab-scale card until a real Drug Discovery Portal shot
 * exists — that portal is internal, so nobody outside the group can
 * capture one. Deliberately unbadged: labelling it "Quickstart portal"
 * would give a placeholder a permanence it isn't meant to have. Swap the
 * file, not the label.
 */
const QUICKSTART_SHOT = "/img/marketing/home/overtureQuickstartPortal.webp";

export type Capability = {
  id: string;
  /** The card's heading, phrased as something the reader can do. */
  action: string;
  /** The evidence, in one sentence, built from metrics.ts. */
  outcome: string;
  /**
   * The platform that proves it, as an id in data/platforms.ts. Absent on a
   * capability with no production deployment behind it yet, which reads as its
   * `note` instead of as a platform.
   */
  platform?: string;
  /**
   * Stands in for the platform line where there is no platform, and caveats it
   * where there is one: the lab-scale card names its platform and still has to
   * say that the reader cannot go and open it.
   */
  note?: string;
  /** Only where the target is not the platform's own page. */
  href?: string;
  /** Overrides the default link text, which names the platform. */
  linkLabel?: string;
  /**
   * Only where the card shows something other than its platform's own portal
   * screenshot, which is the default and comes from data/platforms.ts. Set on
   * the capability with no platform, which would otherwise be the one card in
   * the band with nothing above its heading.
   */
  screenshot?: string;
  /**
   * Names what the screenshot is, in the corner of the shot itself, whenever it
   * is not a running deployment. The band's other three shots are portals
   * anyone can open, so an unlabelled mockup among them would read as a fourth.
   */
  screenshotBadge?: string;
};

export const capabilities: Capability[] = [
  {
    id: "harmonize",
    action: "Harmonize clinical and genomic data across institutions",
    outcome: `${metrics.icgcArgoParticipants.value} participants across ${metrics.icgcArgoPrograms.value} programs in ${metrics.icgcArgoCountries.value} countries, submitted against one data model and searchable as one dataset.`,
    platform: "icgcargo",
  },
  {
    id: "surveillance",
    action: "Run open pathogen surveillance at national scale",
    outcome: `${metrics.imicroseqPathogenGenomes.value} pathogen genomes, plus environmental wastewater surveillance, released openly rather than through an access committee.`,
    platform: "virusseq",
  },
  {
    // This card exists to answer "worth it at my own scale", which three
    // consortium/national-programme cards in a row didn't. HCMI (which held
    // this slot before) is unaffected on /impact/, still with its own card.
    id: "labScale",
    action: "Stand up a portal at one lab's scale",
    outcome: `The OICR Drug Discovery Portal is a single research group's own deployment: ${metrics.ddpRecords.value} records across ${metrics.ddpGenes.value} genes and ${metrics.ddpCancerTypes.value} cancer types, filtered down to candidate gene lists for drug targets.`,
    platform: "drugDiscovery",
    // Said on the card rather than left for the reader to discover, because the
    // other three cards link to portals anyone can open and this one cannot.
    note: "Access is internal to the group; a public release is planned.",
    screenshot: QUICKSTART_SHOT,
  },
  {
    id: "conversational",
    action: "Let researchers ask a portal questions in plain language",
    // Deliberately narrower than the other three: the capability is
    // reachable today through any MCP-compatible client; what's still in
    // development is a researcher-facing host of our own, so the card
    // claims only the former.
    outcome:
      "The Arranger MCP server turns a question into a real search query against a portal's own indexed fields, so a researcher asks for a cohort instead of building one.",
    note: "In development",
    href: AI_DISCOVERY_LINK,
    linkLabel: "Read more",
    // The workshop's mockup of the researcher-facing host still in
    // development, labelled as such. Cropped to its top — the
    // question-in, portal-queried-back part the MCP server actually does
    // today; the code-execution part further down isn't claimed here.
    screenshot: `${CAPABILITY_SHOTS}/conversational-discovery.webp`,
    screenshotBadge: "Mockup",
  },
];
