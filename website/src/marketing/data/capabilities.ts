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
 * Where a capability keeps a screenshot of its own. Only one does: the other
 * three show their platform's portal, which data/platforms.ts already names.
 */
const CAPABILITY_SHOTS = "/img/marketing/home/capabilities";

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
  /** Stands in for the platform line where there is no platform. */
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
    id: "catalogue",
    action: "Publish a catalogue others can search and build on",
    outcome: `${metrics.hcmiCancerModels.value} unique cancer models with their genomic and clinical annotation, open to anyone and running since ${metrics.hcmiLaunch.value}.`,
    platform: "humanCancerModels",
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
