// What /collaborate/ offers, in the order .dev/ia-proposal.md puts them.
//
// The same three offers the old /services/ page carried, reordered so academic
// partnership leads, because it is the highest-value ask and the one the page
// exists for. "Services" read commercial for a not-for-profit; the offers did
// not change, the framing did.

import { OVERTURE_SUPPORT } from "../constants/externalLinks";

const ASSETS = "/img/marketing/services";

export type Offer = {
  id: string;
  title: string;
  /** What is on offer, in a sentence or two. */
  blurb: string;
  /** What it concretely includes. Empty where a list would be padding. */
  includes: string[];
  /** Illustration carried over from the services page. */
  image: string;
  /** A free or self-serve route, where one exists, so the page is honest that
   *  not everything here needs a conversation. */
  selfServe?: { label: string; href: string };
};

export const offers: Offer[] = [
  {
    id: "academic-partnership",
    title: "Academic partnership",
    blurb:
      "We collaborate on research projects and join grant proposals as a co-applicant. That covers deploying or adapting Overture for the work, and building whatever the project needs that does not exist yet.",
    includes: [
      "Co-applicant on grant proposals",
      "Platform design for a funded project",
      "Joint development on shared problems",
    ],
    image: `${ASSETS}/img_bottom_white_section.svg`,
  },
  {
    id: "consulting",
    title: "Consulting",
    blurb:
      "We work alongside your team, or on our own, to understand what you are building and get Overture into it. Useful at any stage, and most useful before the architecture is set.",
    includes: [
      "Project architecture and best practices",
      "Migration and software integration",
      "Custom development",
      "Scaling an existing deployment",
    ],
    image: `${ASSETS}/img_grey_section.svg`,
  },
  {
    id: "technical-support",
    title: "Technical support",
    blurb:
      "Help running the software: reviewing a deployment, working through the setup, or getting past something that is not behaving. The community forum is free and public, and it is the fastest route for most questions.",
    includes: [
      "Technical audits",
      "Step-by-step guidance",
      "Troubleshooting",
    ],
    image: `${ASSETS}/img_top_white_section.svg`,
    selfServe: { label: "Ask on the support forum", href: OVERTURE_SUPPORT },
  },
];

export type Engagement = {
  name: string;
  /** What came of it, where something did. */
  outcome?: string;
};

/**
 * Institutions the team has worked with, from the LOI's engagement list.
 *
 * The point of naming them is that this page is an invitation rather than a
 * menu: these are not customers, they are groups who asked and got time. The
 * figure they sit under is in metrics.ts.
 */
export const engagements: Engagement[] = [
  {
    name: "South African National Bioinformatics Institute",
    outcome: "led to the AGARI platform",
  },
  { name: "Harvard", outcome: "4DN Data Portal" },
  { name: "Australian BioCommons", outcome: "ACDC Portal" },
  { name: "Seqera" },
  { name: "Marie Curie Institute" },
  { name: "Barcelona Supercomputing Center" },
];
