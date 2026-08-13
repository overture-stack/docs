# overture.bio: information architecture proposal

A proposal, not a decision. It covers the marketing site only, and assumes the hostname split already decided in `roadmap.md`: `overture.bio` is the public site, `docs.overture.bio` is the documentation site.

Written 2026-08-06 against the ported pages in `website/src/pages/`. Revised the same day against `referenceMaterial/`, which changed enough of it that the first version should not be circulated.

The structural work here is independent of the styling work in `roadmap.md` § Simplifying the marketing site. Either can happen without the other, though doing the IA first means the styling refactor lands on pages that are staying.

## What informed this

Three items in `.dev/referenceMaterial/`, all unpublished:

- **The RSMF Letter of Intent** (`P1-loi-form.md`), submitted, with Phase 2 pending. The most useful document about Overture that exists, because a funder made the team answer questions the website never asks itself: who else does this, why you, what happens if you stop, what does success look like.
- **The Genome Informatics blurb** (`Overture Blurb3.docx`), an OICR program-level positioning document with a metrics list, a deployments list, a team chart, and a partner-logo panel.
- **A component diagram** (`image.png`), plus a second variant inside the blurb.

**Cleared for publication, confirmed 2026-08-07.** The material is pre-award and was written for reviewers, so this was worth asking before drawing on it: the per-platform user counts, the launch timing, the institutions building independently on Overture, and the engagement list may all be published. Nothing in this proposal is gated on sign-off. The one standing caution is that pre-award figures still age, which is what the numbers file below exists to handle.

**And the LOI is written for one funder, so read its emphasis with that in mind.** It is an application to a Canadian agency, so it foregrounds Canadian digital sovereignty throughout. That is a real and well-argued differentiator, but it is a pitch tuned to its reader, not Overture's general position. Overture's own funding is part Canadian and part American, four of its seven platforms are international, and the organizations adopting components independently are in Canada, South Africa and beyond. A website that led with sovereignty would misfit a large share of both its funders and its users. The LOI's facts transfer; its emphasis does not. This proposal was revised on 2026-08-07 to correct for that after the first pass carried the emphasis over uncritically.

---

## Who the site is for

Three audiences arrive at overture.bio, and they want different things. The docs site serves a fourth (someone already using Overture) and serves it well; nothing below should duplicate that.

1. **The evaluator.** A technical lead or bioinformatics director deciding whether to build a platform on Overture. Wants: what this is, who else runs it, how it compares to the alternatives, how to try it. Converts to the docs, GitHub, or a demo.
2. **The funder.** A program officer, reviewer, or institutional partner asking whether the investment is working. Wants: grants, publications, named deployments, numbers, the team, and a reason this cannot be bought elsewhere. Does not convert to anything clickable; needs to be convinced, and needs to be able to cite what convinced them. **Plural and international:** current support spans Canadian and US agencies, so the site cannot be written for either country's framing.
3. **The collaborator.** A PI or institution looking for a co-applicant or a build partner. Converts to the contact address.

The current site serves the evaluator partially, the collaborator badly, and the funder not at all.

**The funder audience is not hypothetical, and it has a clock on it.** An RSMF Phase 2 full proposal is pending, and the LOI cites overture.bio's own traffic as evidence of reach. A reviewer who follows that citation lands on a site that cannot corroborate the application it appears in. That is the strongest single argument for doing the `/impact/` and `/about/funding/` work early rather than after the styling refactor.

---

## What the audit found

Ten findings. The first six came from the checkout, the last four from reading the reference material against it.

**1. The funder-facing content exists, and it is all on the wrong site.** `docs/community-docs/` holds the funding page (four grants with numbers and periods), the GigaScience 2025 publication with DOI and full author list, and a 403-line team page. All of it renders at `docs.overture.bio/community/*`, which is the developer site. A program officer landing on overture.bio cannot find the grant funding Overture, the paper describing it, or the people building it.

**2. The marketing site's own funder page is stale and buried.** `/acknowledgements/` lists ITCR (2021 to 2026) and Canarie (2020 to 2023) and nothing else, while the docs version lists four grants including both current ones. It is reachable only from the footer, twice.

**3. There is a built funding component that nothing renders.** `src/components/FundingStatment/index.tsx` names two grants and has no importers anywhere in the site.

**4. The case studies are the strongest asset and have the weakest placement.** They live as anchors on one page plus a home-page carousel, so **no individual study has a URL**. None can be linked in a grant report, cited in a slide, or shared with its own social card. `data/caseStudies.tsx` already carries a `slug` per study, so the pages are one refactor away.

**5. The Get Started funnel duplicates the docs site and is unmaintained.** `/getting-started/` is the primary nav CTA, sits outside the nav itself, and holds a QuickStart, "Four Ways In", "Explore Our Resources", "Get Involved" and "Reach Out". Its QuickStart still says `git clone -b quickstart`, a branch retired on 2026-07-30. A duplicate funnel going stale within a week of the original moving is the argument against keeping it.

**6. The highest-value ask on the site is its least reachable content.** `/services/` § Academic Collaborations offers to join grant proposals as a co-applicant. For a not-for-profit funded by grants, that is arguably the most valuable conversion available, and it is the third section of the fifth nav item.

**7. The site's deployment list is two generations out of date.** The site shows five case studies: ICGC-ARGO, VirusSeq, Kids First, IHCC and HCMI. The team now describes **seven active platforms**, and the two lists barely overlap. Four current platforms have no presence on the site at all: iMicroSeq, the Ontario Hereditary Cancer Research Network, the Pan-Canadian Genome Library, and the OICR Drug Discovery Portal. Two of the five on the site are not in the current seven, for different reasons. Kids First is historical lineage, an adoption of one component via the GDC rather than a platform the team runs. **VirusSeq is iMicroSeq under a name the team no longer uses**, confirmed 2026-08-07, which is the sharpest version of this finding: the site is not merely missing platforms, it is publishing a live one under a retired name, with copy still framed around COVID-19 sequencing rather than the pathogen and wastewater surveillance it does now. The per-study numbers have drifted too: the site says ICGC-ARGO has 63,116 committed donors across 26 programs in 13 countries, while the current figure is 100,000+ participants across 27 programs in 15 countries with 3,500+ registered users.

**8. The positioning exists now, and none of it is on the site.** The LOI articulates differentiators the website never states. Two transfer directly:

- **Modular.** Each component has one narrow responsibility and deploys alone or as a full stack, so the same building blocks serve a single lab or a multi-institutional consortium, across genomics, pathogen surveillance, clinical and drug-discovery data.
- **Open.** One OSI-approved license across every component, no commercial tier, no paid support gate, no vendor lock-in.

The LOI's third is sovereignty, and it needed generalizing rather than copying. Stated as "Canadian-built, Canadian-hosted, independent of US-funded software" it is an argument aimed at one agency, and it reads as parochial or irrelevant to the majority of Overture's audience. The general claim underneath it is stronger and loses nothing:

- **Yours to host.** You run it, so the data stays under whatever jurisdiction and governance actually applies to you.

Canadian sovereignty is one instance of that. So is EU data residency, so is an institutional policy that data cannot leave a hospital network, and so is the OCAP commitment the LOI itself describes for Indigenous community data. Framed that way it speaks to every deployment rather than to one funder. Confirmed 2026-08-07: the Canadian-specific version is not wanted anywhere on the site, so this replaces it rather than sitting alongside it.

The LOI also does the thing marketing sites almost never do well, and this one does not attempt: an honest comparison against three adjacent projects, saying where each is genuinely better and where Overture is complementary rather than competing.

**Longevity is the fourth claim, and it belongs in the proof band rather than the pillars** (decided 2026-08-07). Eight or more years of stable production releases, first deployment in 2016, seven platforms running today. For an evaluator deciding whether to build a decade-long research platform on someone else's software, that is the question that actually keeps them up at night. It sits better as evidence than as a pillar, because it is a number rather than a design property, and numbers belong with the other numbers.

**9. The components are being renamed in functional terms, and the site still leads with codenames.** Both diagrams in the reference material label the stack by what each part does rather than what it is called: Dictionary Manager, Tabular Submission (labelled Data Manager in the other variant), File Manager, File Transfer, Indexing Service, Search, Portal UI, plus Control around the outside. They also group the stack into **Collect**, **Explore**, **Control**, and **Customization & Integration**. Those map cleanly onto the codenames the products page uses today:

| Functional name | Codename | Group |
|---|---|---|
| Dictionary Manager | Lectern | Collect |
| Tabular Submission | Lyric | Collect |
| File Manager | Song | Collect |
| File Transfer | Score | Collect |
| Indexing Service | Maestro | Explore |
| Search | Arranger | Explore |
| Portal UI | Stage | Explore |
| Control | access and authorization | Control |

House style, settled 2026-08-07: **functional name first, codename beside it**, as "Tabular Submission (Lyric)". The two diagrams disagreed on the Lyric label; "Tabular Submission" is correct and "Data Manager" is retired, so whichever diagram carries the old label needs regenerating before it ships.

**10. Who builds Overture is almost invisible, and what there is sits in the fine print.** Across the whole marketing site, "OICR" or "Ontario Institute for Cancer Research" appears in substance in exactly two sentences, both mid-page on `/about-us/`, plus a meta description and a footer logo. Every other occurrence is inside the privacy and terms boilerplate. The home page never says it. The products page never says it. Neither does any case study.

That is backwards for all three audiences. An evaluator weighing a decade-long dependency wants to know there is a named institution behind it, not an unattributed GitHub organization. A funder needs the institutional identity before anything else, because that is the entity they would be funding. A prospective collaborator is looking for a research institution to partner with, and cannot tell from the site that there is one.

The reference material supplies exactly what is missing: Overture is developed and built by the **Genome Informatics program at the Ontario Institute for Cancer Research**, a software engineering team of nineteen. Being the software output of a named cancer research institute is a credential, and the site currently hides it behind a cookie policy.

**The treatment is "subtle but present" (decided 2026-08-07), which is a real constraint and not a hedge.** Overture keeps its own identity and its own voice; OICR is the institution behind it, not a co-brand. Concretely that rules some things out and some things in:

- **In:** one line of text under the hero, on the home page. A small OICR mark in the footer, which already exists. The About page opening with who builds Overture instead of reaching it in paragraph three. The phrasing follows the verb: developed and built by, not "a product of" or "powered by".
- **Out:** a co-branded logo lockup in the navbar, OICR in the site title, an OICR colour or type system, or attribution repeated on every page. Present on every page is the footer's job, and it already does it.

The distinction matters because the failure mode in each direction is different. Too little and the site reads as an unattributed GitHub organization, which is where it is now. Too much and it reads as institutional marketing, which is worse for the evaluator audience than saying nothing.

There is also a one-directional link problem: the docs navbar has no route back to overture.bio. Only two legal links in the docs footer point there.

---

## Proposed sitemap

```
/                              Home
/products/                     What Overture is, grouped by what it does
/impact/                       Hub: aggregate evidence
  /impact/<platform>/          One page per active platform
  /impact/publications/        Papers and how to cite
/collaborate/                  Support, consulting, academic partnership
/about/                        Story, values, who builds it
  /about/funding/              Canonical funder page
/privacy/                      Utility, footer only
/terms-conditions/             Utility, footer only
```

Four routes retire (`/getting-started/`, `/services/`, `/acknowledgements/`, `/case-studies/`). The page count still rises, and all the growth is deployments becoming addressable.

**`/products/` keeps its URL.** Changing it to `/platform/` costs a redirect and breaks external links to buy a naming preference. The page's job changes; its address does not.

**`/case-studies/` becomes `/impact/`.** Worth the churn, because the section stops being only case studies: it gains aggregate numbers and the publications page, and "Impact" is the one nav word that speaks to funders. The alternative, keeping `/case-studies/` and adding `/case-studies/<slug>/`, is less disruptive and keeps the term evaluators expect; it is a reasonable call if the churn is unwelcome.

---

## What each page is for

### `/` Home

One job: get each of the three audiences to the right second page inside one scroll.

1. **Hero.** What Overture is and who it is for, in one sentence, plus two CTAs. "Build. Deploy. Discover." should go; it says nothing to anyone who does not already know what Overture is. The LOI's own opening sentence is a better starting point than anything currently on the page.
2. **Institutional attribution, in the hero itself.** One line, immediately under the hero copy: developed and built by the Genome Informatics program at the Ontario Institute for Cancer Research. This is finding 10, and putting it in the hero rather than a band further down is deliberate; it is the sentence that makes everything below it credible, and it costs one line.
3. **Proof band, high.** Aggregate numbers and partner logos, now carrying longevity: eight or more years of stable releases, first deployment in 2016, seven platforms in production today. The blurb's logo panel and metrics list are close to drop-in.
4. **The three pillars: modular, open, and yours to host.** This is finding 8, and it is the most valuable content the reference material unlocks. "Yours to host" carries the sovereignty argument in a form that fits every deployment rather than one funder.
5. **What Overture is made of.** The Collect / Explore / Control diagram, high, as the orientation device, linking once to `/products/` for the detail. This is the part of the products content that earns a place near the top of the home page; the catalogue and the comparison stay on their own page.
6. **Featured deployments.** Three cards to `/impact/<platform>/`, replacing the carousel.
7. **Three doors**, one per audience: deploy it (docs), collaborate with us (`/collaborate/`), fund or partner (`/about/funding/`).
8. **Funders and publication.** Funder logos here should be shown in full, Canadian and American together, which is both accurate and a stronger signal than either alone.

### `/products/` What Overture is made of

Today it runs seven near-identical sections of three features each, which is a spec sheet the docs site already does better. Restructure it around the diagram's grouping instead:

- **Collect**, four components. **Explore**, three. **Control** around both.
- One row per component: functional name with the codename beside it, one sentence, and a single link to its docs page. This is also the page that teaches the pairing, so someone who arrives knowing only "Arranger" leaves knowing it is the search service, and vice versa.
- A **how Overture compares** section, adapted from the LOI's landscape answer. Naming the three adjacent projects and saying plainly where each is stronger is more persuasive to an evaluator than seven feature triplets, and it is the kind of content that gets a page linked to. Generalize the governance point as you go: the LOI's version is that Canadian platforms on Gen3 inherit US-oriented governance, and the version that belongs on the site is that **any** institution outside the US inherits it. That is a broader and more useful statement of the same fact, and it makes the comparison read as analysis rather than as a national pitch.

This also dissolves the pending copy problem in `roadmap.md`: the three new sections needing sign-off become three table rows, and the missing section artwork for two of them stops mattering, because the page is carried by one diagram rather than seven illustrations.

### `/impact/` Hub

Three tiers, because the reference material distinguishes them and the current single list flattens them:

1. **Platforms the team builds and runs.** Seven, each with its own page.
2. **Organizations building on Overture independently.** Three named in the LOI. This tier is arguably the most persuasive evidence on the whole site and currently appears nowhere: it is the difference between "we built seven things" and "other people choose this".
3. **Lineage.** ICGC 25K, the GDC, Kids First. Historical rather than current, and honest about it. This is where Kids First goes.

Above the tiers: the aggregate band. Below: a link to publications. Each card keeps `id="icgcargo"` and its siblings, so today's fragment links still land in the right place after the redirect.

### `/impact/<platform>/` One per platform

Own URL, own description, own social card. Seven pages, from three sources:

- **Four carry forward** from `data/caseStudies.tsx`: ICGC-ARGO, IHCC, HCMI, and VirusSeq under its current name.
- **VirusSeq becomes iMicroSeq**, which is a rewrite rather than a rename. The existing study is framed around COVID-19 sequencing; the platform is now pathogen genomes plus environmental wastewater data at a scale the old copy does not describe. The page keeps its content lineage and loses its framing.
- **Three are new and need writing**: OHCRN, PCGL, and the OICR Drug Discovery Portal. This is the largest single content task in the proposal, and all three have a usable paragraph in the reference material already.

Kids First drops out of this tier entirely and into lineage.

### `/impact/publications/`

Canonical home for the GigaScience 2025 paper, DOI, author list, and citation block. Content moves from `docs/community-docs/06-citing-us.md`; that file becomes a pointer.

### `/collaborate/` (was `/services/`)

Same three offers, reordered so academic partnership leads, since it is the highest-value ask. "Services" reads commercial for a not-for-profit; "Collaborate" describes what is on offer. Absorbs "Get Involved" and "Reach Out" from the retiring getting-started page. One clear contact route rather than three repetitions of an email address.

Worth adding, from the LOI: the team fields roughly eight external engagements a year, and several named international institutions came through that door. Saying so makes the page an invitation rather than a menu.

### `/about/`

Currently the page opens with values and reaches OICR in its third paragraph, as a passing mention. Invert that. The first thing on the page should be who builds Overture: a software engineering team of nineteen, the Genome Informatics program at the Ontario Institute for Cancer Research. Describe them as engineers rather than as a taxonomy of roles; a role breakdown reads like an org chart justifying headcount, while "a software engineering team at a cancer research institute" is the credential. The blurb supplies a team photograph, which does more for the collaborator and funder audiences than another values grid.

Then the story, which is genuinely good and should stay: Overture exists because organizations kept asking how to deploy ICGC components, and the team kept rebuilding the same foundations. That is a credible origin, and it is currently the strongest paragraph on the site.

Link to the full team roster on the docs site rather than copying it.

### `/about/funding/`

The canonical funder page, replacing `/acknowledgements/`. Content moves from `docs/community-docs/02-funding.md`, which is the maintained version, and gains funder logos. The docs file becomes a pointer. The unused `FundingStatment` component becomes the band on the home page and in the footer.

---

## One source for the numbers

Finding 7 is a process problem, not a content problem. The site's numbers went stale because they were typed into JSX once, while the numbers that matter are maintained in grant documents that never flow back.

Put every claim in one `data/metrics.ts`, each entry carrying its value, its source, and the date it was last verified. Pages read from it; nothing hardcodes a figure. Then the site becomes the publishable view of the numbers the team already keeps for funders, which is the only arrangement where a reviewer following a citation from an application finds it corroborated.

This matters more than it sounds. Numbers that go stale in public are worse than no numbers, particularly for the audience most likely to check them.

**Ownership sits with the site maintainer (confirmed 2026-08-07), which means the mechanism has to do the remembering.** A single-owner convention with no enforcement is how the current figures drifted in the first place. Two cheap things make it hold:

- **Refresh on use.** Any figure quoted in a funding document gets verified as part of writing that document, which is when it is being checked anyway. That is the natural cadence: the numbers move when the grant cycle moves, not on an arbitrary calendar.
- **Make staleness fail loudly.** The `verified` date per entry is only useful if something reads it. Add a check that errors when an entry is older than six months, and hang it off the build gate in `roadmap.md` § Known issues when that lands. Six months matches the documentation-currency commitment already in the Parked RSMF entry, so one cadence covers both.

---

## Navigation

**Primary nav.** Four items plus three actions, against today's five plus two.

```
Products    Impact    Collaborate    About        Docs ↗   GitHub ↗   [Get Started]
```

`Get Started` points at the docs quickstart, not at a marketing page. That handoff is the whole reason `/getting-started/` can retire.

**Footer.** Four columns, replacing today's flat list of six links plus a legal row that repeats Acknowledgements a second time.

| Platform | Impact | Connect | About |
|---|---|---|---|
| Products | Deployments | Collaborate | Our story |
| Documentation ↗ | Publications | Support forum ↗ | Team ↗ |
| GitHub ↗ | Funding | Community ↗ | OICR ↗ |
| Software licensing ↗ | | Contact | |

Legal row: copyright, Privacy, Terms, Netlify badge.

---

## Redirects

Every retiring route needs one, in whatever Netlify config stage 3 produces.

| From | To | Note |
|---|---|---|
| `/case-studies/` | `/impact/` | Browsers preserve the fragment across a 301, so `#icgcargo` and its siblings land on the matching hub cards |
| `/services/` | `/collaborate/` | |
| `/acknowledgements/` | `/about/funding/` | Also linked twice from today's footer |
| `/getting-started/` | docs quickstart | Cross-host |
| `/about-us/` | `/about/` | Optional; keeping `/about-us/` is also fine |
| `/home/` | `/` | Already planned in stage 3 |

Fragment redirects cannot be done server-side, since browsers do not send the fragment. Retaining the ids on the `/impact/` hub is the mechanism, not a redirect rule.

---

## The boundary between the two sites

Four rules, so the duplication in finding 1 does not reappear:

1. **overture.bio answers what, who, why and with whom. docs.overture.bio answers how.**
2. **No component reference on overture.bio.** Every component named there links once to its docs page.
3. **Funder-facing content is canonical on overture.bio**, with a pointer from the docs community section. Developer-community content (contributing, code of conduct, support, team roster) stays canonical on docs.
4. **The link goes both ways.** Add an overture.bio item to the docs navbar. Today the only routes back are two legal links in the docs footer.

---

## Deliberately not in this IA

- **A `/community/` marketing page.** This answers the standing open question in `roadmap.md`: leave it retired. The docs community section plus the nav link covers it, and `/community` is the `routeBasePath` of the community docs plugin instance.
- **Audience-first navigation** ("For researchers / For funders / For developers"). Visitors do not reliably self-identify, and it triples what a one-developer team maintains. Each proposed section has a primary audience without announcing it.
- **A blog or news section.** Nothing currently feeds one, and an empty blog dated eighteen months ago actively damages the funder audience.
- **A page for the Courtot Lab.** It is a sibling of Overture within the same program, not part of it. It belongs in the OICR program's own material, with at most a link from `/about/`.
- **A metrics dashboard.** The aggregate band gets the same job done with numbers that already exist.

---

## Sequencing

Start now. The original gate, "do not start before stage 3 ships" so the stage 2 fidelity comparison stays possible, was lifted on 2026-08-07: the restructure is what this branch is for and it does not wait on hosting or on a Netlify deploy review. `baseline-stage2/` still holds the pre-rebuild capture for whatever comparison is worth making. The order below changed after the reference material, because the funder track now has a live deadline.

1. **Content moves, no new pages.** Funding and publications from `docs/community-docs/` to the marketing site, pointers left behind. Retire `/getting-started/`. Fixes findings 1, 2, 3 and 5, and needs no copy decisions.
2. **The numbers file, and correct what is already published.** Fixes the stale half of finding 7 immediately, independently of any restructure.
3. **Institutional attribution.** Finding 10. The hero line and the About page inversion; the footer mark already exists. Smallest task in this list, and every other audience-facing claim rests on it.
4. **The three pillars on home.** Finding 8. Small, high value, and drafted in the LOI apart from the third pillar, which is the generalized "yours to host" rather than the LOI's wording.
5. **`/impact/` restructure**, three tiers, plus the platform pages. The largest content task, and the one the Phase 2 timeline argues for pulling forward.
6. **Nav and footer restructure**, redirects, and the docs-navbar link back.
7. **`/products/` regrouped** around Collect / Explore / Control, with the comparison section. Supersedes the pending sign-off on the three new sections.
8. **Home reorder.** Last, because it depends on everything above existing.

Steps 1, 2, 3 and 6 are developer tasks against content that already exists. Steps 4, 5, 7 and 8 need copy written or rewritten, all of it from source material that is cleared and mostly drafted.

## Decided (2026-08-07)

- **`/impact/`, not `/case-studies/`.** The section and the nav label both change; the redirect table above already covers it.
- **Functional name first, codename beside it.** House style is "Tabular Submission (Lyric)", not one or the other alone, and not the codename first. It reads clearly for an evaluator while staying searchable for anyone looking for a repository. Applies everywhere the components are named on this site, including the diagram, the products table, and any deployment page describing which parts a platform uses.
- **"Tabular Submission" is the correct label for the Lyric slot.** "Data Manager", from the other diagram variant, is retired. Whichever diagram carries the old label needs regenerating before it ships.
- **Funding and publications content moves to overture.bio.** The `docs/community-docs/` originals become pointers rather than copies.
- **`/products/` stays, as a page and as a nav label.** See below for why the alternative was considered and rejected.
- **VirusSeq is iMicroSeq renamed**, not a separate platform. One page carries the content forward under the current name, tier one of `/impact/` is seven entries, and the copy needs rewriting rather than relabelling, since the platform's scope moved with the name.
- **Everything in `referenceMaterial/` may be published.** No figure, partner name, launch date, or engagement in it is held back, so nothing in this proposal waits on sign-off.
- **OICR attribution is subtle but present.** A hero line and the existing footer mark, not a co-brand. Detail under finding 10.
- **Longevity moves to the proof band**, leaving three pillars: modular, open, yours to host.
- **No Canadian-specific sovereignty framing anywhere on the site.** The generalized "yours to host" replaces it rather than sitting beside it.
- **The site maintainer owns the numbers**, refreshed whenever a figure is used in a funding document, with a six-month staleness check wired into the build gate.
- **The team is described as software engineers**, not as a taxonomy of roles. Overture is built by a software engineering team at OICR, and the About page should say that rather than enumerate developers, bioinformaticians, DevOps, product and design as separate professions.

### Why `/products/` stays rather than collapsing into the hero

The question raised was whether the products content could simply live in the home hero. It should not, though something close to it should.

A hero has one job, which is orientation plus a next click, and it has a few seconds to do it. Seven components, a Collect / Explore / Control grouping, and a comparison against three adjacent projects is not that. More concretely, `/products/` needs to survive as a page for three reasons: it is where an evaluator lands from search and from the docs site, the comparison content is the most linkable thing the site will have and needs somewhere to live, and a URL is what gets pasted into a grant application or a slide.

What should move up is the **diagram**, not the page. Put the Collect / Explore / Control figure high on the home page as the orientation device, since one picture does more than a paragraph here, and keep the depth on `/products/`. That gets the benefit the question was reaching for without asking a hero to carry a catalogue.

---

## Status

**Every open decision closed on 2026-08-07, and nothing here is blocked.** This is no longer a proposal awaiting answers; it is a plan awaiting a start date, and its start date is stage 3 shipping.

What remains is execution, and two things inside it are worth naming so they are not mistaken for open questions:

- **Copy review on the new pages.** Three platform pages, the products rewrite, and the home reorder all need someone to read the words before they ship. That is a normal review step, not a decision, and the reference material means none of it starts from a blank page.
- **The visual treatment of the OICR line and mark.** Settled in principle, subtle but present; what it looks like is a design call made while building it, not a prerequisite.
