// What the home page's "What you can do with Overture" band says, in the four
// entries it renders.
//
// The heading of each entry is a thing a visitor can do; the platform underneath
// is the evidence that someone already does it. That ordering is the whole point
// of the band: the page it replaced led with the platform's name, which answered
// "who uses this" rather than "what is this for".
//
// `platform` is an id into data/platforms.ts, never a name typed out here, so the
// platform's own name, launch year and page stay a single source of truth with
// /impact/. Figures are read from metrics.ts for the same reason, and because no
// published figure on this site is ever written into a page.

import metrics from "./metrics";
import { AI_DISCOVERY_LINK } from "../constants/externalLinks";

/**
 * Where a capability keeps a screenshot of its own. Only one does. Two of the
 * rest show their platform's portal, which data/platforms.ts already names, and
 * the fourth borrows the quickstart's, below.
 */
const CAPABILITY_SHOTS = "/img/marketing/home/capabilities";

/**
 * The quickstart demo portal, the same file HomeQuickstart shows at the foot of
 * this page, standing in on the lab-scale card until a shot of the Drug
 * Discovery Portal exists. That portal is internal, so nobody outside the
 * group can capture one.
 *
 * Deliberately unbadged. It carried a "Quickstart portal" pill for one round, on
 * the reasoning that the band's other shots are the interface their card is
 * about; the developer had it removed, because a placeholder waiting to be
 * swapped is not a claim the page is making and labelling it as one gives it a
 * permanence it is not meant to have. Swap the file, not the label.
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
    // HCMI held this slot until 2026-08-12, as "Publish a catalogue others can
    // search and build on". It was the third card in a row about a consortium
    // or a national programme, so the band answered "what can a large
    // collaboration do with this" three times and never once answered the
    // question most visitors arrive with, which is whether any of it is worth
    // standing up at their own size. HCMI is unaffected on /impact/, where it
    // keeps its card and its write-up; what changed is which platform the home
    // page picks to make this argument.
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
    // Deliberately narrower than the other three. The capability is documented
    // and reachable today through any MCP-compatible client; what is still in
    // development is a researcher-facing host of our own, so the card claims the
    // former and not the latter.
    outcome:
      "The Arranger MCP server turns a question into a real search query against a portal's own indexed fields, so a researcher asks for a cohort instead of building one.",
    note: "In development",
    href: AI_DISCOVERY_LINK,
    linkLabel: "Read more",
    // The workshop's mockup of the researcher-facing host, which is the part
    // still in development, so it is labelled as a mockup on the card. The shot
    // is cropped to its top, where a plain-language question goes in and the
    // portal is queried back: that much is what the MCP server does today, and
    // it is the sentence above it. The code execution further down the mockup
    // is not claimed here and is below the crop.
    screenshot: `${CAPABILITY_SHOTS}/conversational-discovery.webp`,
    screenshotBadge: "Mockup",
  },
];
