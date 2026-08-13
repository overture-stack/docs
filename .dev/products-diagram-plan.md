# Products page: interactive stack diagram

Plan for the interactive diagram owed at the top of `/products/`, and the
platform lens on top of it. Written 2026-08-11.

Closes `roadmap.md` § Inputs needed, `[NEEDS: source file and owner] The
Collect / Explore / Control diagram`, by hand-authoring it as inline SVG rather
than waiting on an export of `.dev/referenceMaterial/diagram.pptx`. That is the
one decision in this plan that changes the shape of the blocked item instead of
unblocking it: nothing here needs the pptx, and an SVG we own gets light and
dark, real focus targets and real anchors, none of which a PNG export would
have given us.

## What the page has now, and what it lacks

`src/pages/products/index.tsx` is a hero and one table. The table
(`components/ComponentTable.tsx`) says what each of the eight components does,
grouped Collect / Explore / Control, and links each to its docs page. It is a
good inventory.

Two things it cannot do, both of which the page's own copy already claims:

1. **The shape.** `data/components.ts` § `groups` explains in prose that
   distributed metadata becomes one index, the index becomes a search API, and
   the API becomes a portal. Nothing on the page draws that. A reader learns
   what seven parts are without learning why there are seven.
2. **The proof of a la carte adoption.** The hero says "Take one where you have
   a gap, or the whole stack as a platform". `data/componentUsage.ts` is the
   evidence for the first half of that sentence and appears nowhere on this
   page: no platform runs all eight, ICGC-ARGO runs five, IHCC runs two.

## Deliberate difference from `HeroDiagram`

The home hero already has an interactive diagram of the same eight components.
This one must not read as a second copy of it, so it differs on all three axes
that matter:

| | `HeroDiagram` (home) | `StackDiagram` (products) |
|---|---|---|
| Form | Orbit around a portal, positions from the reference artwork | Left-to-right flow, Control as a band around it |
| Job | "Overture is eight parts" | "The parts fit together like this, and you can take a subset" |
| Click target | Out to `/products/#<id>` | Down to the table row on the same page |

What they should share is plumbing, not appearance: `data/components.ts` for
names, codenames, summaries and icons; `utils/floatingTooltip.ts` for the
tooltip; `context/ComponentHighlightContext.tsx`'s two-axis pattern for
cross-highlighting.

## Phase 1: the flow diagram

**New file `src/marketing/data/componentFlow.ts`.** The edges, as pairs of
`data/components.ts` ids, plus each node's position on a small grid. Positions
live in data for the same reason `heroDiagram.ts`'s do: a visual call belongs
somewhere a person can nudge it without touching a component.

The flow as proposed, all of it derivable from the summaries already in
`data/components.ts`:

- `lectern` to `lyric`: submissions are validated against a dictionary.
- `lyric` to `maestro`, `song` to `maestro`: Maestro's summary names both as
  sources it indexes (confirmed in its README 2026-08-10).
- `song` to `score`: file metadata is cataloged, then the bytes move.
- `maestro` to `arranger`: the index becomes a search API.
- `arranger` to `stage`: the API becomes a portal.
- `control` around all of it, not an edge. It is the band the diagram draws,
  which is how `ComponentTable`'s Control group already describes itself.

`[NEEDS: confirmation]` Two edges are inference, not sourced fact, and should be
confirmed before this ships: whether the dictionary feeds `song` as well as
`lyric`, and whether `score` sits downstream of `song` or beside it.

**New component `src/marketing/components/StackDiagram.tsx`.**

- Inline SVG, nodes positioned from `componentFlow.ts`, each node carrying the
  component's existing icon from `componentIcon(id)`.
- Each node is a real focusable link (`Link` to `#<id>`), so keyboard users get
  the same affordance as the table's own rows, and so a click lands on the row
  rather than leaving the page.
- Hover or focus a node: dim the other nodes, light only the edges in and out
  of that node, show the `floatingTooltip` with functional name, codename and
  summary. Use Pointer Events, not `onMouseEnter`: `@docusaurus/Link` silently
  discards a caller's `onMouseEnter`, which is the bug already documented in
  `HeroDiagram`'s header comment.
- Rendered above `ComponentTable`, below the hero, per `ia-proposal.md`
  § `/products/`.

**Two-way highlight with the table.** A products-scoped provider, or a reuse of
`ComponentHighlightContext` if its two axes fit without contortion: hovering or
focusing a table row lights that node in the diagram, and the diagram's own
hover dims non-matching rows. Same pattern as the hero/carousel pair, one axis
each way.

**Mobile.** `HeroDiagram` is `display: none` below `tablet-up`, which is fine
for a hero decoration and not fine for this page's main orientation device. The
diagram cannot simply vanish on a phone. Two acceptable answers, pick one when
the SVG exists and can be looked at on a real viewport:

- Stack the flow vertically at narrow widths, keeping every node and edge.
- Drop to a Collect (4) / Explore (3) / Control (1) segmented control that
  filters the table in place, which is the diagram's job reduced to a menu.

Prefer the first if it reads; it keeps one component rather than two.

## Phase 2: the platform lens

A row of platform chips beside the diagram, from `data/partnerLogos.ts` and
`data/componentUsage.ts`. Hovering, focusing or selecting a chip dims the
diagram to only the components that platform actually runs. Each chip links to
`/impact/<platform>/`.

This is the cheapest high-value addition in the plan, because
`componentUsage.ts` is already complete and sourced for all nine platforms, and
because the dim/light machinery lands with phase 1. It is also the only place on
the site that proves the modularity claim with real deployments instead of
asserting it.

One honesty constraint carried over from `componentUsage.ts`'s own header: the
mapping is factual content about real deployments, five platforms sourced from
`caseStudies.tsx` and four from the developer directly. If a lens makes a
platform look like it runs less than it does, fix the data, do not soften the
lens.

## Phase 3, optional: "build your stack" picker

A menu of needs rather than product names ("define a data dictionary", "accept
tabular submissions", "search across a cohort", "give people a portal").
Ticking one lights the implied components in the diagram, surfaces the
dependency chain (a portal needs search, search needs an index, an index needs
something to index), and lists which real platforms run that combination.

Most persuasive thing the page could carry, and the most work. It also needs a
dependency graph signed off as fact rather than inferred, since a wrong
implication here becomes a support burden rather than a cosmetic bug. Not a
blocker on phases 1 and 2, and worth doing only after the edges in phase 1 have
been confirmed.

## Reuse on the home page

`ia-proposal.md` § Proposed sitemap wants this figure high on `/home/` as well
as at the top of `/products/`. Phase 1's component should take the click target
as a prop so the home instance links out to `/products/#<id>` while the products
instance scrolls to its own rows. That is the whole difference between the two
placements, so it should not be two components.

Open question for the home page: it already has `HeroDiagram` plus
`LogoCarousel`. Adding a flow diagram there may be one orientation device too
many, and the proposal predates `HeroDiagram` existing. Decide after phase 1
ships on `/products/` and can be seen next to what home already has.

## Order of work

1. Confirm the two inferred edges above.
2. `data/componentFlow.ts`.
3. `StackDiagram.tsx` plus `styles/components/_stack-diagram.scss`, static
   first: nodes, edges, Control band, light and dark.
4. Hover, focus and tooltip. Screenshot at desktop and phone widths before
   calling any of it done.
5. Two-way highlight with `ComponentTable`.
6. Mobile decision, from the screenshots rather than in the abstract.
7. Phase 2 lens.
8. Record in `roadmap.md`: the diagram item moves out of Inputs needed and into
   the shipped table, noting that it was hand-authored as SVG and the pptx was
   never needed.
