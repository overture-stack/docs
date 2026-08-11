// The Prelude quickstart, as the foot of the home page shows it.
//
// **Every command here is mirrored from `website/docs/deploy-docs/01-prelude.md`
// § Getting Started, which is the source of record.** If that file's commands
// change, change these; nothing enforces it yet. Keeping the steps as data
// rather than as markup in the section is what makes that check a diff of one
// short file instead of a read of a component.
//
// .dev/ia-proposal.md finding 5 cut the home page's Prelude walkthrough on the
// reasoning that a second copy of the setup goes stale the moment the first one
// moves, and this brings it back on the developer's own call. The rule that
// keeps it honest: commands only, no explanation the documentation already
// owns, and one link out per step that needs more than a line. Anything longer
// than a sentence belongs in the docs, not here.

import { DOCKER_DOWNLOAD } from "../constants/externalLinks";

export type QuickstartStep = {
  id: string;
  title: string;
  /** One line of context, where the commands alone are not enough. */
  note?: string;
  /** Shell commands, in order, exactly as the documentation gives them. */
  commands?: string[];
  /** A single link out, for the step whose detail lives elsewhere. */
  link?: { label: string; href: string };
};

export const quickstartSteps: QuickstartStep[] = [
  {
    id: "prerequisites",
    title: "Check the prerequisites",
    note: "Docker Desktop 4.39.0+ with an 8-core CPU, 8 GB of memory, 2 GB of swap and 64 GB of virtual disk, plus Node.js 18+ and npm 9+.",
    link: { label: "Get Docker Desktop", href: DOCKER_DOWNLOAD },
  },
  {
    id: "clone",
    title: "Clone the repository",
    commands: [
      "git clone https://github.com/overture-stack/prelude.git",
      "cd prelude",
    ],
  },
  {
    id: "check",
    title: "Run the pre-deployment check",
    note: "Confirms your machine has what the stack needs before anything starts.",
    commands: ["make phase0"],
  },
  {
    id: "deploy",
    title: "Build the portal image, then deploy",
    // `cd ../..` is not in the documentation's own snippet: it says to build
    // from `apps/stage` and then run `make phase1` "from the root directory",
    // which is two commands with a directory change between them that a reader
    // copying the block would otherwise miss.
    note: "Phase 1 brings up Elasticsearch, Arranger and Stage. The later phases add tabular submission, then file management.",
    commands: [
      "cd apps/stage",
      "docker build --platform linux/arm64 -t stageimage:1.0 .",
      "cd ../..",
      "make phase1",
    ],
  },
];

/** Where the portal answers once phase 1 is up. */
export const quickstartPortalUrl = "http://localhost:3000";
