import React, { useEffect, useRef, useState } from "react";

/**
 * A block of shell commands, styled as a terminal window.
 *
 * Ported from the Gatsby site's `Terminal`, which the phase 1 port left behind
 * with the home page's Prelude walkthrough (see data/quickstart.ts for why that
 * walkthrough is back). Two changes from the original:
 *
 *   - The commands are one `<pre><code>` rather than a `<div>` per line, so a
 *     visitor selecting them by hand gets the newlines, and a screen reader
 *     reads a code block rather than a stack of unrelated sentences.
 *   - A copy button, which is the actual reason anyone reads a block like this.
 *     It copies every line at once, joined with newlines, so pasting into a
 *     shell runs the step as written.
 *
 * The original's `UrlBar` and exported `TrafficLights` are not ported: nothing
 * on this site uses either, and the traffic lights are three decorative dots
 * that belong to this component alone.
 */
export default function Terminal({
  commands,
  /** Names the step, for the copy button's accessible label. */
  label,
}: {
  commands: string[];
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(commands.join("\n"));
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be refused outright (an insecure origin, or a
      // permissions policy). Nothing to recover: the commands are selectable
      // text whether or not the button works, so this fails silently rather
      // than showing an error for something the visitor did not ask for.
    }
  };

  return (
    <div className="Terminal">
      <div className="Terminal__bar">
        <span className="Terminal__lights" aria-hidden="true">
          <span className="Terminal__light" />
          <span className="Terminal__light" />
          <span className="Terminal__light" />
        </span>
        {/* In the title bar rather than over the commands: the code block
            scrolls sideways (see _terminal.scss for why it does not wrap), and
            a button floating over a scrolling line ends up with text passing
            underneath it. */}
        <button
          type="button"
          className="Terminal__copy"
          onClick={handleCopy}
          aria-label={
            label ? `Copy the commands for ${label}` : "Copy the commands"
          }
        >
          {/* The live region is the span, not the button: announcing the label
              change is the point, and putting `aria-live` on the button itself
              would re-announce its own accessible name too. */}
          <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <div className="Terminal__inner">
        <pre className="Terminal__code">
          <code>
            {/* A line per command, and a `nowrap` span per whitespace-separated
                token inside it. Both are load-bearing rather than tidiness:
                CSS treats a hyphen as a line-break opportunity, so left to
                itself the browser breaks `--platform` into `--` and `platform`
                on a narrow column, which reads as two arguments. Keeping each
                token unbreakable means a long command can only ever wrap at a
                space, and the hanging indent in _terminal.scss is what tells a
                wrapped line apart from the next command. */}
            {commands.map((command) => (
              <span className="Terminal__line" key={command}>
                {command.split(" ").map((token, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && " "}
                    <span className="Terminal__token">{token}</span>
                  </React.Fragment>
                ))}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
