import React from "react";
import CardTile from "./CardTile";
import { Icon } from "./Icon";
import Link from "./Link";
import { H2, H3 } from "./Typography";
import { offers } from "../data/collaboration";
import metrics from "../data/metrics";
import { COLLABORATE_PATH, IMPACT_PATH } from "../constants/pages";
import {
  GI_PROGRAM_LINK,
  OVERTURE_DOCUMENTATION_TEAM_LINK,
  OVERTURE_GITHUB_LINK,
} from "../constants/externalLinks";

/**
 * "What we do": who builds Overture, how it is built, and what to contact us
 * about. The second band under the carousel, behind `HomeCapabilities`, which it
 * led for one round: a visitor who has just read what Overture is needs to know
 * what it does before who builds it, and this band is then the staffed route out
 * of the page, offered ahead of the documentation and quickstart bands below.
 *
 * The footer's Our story and the 301 from /about-us/ land on the H2 here, so both
 * now scroll a reader past the capability cards on the way. The anchor is what
 * makes that a scroll rather than a hunt, which is the same reason it is
 * load-bearing below.
 *
 * This band now carries /about-us/ in condensed form, on the developer's call.
 * Everything that page said is here in three paragraphs and a four-item list:
 * who builds it (the Genome Informatics program, its size, what OICR does), the
 * 2017 origin story, and the four values the page spent a grid on.
 *
 * That page has since been removed outright, so this is not a condensed copy of
 * a live page any more: it is the only place the material exists. The footer's
 * Our story and a 301 from /about-us/ both land on the H2 below (the navbar's
 * About item is gone), which is why its `id` is load-bearing and not just an
 * aria target.
 * `ABOUT_BAND` in constants/pages.ts is the one spelling of that address.
 *
 * The band opens on what Overture is for and credits the team second, which is
 * the order the heading asks for: "What we do with Overture" is answered by the
 * portfolio paragraph, and who builds it is a byline under that answer rather
 * than the way in. The two paragraphs are otherwise the ones /about-us/ had.
 *
 * The three offers are `offers` in data/collaboration.ts, the same array
 * /collaborate/ renders a section each from; this reads their `oneLine`, so the
 * two pages describe the same three things and cannot drift apart. They sit
 * under their own subhead now, because the band opens on prose about the program
 * rather than on the offers and the reader needs to be told where one ends and
 * the other starts.
 *
 * Gone: the "Our funders / Publications / Who builds Overture" link row at the
 * foot, on the developer's call. The funder claim it carried survives as the
 * sentence about public funding below; the three routes are in the footer.
 *
 * `engagements` in data/collaboration.ts still has no reader on the site; the
 * styles it used are still in _home.scss.
 */
/**
 * The four claims about how the software is built, with the badge /about-us/
 * gave each one. `icon` is a key in the Icon component's own map, not a path, so
 * a renamed file is one edit there rather than four here.
 *
 * Local to this component rather than a data file: /about-us/ was the only other
 * reader and it is gone, so there is nothing left for the two to drift apart
 * from.
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
          {/* Three paragraphs at one size, and no `P1` on the first of them: it
              was `.t-p1`, which is 24px at desktop, above two 17px notes, so the
              band's opening statement was told in three sizes. They are one
              class now, at the smallest size this site sets prose in, on the
              developer's call. The rules are pages/_home.scss `&__prose`. */}
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
        </div>

        {/* The values grid from /about-us/, one line each instead of a card
            each: four short claims about how the software is built are context
            for the offers below, and at card size they were a second page
            opening inside this band.

            The badges are that page's own, which is the point of carrying them
            here rather than drawing four new ones: this band is what is left of
            /about-us/, and these four marks are the part of it a reader who
            knew the page would recognize. `alt=""` on every one, because each
            sits directly beside the word it illustrates and a screen reader
            reading "Open source" twice is worse than not reading the badge. */}
        <ul className="HomeCollaborate__values">
          {values.map((value) => (
            <li key={value.name}>
              <Icon
                className="HomeCollaborate__valueIcon"
                img={value.icon}
                alt=""
                size="44px"
              />
              <span className="HomeCollaborate__valueName">{value.name}</span>
              <span className="HomeCollaborate__valueText">{value.text}</span>
            </li>
          ))}
        </ul>

        <H3 className="HomeCollaborate__subhead">How we collaborate</H3>

        {/* The same `CardTile` the documentation band at the foot of the page is
            built from, three across on the same grid. These were bare columns of
            text with a link under each, which is what a card is, drawn without
            the box: the tile gives them the edges that say where one offer stops
            and the next starts, and it puts all three "what this involves" lines
            on one floor whatever the sentence above happens to cost. */}
        <ul className="HomeCollaborate__offers">
          {offers.map((offer) => (
            // Into the section for this offer, not the top of the page:
            // /collaborate/ gives each one an id, and the anchor is what makes
            // three cards and one page not feel like a detour.
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

        {/* The self-serve route out of the cards and under them. It belongs to
            one offer, but a tile is a single link end to end and a second link
            inside one is neither valid markup nor reachable, so it reads as a
            line about the band instead. It has to survive somewhere: it is what
            keeps this honest that not everything here needs a conversation with
            us first. The address comes from the offer that carries it, so the
            URL stays in data/collaboration.ts and cannot rot separately here;
            the wording is this sentence's own, because `selfServe.label` is
            written to stand alone as a link and reads as an instruction dropped
            mid-sentence when it is set inside one. */}
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
