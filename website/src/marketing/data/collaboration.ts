// What /collaborate/ offers, in a fixed order.
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
  /** What is on offer, in a sentence or two. Used on /collaborate/ itself. */
  blurb: string;
  /**
   * The same offer in one line, for the home page band, which has three of
   * these side by side and one link out rather than a section each.
   *
   * Written out rather than derived from `blurb`'s first sentence: splitting on
   * a full stop breaks on "Overture." and reads like a truncation when it does
   * not. Keep the two in step; they are the same offer described at two
   * lengths, and they sit in the same file so that is a one-screen check.
   */
  oneLine: string;
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
    oneLine:
      "We collaborate on research projects and join grant proposals as a co-applicant.",
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
    oneLine:
      "We work alongside your team to get Overture into what you are building, and it is most useful before the architecture is set.",
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
    oneLine:
      "Help running the software: reviewing a deployment, working through the setup, or getting past something that is not behaving.",
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

