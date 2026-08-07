import React from "react";
import { H2, H3, P2 } from "./Typography";
import { distinctions } from "../data/components";

/**
 * The three pillars on the home page: modular, open, and yours to host.
 *
 * .dev/ia-proposal.md finding 8, and the most valuable content the reference
 * material unlocked. "Yours to host" is the sovereignty argument in the form
 * that fits every deployment rather than one funder, which is why it is worded
 * that way and not as a national claim.
 *
 * The copy is `distinctions` in data/components.ts, the same array the products
 * page renders under "Where Overture is different". That is deliberate: the two
 * pages should make the same argument in the same words, and one array is the
 * only way to keep them from drifting. The presentations differ because the
 * jobs differ, a three-column band that a visitor scans in one pass here, a
 * read-through list on the page that argues the case.
 *
 * Position is provisional. The proposal puts these fourth, under the proof
 * band, and the home reorder in phase 4 is what settles the final sequence.
 */
export default function HomePillars() {
  return (
    // This carried `ow:md:pb-40` for one afternoon, to clear a floating teal
    // cube that sat `position: relative; bottom: 120px` and rose back into the
    // band, cutting through the last line of the first column. The phase 4 home
    // reorder removed all six cubes, so the padding went with them.
    <section className="HomePillars section blue-bg" aria-labelledby="pillars-heading">
      <div className="container">
        <H2 id="pillars-heading">Modular, open, and yours to host</H2>

        {/* Three across from 768px, matching the other bands on this page.
            It was `lg:` until phase 4 put four grids next to each other and the
            odd one out showed. */}
        <ul className="ow:mt-10 ow:grid ow:gap-10 ow:md:grid-cols-3">
          {distinctions.map((distinction) => (
            <li
              key={distinction.title}
              className="ow:flex ow:flex-col ow:items-start ow:gap-4"
            >
              <div className="yellow-bar" />
              <H3>{distinction.title}</H3>
              <P2>{distinction.text}</P2>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
