# `/impact/` rebuilt on the RSMF Phase 2 supporting evidence

Agreed and built 2026-08-12. This file is the record of what changed and why, in the same role `home-rebuild-plan.md` plays for the home page. `roadmap.md` § Done carries the one-line summary; the open items this surfaced are in `roadmap.md` § Inputs needed, not repeated here.

The input was the RSMF Phase 2 supporting-evidence deliverable, an OICR-authored two-page PDF for the optional upload under §12.1.2. It had already done the research the site needed: every figure in it is drawn from a public source with the link beside it, collected 2026-08-11. That is what made this a rebuild rather than a research project.

---

## What the evidence had that the site did not

The page before this was a hero, a four-figure band, six platform cards and four write-ups. Against the six sections of the evidence document:

| Evidence section | State on the site before 2026-08-12 |
| --- | --- |
| §1 Publications, four published and one under review | Nothing. A footer link out to `docs/community/citing-us` |
| §2 Third-party adoption: AGARI, Gen3, Indoc, Ferlab | Nothing rendered. `adopters` in `platforms.ts` held three entries, unlinked, one of them ("Overture components in their own stack") too vague to be a claim, and no page read it |
| §3 Production deployments | Partly. Cards existed; lead institution, country and components deployed did not |
| §4 Dependent projects outside OICR, ten repositories | Nothing |
| §5 Distribution: npm, containers, documentation reach | Nothing. The largest gap of the six |
| §6 Release history, 675 tags over eleven years | Understated. `metrics.ts` published `8+ years` |

Sections 2, 4 and 5 were the valuable part. The page argued reach entirely through platforms we run, which undercounts by construction: a deployment has to be big enough for us to have heard of it before it can appear. The registries count everyone, and the forks count institutions that never contacted us at all.

---

## The rule the new sections are built to

**Every claim links to the source it came from.** Not a finishing touch, and not a house-style preference: the argument the new sections make is that other institutions chose this independently, and that argument is worth nothing if a reader has to take our word for it. So the constraint is that nothing goes on the page unless a reader can open the thing that proves it, and where an organization has described the dependency in their own words, those words are quoted rather than paraphrased.

Two claims cannot meet that rule, and both say so in the sentence that makes them rather than in a footnote:

- **Documentation traffic** is our own Matomo instance. The page states that it is the one figure a reader cannot check.
- **The GitHub code-search count** links to a page GitHub serves only to signed-in accounts. The page says the link will not open for everyone.

Being the page that points out its own two soft claims is the cost of the other thirty being hard.

---

## Section order

Hero, aggregate band, **Beyond OICR**, platform cards, write-ups, **Published work**, **Distribution and release history**.

**Other people's work goes above ours.** A reader who reaches `#beyond` before the platform cards has been told that institutions with no relationship to us build on this. That is a harder claim to earn and a stronger one to open with than a longer list of things we built, and the aggregate band directly above it has already given the platform count, so nothing is being withheld.

**The cards and the write-ups stay adjacent.** The cards are the link tree into the write-ups; inserting a section between them would break the one structural relationship the page already had.

**Distribution goes last.** It is the section a reader scrolls to rather than the one they arrive for, and the release table is the longest thing on the page.

---

## Data, not markup

Three new files, following the existing rule that content is data and pages are renderers:

- **`data/dependents.ts`**: `independentAdopters` (four, written up, each with its sources and, for AGARI, the tender's own words) and `dependentRepos` (all ten, as a table), plus `externalContributions` for the two contributions that came back the other way and the code-search figure. It replaces `adopters` in `platforms.ts`, which is deleted rather than left beside it: two lists of adopters is exactly the drift the data layer exists to prevent.
- **`data/publications.ts`**: five entries. The platform paper's link is `GIGASCIENCE_PAPER_LINK` in `constants/externalLinks.ts` instead, because the home page cites it too and a shared link belongs in the shared file; `publications` opens with it regardless so the rendered list is complete.
- **`data/distribution.ts`**: the thirteen npm packages, the container registries, and the seven components' release history.

Totals live in `metrics.ts` with every other published figure, so that file stays the one place to read what the site claims. Seven were added. One was corrected: `stableReleaseHistory` went from `8+ years` to `11 years`, which is not a re-measurement but the removal of an understatement that had no traceable source behind the eight.

`platforms.ts` gained `institution` and `country`. Four of the six platforms are led by someone other than us, and a page that lists six without saying so reads as a portfolio of ours.

`componentLabel()` was added to `data/components.ts` so the cards can print what each deployment runs in the house style. It exists because the unshipped Control row has no codename and would otherwise render as "TBD ()"; it is named for what it does and marked as in development instead.

---

## What was deliberately not done

- **No stat row on the home page.** `HomeCapabilities` removed one already, on the grounds that a row of figures between a heading and its claims delays the claims without supporting any of them. Adding npm and container counts there would repeat that, and pull counts are a developer-audience signal on a page whose job is routing three audiences to a second page. The home page got one sentence: the platform paper, with its DOI.
- **No contributor total.** The seven per-repository counts sum to 140 and the sum is meaningless, because people appear in several of them. The table is published and `metrics.ts` deliberately has no entry for a total.
- **Portal URLs were held back for one round.** The evidence supplied three the site was missing, and shipping a live link on a funder document's say-so is the developer's call rather than ours, since getting one wrong is user-visible breakage. All three were confirmed the same day and are in.
- **`/impact/publications/` was not brought back as a page.** Five entries is a section. The documentation site stays canonical for citation format, and the section links to it.

---

## Discrepancies found between the two documents

Seven. Six closed the same day, on the developer's answers; one is open.

1. **ICGC-ARGO's component list.** The site did not name Lectern; the evidence did. Confirmed and fixed in both `componentUsage.ts` and `caseStudies.tsx`, the latter being where that row was originally derived from. **Closed.**
2. **The release span.** `8+ years` against eleven. The git histories settle it. **Closed.**
3. **Tier 2's content.** Three vague entries against ten sourced ones. **Closed** by `data/dependents.ts`.
4. **Three portal URLs** the evidence had and the site did not. All three confirmed and all three verified live: `ohcrn.ca`, `genomelibrary.ca`, and `imicroseq-dataportal.ca`, which closed two `[NEEDS: URL]` items that had been open since the start of the rebuild. **Closed.**
5. **The ICGC-ARGO registered-user figure.** Removed from the site rather than reconciled, on instruction. It was the only tile in the aggregate band asserting something a reader could not check, so the band is stronger without it. **Closed.**
6. **PCGL's launch date.** Its submission portal is live and launching it was our own directive, so the platform is dated like every other and the site no longer says "In development". **Closed.**
7. **Three platforms' component lists** still disagree: iMicroSeq, OHCRN and PCGL. Both documents were sourced from the developer, and `/impact/` now prints these lists, so the site and the submission visibly contradict each other on three rows. **Open**, and detailed row by row in `roadmap.md` § Inputs needed.

Finding these was worth as much as the rebuild. Six were real errors on one side or the other, and five of the six were on ours.
