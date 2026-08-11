// The demo quickstart, as the foot of the home page shows it.
//
// **Every command and every figure here is mirrored from
// `website/docs/use-docs/workshop/01-Running-the-Demo.md` and the Prerequisites
// section of `00-Intro.md`, which are the source of record.** If either changes,
// change these; nothing enforces it yet. Keeping the steps as data rather than
// as markup in the section is what makes that check a diff of one short file
// instead of a read of a component.
//
// It used to mirror `deploy-docs/01-prelude.md` and its four `make phase*`
// steps instead. The demo is the shorter offer and the one the "3 steps, 2
// commands, 1 platform" claim is true of, so the claim is derived below rather
// than typed out.
//
// The rule that keeps this honest: commands only, no explanation the
// documentation already owns, and one link out per step that needs more than a
// line. Anything longer than a sentence belongs in the docs, not here.

import { DOCKER_DOWNLOAD } from "../constants/externalLinks";

export type QuickstartStep = {
  id: string;
  title: string;
  /**
   * A link that is part of the title rather than a line under it, for the step
   * whose subject is a download.
   */
  titleLink?: { label: string; href: string };
  /** One line of context, where the commands alone are not enough. */
  note?: string;
  /** Rendered as a label and an inline-code value, so figures stay scannable. */
  settings?: { label: string; value: string }[];
  /** A closing line, for a prerequisite the settings list does not cover. */
  footnote?: string;
  /** Shell commands, in order, exactly as the documentation gives them. */
  commands?: string[];
};

export const quickstartSteps: QuickstartStep[] = [
  {
    id: "docker",
    title: "Download and configure",
    titleLink: {
      label: "Docker Desktop (28.0.0+)",
      href: DOCKER_DOWNLOAD,
    },
    note: "Open Settings, then Resources, and set at minimum:",
    settings: [
      { label: "CPUs", value: "4+" },
      { label: "Memory", value: "8GB" },
      { label: "Disk", value: "10GB" },
    ],
    footnote:
      "Git is required. On Windows, set up WSL2 first and run everything below from a Bash terminal.",
  },
  {
    id: "clone",
    title: "Clone the demo repository",
    // Two lines in the documentation, joined with `&&` here so the step is one
    // command a visitor can copy in one action, which is also what makes the
    // "2 commands" claim below true.
    commands: [
      "git clone -b docs-demo/search-portal-workshop https://github.com/overture-stack/prelude.git && cd prelude",
    ],
  },
  {
    id: "run",
    title: "Run the demo",
    // The documentation also gives `.\run.ps1 demo` for native PowerShell. Not
    // published here: step 1 already sends Windows readers to a Bash terminal
    // inside WSL2, which is the route the documentation recommends, and a second
    // terminal block for the shell it steers them away from was the only thing
    // on the page that needed a label to explain which one to use.
    commands: ["make demo"],
  },
];

/** Where the portal answers once the demo is up. */
export const quickstartPortalUrl = "localhost:3000";

/**
 * The three figures in the section's subtitle, derived rather than typed so a
 * fourth step or a second command cannot leave the claim behind.
 */
export const quickstartClaim = {
  steps: quickstartSteps.length,
  commands: quickstartSteps.flatMap((step) => step.commands ?? []).length,
  platforms: 1,
};
