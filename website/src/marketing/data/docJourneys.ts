// The three hands-on journeys the home page's documentation band shows.
//
// `audience` is quoted verbatim from each journey's own landing page
// (`website/docs/<journey>-docs/index.*`), so the home page cannot describe the
// documentation as something other than what the documentation says it is. If a
// landing page's opening line changes, change these.
//
// Each journey used to carry three deep links, which the cards no longer show:
// a card is a name, who it is for, and the way in, the same three parts as the
// documentation site's own entry tiles. Every destination they named is one
// click further on from `href`.
//
// The fourth journey, community, is not a card: it is already in the navbar
// and the footer, and it is not hands-on in the sense these three are.

import {
  DOCS_DEPLOY,
  DOCS_DEVELOP,
  DOCS_USE,
} from "../constants/externalLinks";

export type DocJourney = {
  id: string;
  title: string;
  /** Verbatim from that journey's landing page. */
  audience: string;
  /** The journey's own landing page, which the whole card links to. */
  href: string;
};

export const docJourneys: DocJourney[] = [
  {
    id: "develop",
    title: "Develop",
    audience:
      "For developers working with or extending Overture components.",
    href: DOCS_DEVELOP,
  },
  {
    id: "deploy",
    title: "Deploy",
    audience: "For teams standing up and operating an Overture instance.",
    href: DOCS_DEPLOY,
  },
  {
    id: "use",
    title: "Use",
    audience:
      "For those interacting with, and managing Overture platforms and services.",
    href: DOCS_USE,
  },
];
