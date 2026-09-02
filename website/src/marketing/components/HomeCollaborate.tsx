import React from "react";
import CardTile from "./CardTile";
import { Icon } from "./Icon";
import Link from "./Link";
import { H2, H3 } from "./Typography";
import { offers } from "../data/collaboration";
import metrics from "../data/metrics";
import { COLLABORATE_PATH, IMPACT_PATH } from "../constants/pages";
import {
  GIGASCIENCE_PAPER_LINK,
  GI_PROGRAM_LINK,
  OVERTURE_DOCUMENTATION_TEAM_LINK,
  OVERTURE_GITHUB_LINK,
} from "../constants/externalLinks";

/**
 * "What we do": who builds Overture, how, and what to contact us about. Sits
 * behind `HomeCapabilities` (what before who), and ahead of the
 * documentation/quickstart bands as the staffed route out of the page.
 *
 * The only place the retired /about-us/ page's material exists now,
 * condensed into three paragraphs and a four-item list. The footer's Our
 * story and the /about-us/ 301 both land on the H2 below via its `id`
 * (`ABOUT_BAND` in constants/pages.ts), which is load-bearing, not just an
 * aria target.
 *
 * Opens on what Overture is for, crediting the team second — the heading
 * order asks for the portfolio answer first, who-builds-it as a byline
 * under it.
 *
 * The three offers are `offers` in data/collaboration.ts, the same array
 * /collaborate/ renders from (reading `oneLine` here), so the two pages
 * can't drift apart. Under their own subhead since the band opens on prose
 * about the program, not the offers.
 *
 * No "Our funders / Publications / Who builds Overture" link row at the
 * foot: the funder claim survives as the public-funding sentence below, and
 * the three routes are in the footer.
 */
/**
 * The four claims about how the software is built, each with its
 * /about-us/ badge. `icon` is a key in Icon's own map, not a path. Local
 * here rather than in a data file, since /about-us/ (the only other reader)
 * is gone.
 */
const values = [
  {
    name: "Open source",
    text: "Freely available, and open to contributions from the community.",
    icon: "aboutUsOpenSource",
  },
  {
    name: "Modular",
    text: "Each component has one responsibility and integrates with the rest.",
    icon: "aboutUsModular",
  },
  {
    name: "Extensible",
    text: "Expandable and customizable to what a project actually needs.",
    icon: "aboutUsExtensible",
  },
  {
    name: "Reusable",
    text: "Designed to carry across contexts with minimal modification.",
    icon: "aboutUsReusable",
  },
];

export default function HomeCollaborate() {
  // One offer carries a free route; the line under the cards is composed from
  // whichever one that is rather than hard-coded to technical support.
  const selfServe = offers.find((offer) => offer.selfServe)?.selfServe;

  return (
    // Grey, which came over from `HomeCapabilities` when the two swapped so that
    // the page still runs white then grey below the carousel whatever is in the
    // two slots. Its tiles stay white on the fallback in
    // components/_card-tile.scss: every card band on this page gets a tile that
    // is whatever colour its band is not.
    <section
      className="HomeCollaborate section grey-bg"
      aria-labelledby="collaborate-heading"
    >
      <div className="container">
        <div className="HomeCollaborate__intro">
          <H2 className="ow:text-left" id="collaborate-heading">
            What we do with Overture
          </H2>
          <div className="yellow-bar ow:my-6" />
          {/* No `P1`: all three paragraphs share one class, the smallest
              prose size this site sets, so the opening statement isn't
              visibly bigger than the notes under it. Rules in
              pages/_home.scss `&__prose`. */}
          <p className="HomeCollaborate__prose">
            Our ability to build{" "}
            <Link to={IMPACT_PATH}>a diverse portfolio of data platforms</Link>{" "}
            rests on the continuous development and maintenance of Overture.
            Developed at OICR and{" "}
            <Link to={OVERTURE_GITHUB_LINK}>released as open source</Link>,
            Overture lets our engineers and teams elsewhere build systems that
            help researchers and consortiums across disciplines collect,
            organize and share their research data.
          </p>
          {/* The one credential on this page: a sentence stating the platform
              has been peer reviewed, since the footer's "How to cite us" link
              is about citing, not reviewing. `/impact/` carries the other
              four papers. */}
          <p className="HomeCollaborate__prose">
            The platform is described in{" "}
            <Link to={GIGASCIENCE_PAPER_LINK}>GigaScience (2025)</Link>, peer
            reviewed and open access.
          </p>
        </div>

        {/* The values grid from /about-us/, one line each rather than a card
            each — at card size these four claims read as a second page
            opening inside this band. Badges are /about-us/'s own, carried
            over rather than redrawn. `alt=""` on each: it sits beside the
            word it illustrates, so a screen reader reading it twice is worse
            than not reading it. */}
        <ul className="HomeCollaborate__values">
          {values.map((value) => (
            <li key={value.name}>
              <Icon
                className="HomeCollaborate__valueIcon"
                img={value.icon}
                alt=""
                size="44px"
                loading="lazy"
              />
              <span className="HomeCollaborate__valueName">{value.name}</span>
              <span className="HomeCollaborate__valueText">{value.text}</span>
            </li>
          ))}
        </ul>

        <H3 className="HomeCollaborate__subhead" id="how-we-collaborate-heading">
          How we collaborate
        </H3>

        {/* The same `CardTile` the documentation band below is built from.
            These were bare text columns with a link under each — the tile
            adds edges marking where one offer stops and the next starts, and
            keeps all three link lines flush regardless of the sentence
            above. */}
        <ul className="HomeCollaborate__offers">
          {offers.map((offer) => (
            // Into the section for this offer, not the top of the page —
            // /collaborate/ gives each an id, so three cards feel like one
            // page rather than a detour.
            <CardTile
              key={offer.id}
              title={offer.title}
              href={`${COLLABORATE_PATH}#${offer.id}`}
              linkLabel="What this involves"
            >
              <p>{offer.oneLine}</p>
            </CardTile>
          ))}
        </ul>

        {/* The self-serve route, under the cards rather than inside one: a
            tile is a single link end to end, so a second link inside it
            isn't valid or reachable. Keeps this honest that not everything
            needs a conversation first. The URL comes from
            data/collaboration.ts; the wording is this sentence's own since
            `selfServe.label` is written to stand alone, not mid-sentence. */}
        {selfServe && (
          <p className="HomeCollaborate__selfServe">
            Most questions do not need any of this,{" "}
            <Link to={selfServe.href}>our community support forum</Link> is free
            and public.
          </p>
        )}
      </div>
    </section>
  );
}
