# RSMF — Letter of Intent (LOI) · As Submitted

**Applicant:** OICR · **Software:** Overture · **Stream:** Large Sustaining Grant (24 months)

> **Record of submission.** Reproduced from the submitted LOI document (`01_LOI.html`). Responses are verbatim as submitted, apart from unambiguous spelling fixes; see [Errata in the submitted text](#errata-in-the-submitted-text) for the discrepancies carried through. Use this as the Phase 1 baseline when drafting the Phase 2 full proposal — do not treat it as a live draft.

---

## Section 1: Eligibility

### 1.1 Organization eligibility

_Check all that apply._

- ☐ A Canadian university, post-secondary college, educational institution, or hospital that receives public funding and carries on, or is capable of carrying on, meaningful research.
- ☑ A Canadian non-profit organization that carries on, or is capable of carrying on, meaningful research.
- ☑ A Canadian institution or non-profit organization whose activities support Canada's digital research infrastructure (DRI) ecosystem.

### 1.2 Lead Applicant eligibility

- **Yes** — The Lead Applicant is based at an eligible research organization in Canada.

### 1.3 Software status

- **Yes** — The software is existing research software (not a new build).
- **Yes** — The software has had at least one stable/production release.
- **Yes** — The software is actively used by users beyond the originating team/organization (including Canadian researchers).
- **Yes** — The research software is released under an open-source license, or a clear justification is provided where this is not feasible.

### 1.4 Scope of proposed work

- **Yes** — Proposed activities are primarily focused on maintenance and sustainability (e.g., technical debt, refactoring, testing, documentation, security, sovereignty, operations).
- **Yes** — The Recipient agrees to contribute (either time, knowledge and/or expertise) to Alliance research software activities (Ex. Participate in focus groups for the National Research Software Platform).

### 1.5 Team composition

- **Yes** — The team includes (or will include) at least one software developer or expert with experience in software quality practices (e.g., testing, CI/CD, code quality tooling, security).
- **Yes** — No more than 75% of co-leads are from non-academic organizations (e.g., business, government, third sector, international institutions). _(No co-leads — single lead applicant.)_

---

## Section 2: Applicant and Project Information

### 2.1 Applicant Information

Two columns, because the working draft and the Alliance portal disagree. **The portal values are what the Alliance holds on file.**

| Field                          | Working draft                                             | Portal (authoritative)                  |
| ------------------------------ | --------------------------------------------------------- | --------------------------------------- |
| Lead Organization (legal name) | Ontario Institute for Cancer Research (OICR)              | Ontario Institute for Cancer Research   |
| Department (if applicable)     | Genome Informatics                                        | Genome Informatics                      |
| Organization type              | Non-profit                                                | Non-profit                              |
| Lead Applicant Name            | Dr. Melanie Courtot                                       | Melanie Courtot                         |
| Lead Applicant Title           | Director and Principal Investigator I, Genome Informatics | **Senior Director, Genome Informatics** |

### 2.2 Project Information

| Field                               | Working draft                                                                                  | Portal (authoritative)         |
| ----------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------ |
| Project Title                       | Overture Platform Maintenance and Sustainability for Sovereign Digital Research Infrastructure | _(as drafted)_                 |
| Email Address                       | melanie.courtot@utoronto.ca                                                                    | **mcourtot@oicr.on.ca**        |
| Requested project duration (months) | 24                                                                                             | 24                             |

**Stream and duration requested (select one):**

- ☐ Small Maintenance Grant (up to $150,000; up to 12 months)
- ☑ Large Sustaining Grant (up to $500,000; up to 24 months)
  - Portal annotation: **300K over 24 months**

---

## Section 3: Software Overview

### 3.1 Software identification `max 200 words`

_Briefly describe the software platform/tool (name, main purpose, research domain(s), access model)._

Overture is an open-source, microservice-based data platform that helps researchers store, organize, explore, and share research data. Originally developed to support major projects like International Cancer Genome Consortium (ICGC), the NCI Genomic Data Commons (GDC), and the Gabriella Miller Kids First portal, Overture has since evolved into a generalized solution for large-scale research data management. Today, it enables research institutions to build, deploy, and maintain data management platforms for large-scale research data at a fraction of conventional development cost. Overture's reusable components each have a narrow, well-defined responsibility spanning data submission, file transfer, search, and exploration. These generalized building blocks can be deployed independently or as an integrated stack and configured into highly specialized platforms at any scale from a single lab to a large multi-institutional consortium.

Overture is designed around FAIR (Findable, Accessible, Interoperable, Reusable) data-sharing principles and underpins many major Canadian and international research platforms, including ICGC-ARGO (genomic and clinical data for 100,000+ participants), iMicroSeq (iMS) (600,000+ pathogen genomes and environmental wastewater data), the Ontario Hereditary Cancer Research Network (OHCRN), and the Pan-Canadian Genome Library (PCGL).

_(— 179 words —)_

### 3.2 Software maturity and user base

_(i) Summarize current maturity (e.g., stable releases, deployment environments) and describe the external user base, including Canadian researchers and institutions. (max 200 words)_

Overture runs in production across a total of seven active research platforms spanning Canadian and international institutions. Canadian deployments include the PCGL (launch November 2026), a federal genomic infrastructure initiative hosted at McGill, iMS (launched 2021), the OICR Drug Discovery Portal and OHCRN (launched 2025). International deployments include ICGC-ARGO (launched 2019), IHCC (launched 2020), and HCMI (launched 2016).

All core components follow independent semantic versioning and carry eight or more years of stable production releases, each actively maintained with dozens of contributors. Arranger, the most widely deployed component with 34 contributors, emerged from the ICGC project and was later adopted by the NCI Genomic Data Commons and the Gabriella Miller Kids First portal. Song and Score have run in production since 2018, deployed across 5 of the 7 active platforms with 39 combined releases.

The external user base comprises cancer genomics researchers, clinicians, bioinformatics specialists, and software engineering teams at Canadian and international institutions. Organizations building independently on Overture components include CHU Sainte-Justine in Montréal (Lectern, Arranger), the South African National Bioinformatics Institute (SANBI), and InDoc Research in Toronto (Arranger). Together these deployments demonstrate stability across diverse research domains and operational scales.

_(— 186 words —)_

_(ii) What is the estimated total number of researchers actively using the research software? Discuss both internal users (within the PI's research group) and external users (outside the development team or institution). (max 200 words)_

Exact external user counts are difficult to attain for platforms owned and operated by external institutions (HCMI, iMS, PCGL). For controlled-access resources our team directly manages, ICGC-ARGO alone has 3,500+ registered users, and we suspect the total across all seven platforms is substantially higher. Internally, 15+ researchers and staff at OICR use Overture, supported by our 19-person core team, which formally collaborates with ~100+ external personnel staffing the consortia and projects that run Overture-based platforms.

Website traffic reflects broader reach: overture.bio and docs.overture.bio have attracted nearly 9,000 unique visitors from 46+ countries since 2024, with annual unique visitors growing over 40% year-over-year and mid-2026 traffic up 66% compared to the same period in 2025.

Overture also serves as a source of cross-pollination for design and architectural decisions across the broader research software community. The team on average conducts ~8 stakeholder engagements annually covering platform demonstrations, needs assessments, and technical guidance, this has included institutions spanning academic, clinical, and government research contexts. Notable engagements include SANBI, which led to the development of the AGARI platform, Harvard (4DN Data portal), Australia BioCommons (ACDC Portal), Seqera, the Marie Curie Institute & the Barcelona Supercomputing Center.

_(— 192 words —)_

### 3.3 Research software landscape

_(i) Have you considered other similar research software used in this research area (if applicable)?_

- ☑ Yes
- ☐ No

_(ii) If Yes, briefly describe how the proposed software is distinct, complementary, or provides unique value relative to existing alternatives. (max 400 words) If No, explain why no comparable software exists and why the proposed activities are well-justified. (max 400 words)_

Three projects occupy adjacent space. Neither is a domain-agnostic alternative developed and maintained in Canada.

**Gen3** (University of Chicago, Center for Translational Data Science) is the closest functional analog: an open-source microservice stack for building data commons. It is, however, built around and tightly coupled to United States research infrastructure, developed under NIH funding and deployed primarily across NIH data commons (NCI, NHLBI, NHGRI, and others). Canadian platforms building on Gen3 inherit a dependence on a software stack governed by, and oriented toward, US priorities and funding. The two projects share history: the Overture team collaborated with the Chicago group on the original GDC (Genomic Data Commons) platform, and Gen3 built on Overture's search API service, evidence that Overture's components are mature enough to seed other major platforms.

**cBioPortal** (Memorial Sloan Kettering, with multi-institutional contributors) is a cancer-specific visualization and analysis tool. It is a single integrated application focused on exploring genomic and clinical data for cancer cohorts, not a set of composable building blocks for assembling data platforms across research domains.

**Globus** (University of Chicago) is a widely used research data-transfer and sharing service. Basic transfers are free for non-profits, with paid tiers for compliance, administration, and support. Its central management infrastructure is operated by a US institution, and Globus Connect Server v5 is distributed under a proprietary license. Unlike Overture, it does not provide the metadata management, access control, or portal-layer components needed to build a complete research data platform.

**Overture** is distinct in its combination of three points. First, **modularity**: each component has a narrow responsibility and can be deployed alone or as a full stack, so the same building blocks serve a single lab or a multi-institutional consortium across genomics, pathogen surveillance, clinical, and drug-discovery data. Second, **sovereignty**: Overture is Canadian-developed and Canadian-maintained, and platforms built on it can be hosted entirely on Canadian infrastructure without dependence on US-funded software. Third, **openness**: all components are freely available and well documented under open-source licenses, with no commercial tier or vendor lock-in. Overture also complements tools like cBioPortal and Globus rather than replacing them, it provides the submission, storage, indexing, and search layers they can sit on top of.

_(— 361 words —)_

### 3.4 Software licensing `max 200 words`

_Identify the licence(s) under which the research software is released. If it is not released under an open-source licence, justify why this is not feasible and how the proposed approach aligns with the funding opportunity's objectives._

All Overture components are released under the **GNU Affero General Public License v3 (AGPL-3.0)**, an OSI-approved open-source license applied consistently across the toolkit: Song, Score, Maestro, Lyric, Lectern, Stage and Arranger. The full license text is included in each repository at https://github.com/overture-stack/. All components are freely available under open-source licenses at https://github.com/overture-stack/.

_(— 58 words —)_

---

## Section 4: Proposed Maintenance Activities

### 4.1 Objectives and main activities `max 300 words`

_Describe the main maintenance and sustainability activities you plan to undertake and how they address quality, security, and Canadian sovereignty/sustainability for the software._

Our maintenance and sustainability plan prioritizes data security, Canadian digital sovereignty, and long-term platform quality through four objectives that reduce technical debt and strengthen development and deployment lifecycles:

1. **Development lifecycle - Modernize dependencies and strengthen security posture** (security): We will remediate vulnerable dependencies across all components and services and add automated dependency scanning and static analysis (SCA/SAST) to our CI pipelines. We will also increase automated test coverage and update integration-testing practices and release pipeline, including automated platform testing using representative large datasets to monitor performance metrics at scale to uncover and address limitations through stress testing.

2. **Deployment lifecycle - Strengthen monitoring and incident response** (security): Overture services handle controlled access to genomic sequences and private health records, where undetected access is a serious risk. We will improve service auditability by implementing structured logging of requests, authentication failures, and access events to alert on suspicious activity and support faster, better-documented incident response.

3. **Migrate the submission services to retire technical debt** (Quality / FAIR4RS): Overture's file metadata and file transfer services (Song and Score) are the only Java components in an otherwise TypeScript stack. As our oldest codebases, they predate current coding standards and represent significant technical debt: maintaining them separately requires a distinct build system, dependency tree, and specialized skill set. We will rebuild their functionality as a single TypeScript service aligned with current conventions.

4. **Document the platform for long-term sustainability** (Sustainability / FAIR4RS): We provide documentation for all Overture components at docs.overture.bio, and the refactoring above will require that site to be updated. We will keep developer and user documentation current and record architecture decisions to capture design rationale, future-proofing maintainability beyond the original team. We will also refresh deployment and administration guides so infrastructure operators can better run our platforms with limited support.

_(— 294 words —)_

### 4.2 Out-of-scope confirmation `max 100 words`

_Confirm the project is not focused on net-new functionality or new scientific workflows, and briefly describe how scope has been limited to maintenance and sustainability._

The project scope is strictly bound to maintenance, security hardening, documentation, and longer term sustainability of the existing Overture software platform. All efforts and resources will be allocated to system stability, security, sovereignty, infrastructure optimization. Any requests for new feature development, third-party integrations, or workflows fall outside the scope and would require financial support from another funding source.

_(— 58 words —)_

---

## Section 5: Benefits for Canadian Research

### 5.1 Anticipated benefits and impact `max 250 words`

_Describe how the proposed work will benefit Canadian researchers and institutions (e.g., improved reliability, security, usability, sustainability)._

Overture is used by institutions across the country, including SFU, BC GSC, McGill and CHU Sainte-Justine, and in partnership between Canadian researchers and public-health laboratories and Indigenous communities.

By hardening the infrastructure Canadian researchers rely on every day, this work ensures that the platforms handling sensitive genomic and clinical data remain reliable, secure, and cost-effective for institutions from coast to coast.

The benefits extend beyond the platforms themselves:

- **Sovereignty.** Overture is Canadian-built and openly licensed, letting institutions host research data on Canadian infrastructure without depending on foreign-funded software. Genomic, clinical, and Indigenous community data remain within Canadian borders, subject to Canadian law, and free from foreign jurisdictional reach.
- **International impact.** A FAIR, open-source architecture that showcases Canadian technology at global scale and opens data-sharing partnerships across academia, government, and industry. Overture-powered platforms already drive engagement with GA4GH and PHA4GE towards setting global standards.
- **Health benefits.** Nearly one in two Canadians will be diagnosed with cancer. Overture is the software backbone for major cancer-data initiatives, including ICGC-ARGO, HCMI, and PCGL, that advance research toward better outcomes.
- **Supporting the Bioinformatics, Computational Biology, and Data Science (BCBDS) Community.** Production-grade software the bioinformatics, computational biology, and data-science community can use to securely manage large-scale genomic, clinical, and longitudinal data.
- **Training HQPs & Building Canadian Capacity.** Sustaining Overture builds Canadian capacity by training highly qualified personnel in cloud computing, software architecture, and big-data management.

_(— 229 words —)_

### 5.2 Landscape and uniqueness `max 200 words`

_Briefly describe comparable or alternative software. If there are no comparable alternatives, explain why and why maintaining this software is important._

Overture is embedded in national and provincial platforms (PCGL, OHCRN, and iMicroSeq) that depend directly on the services this project maintains. No other platform is Canadian-built, openly licensed, and domain-agnostic. It is the only option that lets Canadian institutions build and host research data platforms on Canadian infrastructure, outside the governance of US funding priorities.

The alternative to sustaining Overture is not migrating to something equivalent. It is accepting dependence on foreign-controlled software or rebuilding from scratch. Maintaining Overture keeps a sovereign Canadian option alive that does not otherwise exist.

_(— 90 words —)_

---

## Section 6: Team Experience and Governance

### 6.1 Team suitability `max 200 words`

_Explain the team's relationship to the software (e.g., original developers, long-term maintainers) and highlight experience in software quality, security, and sustainable operations._

The applicant team is the original and core Overture development team, the Genome Informatics group at OICR. which designed, built, and maintains all Overture components (Song, Score, Maestro, Lyric, Lectern, Arranger, and Stage). No external party is better placed to maintain the software. The group comprises 19 software professionals, including 6 developers, 3 bioinformaticians, 2 development operations specialists and supporting product, program, and design roles. It runs these services in production across seven currently active research platforms, giving the team deep experience in software-quality and sustainable-operations practices: semantic versioning, CI/CD, automated integration testing, and secure handling of controlled-access data. The maintenance work will be led by full-time senior developers, who work on the Overture codebases day to day and have code-quality expertise. We are requesting funds to support the full time efforts of one of the software developers. They will be supported by the wider Genome Informatics team and report to Dr. Melanie Courtot, Senior Director, Genome Informatics.

_(— 158 words —)_

### 6.2 Governance and community engagement `max 200 words`

_Describe how decisions about the software are made (e.g., governance model) and how community/user feedback informs maintenance priorities._

Overture is developed and maintained by the Genome Informatics group at OICR. A product manager sets priorities through ongoing consultation across three groups:

- the developers who build and maintain the components,
- OICR leadership, who gather and assess funding sources and opportunities, and
- the users and teams who use Overture (prospective & existing).

This keeps our decisions aligned across stakeholders and focuses our work on what is feasible, valuable, and useful to the people running the software. Community and user feedback reaches these decisions through two main channels: public GitHub issues across the Overture repositories, and direct partnerships with the collaborating teams and consortia that operate Overture platforms, including PCGL, OHCRN, and ICGC-ARGO. Because the team works directly with these deployments, real operational problems, brittle workflows, support burden, and dependency risks described above surface quickly and shape what is prioritized. The maintenance activities in this proposal were identified through this process.

_(— 150 words —)_

### 6.3 Sensitive data considerations

_(i) Does the research software handle sensitive, confidential, or restricted data (e.g., personal data, health data, Indigenous data, proprietary or controlled-access data)?_

- ☑ Yes
- ☐ No

_(ii) Describe the standards, policies, and practices in place (or to be implemented) to ensure appropriate data security, privacy, access control, and compliance with applicable institutional, legal, or ethical requirements. (max 200 words)_

Overture is developed and maintained in alignment with Canadian institutional, legal, and ethical requirements for handling sensitive research data. Security and privacy are embedded throughout the software development lifecycle: dependencies are continuously monitored through automated vulnerability scanning, and sensitive data is encrypted in transit and at rest. Role-based access control and OAuth2/OIDC authentication ensure that only authorized users and processes can access sensitive datasets, and that they are granted only the permissions strictly required to perform their function following the Principle of Least Privilege.

Several Overture-powered projects (ICGC-ARGO, OHCRN) have undergone rigorous Threat and Risk Assessments and Privacy Impact Assessments by accredited third-party companies, validating the platform's architecture against institutional and regulatory standards. Regular penetration testing conducted by our in-house IT security team further identifies and mitigates vulnerabilities before they can be exploited. Structured audit logging provides a complete, traceable record of data access and system events, supporting incident response and compliance reporting. Where Indigenous community data is involved, deployments respect OCAP principles, ensuring communities retain ownership and control over their data.

These practices collectively ensure that Overture meets the privacy, security, and sovereignty expectations of Canadian researchers, institutions, and funding bodies.

---

## Section 7: Budget

_Complete the High-Level Budget table(s) required by the call (Alliance funding requested, matching contributions, and cost categories)._

**Moved elsewhere** — the working draft carried no figures here.

**The amount filed through the portal was $300K over 24 months**, recorded against §2.2's stream selection rather than in this section. That is 60% of the $500,000 Large Sustaining cap, and it is the figure the Alliance pre-loads into the Phase 2 form. Phase 2 §13.4 requires a line-item budget consistent with it.

---

## Section 8: Metrics and Success

### 8.1 Metrics and Success `max 200 words`

_Describe 2–4 key metrics or indicators you will use to track success of the maintenance activities (e.g., reduced incidents, increased test coverage, security posture improvements, user stability metrics)._

We will track four indicators across the core overture components (Song, Score, Lectern, Lyric, Maestro, Stage & Arranger), one per maintenance objective:

1. **Development lifecycle security posture (Objective 1):** Benchmarked against OWASP Top 10:2025 via artifact scanning (e.g., Trivy) producing a pass/fail gate before registry push, and SAST severity distribution via static analysis (e.g., Semgrep) in CI with minimum 80% automated test coverage. Baselines established at project outset; critical and high findings driven toward zero.

2. **Deployment lifecycle security posture (Objective 3):** The same OWASP framework extends to running deployments via external payload-based scanning (e.g., OWASP ZAP, Falco) and structured logging of authentication and access events, establishing the foundation for MTTD/MTTR tracking as operational maturity develops.

3. **Codebase migration (Objective 3):** Published TypeScript versions of target services passing existing test suites with functional parity against their Java predecessors. Resolution of 50 documented bugs and technical debt items across both repositories, verified by closed GitHub issues. Updated documentation covering API usage, implementation details, and migration procedures for adopting institutions.

4. **Documentation currency (Objective 4):** All seven core components have development and deployment documentation last published within 6 months, plus dedicated documentation covering architecture decisions.

Together these measures will justify a reduction in technical debt, stronger security, faster incident response, and durable documentation.

_(— 212 words · flagged in the source doc as "too technical" —)_

---

## Section 9: Letter of Certification

### 9.1 Letter of certification (required)

An official letter, signed by one or more authorized institutional signatories, must be uploaded in the portal confirming the accuracy of the information and the institution's interest in participating. Applications without it will not be assessed connected with your Research Services Office early.

- Sent to Stephanie Baello and MC for review. Will be sent out for institutional signoff. _(Status at submission: received and uploaded.)_

---

## Section 10: Optional Uploads

### 10.1 Optional uploads

Up to two short optional documents (e.g., letters of support or endorsements) may be uploaded. Not required, but may add helpful context for reviewers.

_(Open at submission: Melanie was reaching out to Fiona for a letter of support; noted that Fiona is already submitting her own application, so a LOS from her may not be necessary — question raised whether it would be a drawback.)_

---

_Reproduced from the submitted RSMF LOI document. Section headings, word counts, and selections follow the submitted version._

---

## Errata in the submitted text

Carried through above as submitted. Fix these when reusing the language in the Phase 2 full proposal.

| Location  | Issue                                                                                                         |
| --------- | ------------------------------------------------------------------------------------------------------------- |
| §3.3(ii)  | "**Neither** is a domain-agnostic alternative" — three projects are described; should be "None is".            |
| §8.1 #2   | Deployment lifecycle security posture is labelled "(Objective 3)" but maps to §4.1 Objective **2**.            |
| §6.1 / §2.1 | Dr. Courtot's title is "**Senior** Director, Genome Informatics" in §6.1 vs "Director and Principal Investigator I, Genome Informatics" in §2.1. **Resolved:** the portal record gives "Senior Director, Genome Informatics", so §6.1 is right and §2.1 is the outlier. |
| §2.2      | Email is `melanie.courtot@utoronto.ca` in the working draft but **`mcourtot@oicr.on.ca`** in the portal. Use the portal address for Phase 2 correspondence. |
| §6.1      | "the Genome Informatics group at OICR**.** which designed, built…" — stray period mid-sentence.                |
| §3.4      | The GitHub URL sentence is duplicated (two consecutive sentences give the same link).                          |
| §4.2      | "system stability, security, sovereignty, infrastructure optimization" — missing "and" before the last item.   |
| §3.2(ii)  | "Marie Curie Instituite" in the source; corrected to "Institute" above.                                       |
| §5.1      | Institution list is abbreviated (SFU, BC GSC) where an earlier draft spelled these out; §5.1 also omits SickKids and Mount Sinai, which appeared in a prior draft. |

---

## Notes / Drafts (not part of the submitted LOI)

### Reviewer comments carried from the submitted doc

**§3.2(ii) — external user counts (comment [c]):**

> iMS: 22 active users + 4 non-active users, both non-OICR accounts · PCGL: 5 · ICGC-ARGO: 901 applications + 2,720 collaborators/users of data since 2022.

**§3.2(ii) — internal users (comment [d], resolving the "15+" figure):**

> Courtot Lab ~6 · Drug Discovery ~13.

**§3.2(ii) — external collaborators (comment [e], resolving the "~100+" figure):**

> OHCRN ~4 · ICGC-ARGO ~7–10 · iMS ~11 (50 inactive, not counted) · PCGL ~85 · HCMI ~5 · IHCC 0.

**§3.2(ii) — engagements (comment [f]):** 16 engagements/stakeholders are listed at the bottom of this file; the submitted text rounds to "~8 annually".

**§3.4 (comment [i]):** the unused word budget could be used to describe how open source has broadened developer support.

**§6.3(ii) (comment [s]):** the line "dependencies are continuously monitored through automated vulnerability scanning, and sensitive data is encrypted in transit and at rest" overlaps with §4.1 Objective 1 and risks reading as "everything is already in place — why do you need the money?" Worth reconciling in Phase 2.

**§8.1 (comment [u]):** the explicit component list is there to scope which Overture services the work commits to.

**§8.1 (comment [v]/[w]):** Justin and Henro contributed the security-scanning detail — the people to ask for a walkthrough.

**§3.2(ii) / totals (comment [ac]):** exact numbers are not required; ideally the figure would also encompass past projects. Open ask to `rhaw@oicr.on.ca` for a total $M across all projects — PCGL + OHCRN + ARGO should already be ~$23M.

**§5.2 (comment [aj]):** the "three national/provincial platforms depend on this" point is repeated several times across sections — consider consolidating.

### Alternate §3.1 opening (Robin + legacy/history)

> Overture is an open-source, microservice-based data platform designed to store, organize, distribute and explore large-scale genomics datasets. Originally developed to support major projects like the original ICGC, the GDC data commons and the Gabriella Miller Kids First platform, Overture has evolved to address the modern technical bottleneck of petabyte-scale data management. By transitioning from monolithic infrastructures to a highly flexible/modular collection of independently deployable microservices, Overture promotes FAIR data-sharing practices. A primary goal of Overture is to lower the technical barriers to genomic data management, allowing small research labs and large international consortia to quickly develop their own reliable and customizable data-sharing platforms. By making data accessible to both human researchers and automated API/AI/ML applications, Overture supports reproducibility and integration with third-party tools to drive scientific discovery.

### Longer §3.2 user-base draft (cut for length)

> Externally, ICGC-ARGO has [ICGC_REGISTERED_USERS]+ registered users, with [ICGC_APPROVED_USERS] approved for secure controlled-access data, generating ~[ICGC_MONTHLY_DOWNLOADS] download requests per month. iMicroSeq serves approximately [IMICROSEQ_USERS]+ users; IHCC serves [IHCC_USERS]+; HCMI serves [HCMI_USERS]+; and the OICR Drug Discovery Portal serves [DDP_USERS]+. OHCRN and PCGL are newer deployments currently in their initial release phases, with user bases actively growing. Across all seven platforms, Overture supports an estimated [TOTAL_EXTERNAL_USERS]+ active researchers globally.

> The primary internal user base at OICR comprises 19 software professionals, including 6 developers, 3 bioinformaticians, 2 business analysts, and supporting roles across product, program management, and design. The Courtot Lab, an active research group embedded within the same team, includes 1 ML engineer/scientific associate, 3 graduate students, and 4 summer students, all of whom use Overture-based platforms. Additionally the drug discovery group at OICR with [N] research scientists uses Overture within their working environment.

> Overture is the foundation for platforms that OICR develops and builds together with major external partners and consortia: ICGC-ARGO (X individuals), PCGL (Y individuals), iMicroSeq (Z X individuals), OHCRN (m individuals), IHCC (p individuals), and HCMI (k individuals).

> Overture serves at least [EXTERNAL_TOTAL]+ external researchers across all seven platforms, with an additional **15+ users internally at OICR**. Our team of 19 Overture maintainers formally collaborates with approximately 100+ external collaborators directly working on and contributing to Overture-based projects.

> Since 2024, overture.bio and docs.overture.bio have attracted nearly 9,000 unique visitors from 46+ countries, with annual unique visitors growing over 40% from 2024 (2,546) to 2025 (3,791). As of mid-June 2026, unique visitors are up 66% year-over-year (1,425 vs. 2,368); this reach extends well beyond our directly tracked partnerships and reflects growing adoption across the international research community.

> Drug Discovery detail (verbatim): "46 people in drug discovery 13 within Sams group, this number is overstated but once we complete testing this number should be more qualified, aim is for this to also be a public resource once ready - plus 6 in courtot lab"

> External collaborators estimate (verbatim):
> \> OHCRN +4 on program side
> \> ARGO ~7-10
> \> iMS ~11 (active) 50 (inactive)
> \> PCGL ~85
> \> HCMI 5 (3 without)
> \> IHCC (in maintenance, none really)

### Original impact statement (cut for length) — per-platform detail

> Overture is deployed in production across seven active research platforms:
>
> - **ICGC-ARGO:** Oncology precision medicine platform standardizing molecular and longitudinal health data across 100,000+ participants in 27 genomics programs spanning 15 countries.
> - **iMicroSeq:** A Canadian database of microbial sequences and harmonized contextual metadata, covering ~650,000 clinical samples and ~170,000 environmental wastewater records.
> - **Ontario Hereditary Cancer Research Network (OHCRN):** A province-wide program collecting and connecting information on populations at high risk of hereditary cancers.
> - **Pan-Canadian Genome Library (PCGL):** A national genomic infrastructure initiative hosted at McGill University and funded by the Government of Canada. PCGL operates as a secure, centralized, federated data repository that standardizes, safeguards, and enables responsible sharing of human genomic and health data.
> - **International Health Cohorts Consortium (IHCC):** A centralized resource for discovering available data across large population-level cohorts (100,000+).
> - **Human Cancer Models Initiative (HCMI):** A searchable catalog that lets users browse and identify next-generation cancer models for research.
> - **OICR Drug Discovery Portal:** A cancer genomics data exploration platform integrating ~405 million records across gene correlations, mutations, expression profiles, and protein interactions, enabling researchers to iteratively filter and refine candidate gene lists for drug target discovery.

> These deployments span Canadian and international institutions, demonstrating platform stability across diverse research domains and operational scales. External organizations building on Overture components include CHU Sainte-Justine (Lectern + Arranger), the South African National Bioinformatics Institute (SANBI), and InDoc Research (Arranger).

> Overture's components follow independent semantic versioning, and the mature ones have long production histories spanning eight or more years of stable releases. Each component is actively maintained with dozens of contributors and is deployed across both Canadian platforms (PCGL, iMicroSeq, OHCRN) and international ones (ICGC-ARGO, IHCC, HCMI), serving an external user base of Canadian and international cancer genomics researchers, clinicians, and bioinformatics teams at institutions.

### Component detail (reference — too long for §3.2(i))

- **Song** ([github.com/overture-stack/SONG](http://github.com/overture-stack/SONG)) File metadata management; 27 releases since 2018, 3 published packages and 28 contributors. v4.5.1 released April 2021. Originally developed for the original ICGC, GDC, and Kids First projects; currently deployed within ICGC-ARGO and PCGL.
- **Score** (github.com/overture-stack/score/): Large-file transfer to and from object storage. 12 releases since 2018, 3 published packages, 28 contributors. v5.11.0 released October 2024. Deployed alongside Song within ICGC-ARGO and PCGL.
- **Lectern** (https://github.com/overture-stack/lectern): Dictionary management service with 19 contributors, one published package, and a dictionary viewer UI component library. Deployed within PCGL, ICGC-ARGO, and iMicroSeq.
- **Maestro** (https://github.com/overture-stack/maestro/releases): Indexes submitted data into Elasticsearch for unified search. 10 releases since 2020, 14 contributors. v4.0.0 released April 2022, originally developed for the ICGC; currently deployed in production within ICGC-ARGO and iMicroSeq, supporting search and discovery for Canadian and international cancer genomics researchers.
- **Arranger** (https://github.com/overture-stack/arranger/releases): Generates search APIs and reusable UI components. Four published packages, 34 contributors. v3.0.0 released August 2025. Overture's most widely deployed service, originally surfacing within the ICGC project and later adopted by the GDC data platform and Kids First portal. Current deployments include IHCC, HCMI, OHCRN, ICGC-ARGO, and iMicroSeq.
- **Stage** (https://github.com/overture-stack/stage): Front-end portal UI scaffold with 11 contributors. Serves as the portal UI framework used and heavily adapted across all platforms that rely on Arranger's front-end search and exploration components.

### Website analytics (overture.bio + docs.overture.bio)

> Annual visits
> 2024 - 3685
> 2025 - 5180 (Y/Y growth of ~41%)
> 2026 - 2811 to date (on pace for 47% y/y growth) on track to exceed 2026
>
> Unique 8703 since 2024
> 2024 - 2546
> 2025 - 3791
> 2026 - 2366

### Engagements / stakeholder consultations

> - pending (PTN GLOBAL)
> - pending (Kilimanjaro Clinical Research Institute (KCRI))
> - Seqera
> - SANBI
> - Marie Curie
> - Pancurx
> - Colonalhemotopesis
> - PPCG
> - Align2Innovate
> - CropXR
> - Spain supercomputer team
> - Harvard
> - HBP
> - LBR
> - Australia Biocommons
> - Australia Cadiovascular disease data commons
> - popCase Case Western Reserve University School of Medicine

### Metrics — working notes behind §8.1

**Earlier, less technical phrasing:**

> - _Development lifecycle security posture (Objective 2):_ We will use [SECURITY_REPORTING_PLATFORM] to produce security-posture reports to benchmark success against the OWASP Top 10:2025. We will implement automated test coverage of at least 80% and have SCA/SAST integrated into our CI pipeline; this will drive end-of-life and vulnerable dependencies toward zero (i.e. no open critical or high findings, prioritized by "known exploits").
> - _Deployment lifecycle security posture (Objective 3):_ We will use [LOGGING_MONITORING_STACK] to produce operational reports as development proceeds, establishing structured logging coverage of authentication and access events, with a process in place to track mean time to detect and respond, established and tracked across deployments.

**Tooling detail (from Justin & Henro), verbatim:**

> 1. Known vulnerabilities on build
>
> - scan/check known vulnerabilities (libraries, binaries) that are listed from outside sources
> - something we already do for running software for OHCRN/PCGL etc.
> - this should be done during the build phase
> - we use trivy scanner for scanning the deployed artifacts, this same tool can be used as inline scanning during the build phase, the docker image is built and scanned before being pushed. Will report what vulnerabilities exist as a binary success fail
> - semgrep?
>
> 2. OWASP vulnerability scanner on endpoints
>
> You can scan an endpoint with a predefined payload to detect some of the known vulnerabilities, not within the artifact it is detected from the outside
>
> - trivy , defender, falco (monitors sys calls)
>
> Number of vulnerabilities present in the shipped software (baseline -> 0 critical/high findings)

### Alternate §5.1 impact framing (cut)

> Overture is a core Canadian research infrastructure. Three national and provincial platforms depend directly on the services this project maintains: the Pan-Canadian Genome Library (PCGL), Canada's national genome data infrastructure; the Ontario Hereditary Cancer Research Network (OHCRN); and iMicroSeq, a pathogen genomic surveillance platform.

> This proposal makes Overture-powered platforms more reliable, secure, and sustainable. Consolidating the submission services onto one consistent TypeScript stack lowers running and maintenance costs, establishing a modern, well-tested foundation and enables us in the future to more readily integrate with other more modern third-party tools Canadian researchers already rely on (e.g. Globus). Modernizing dependencies, adding security scanning, and raising test coverage reduce the vulnerability risk on platforms, in particular critical when handling sensitive data; structured logging and alerting let operators detect and respond to incidents faster. A consolidated stack and current documentation reduce long-term cost and dependence on any single team.

> More broadly, Overture gives Canadian institutions a Canadian-developed, openly licensed option for building research data platforms, independent of foreign-funded infrastructure, and maintaining it keeps that option reliable and secure.
>
> - **Sovereignty:** A Canadian-developed, openly licensed option for building research data platforms, hosted on Canadian infrastructure without dependence on foreign-funded software.
> - **Increasing the International Visility of Canadian Research Innovation**. Overture demonstrates the global scale and viability of Canadian-built technology. It is a robust, FAIR, open source architecture that facilitates new data sharing partnerships across academia, government, and private sector organizations worldwide.
> - **Health Benefits from Overture software platform.** Cancer is a leading cause of death in Canada (second leading cause of death globally), and nearly 1 in 2 Canadians will be diagnosed with cancer in their lifetime. Overture provides a critical software backbone to deploy large global data initiatives that are essential for advancing cancer research.
> - **Supporting the Bioinformatics, Computational Biology, and Data Science (BCBDS) Community.** The ongoing maintenance of Overture data platform directly benefits the BCBDS community by providing robust, real world software solutions for secure data management. Overture supports diverse, large scale research projects that track genomic clinical and longitudinal data.
> - **Training HQPs and Building Canadian Capacity.** The ongoing maintenance of Overture will train a substantial pool of HQPs with expertise in cloud computing, software architecture, and big data management.
>
> — 311 words—
