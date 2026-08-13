import React, { useEffect, useRef, useState } from "react";

/**
 * A block of shell commands, styled as a terminal window.
 *
 * Dropped along with the home page's Prelude walkthrough, then brought back
 * with it — see data/quickstart.ts for why that walkthrough returned. Two
 * notable choices:
 *
 *   - The commands are one `<pre><code>` rather than a `<div>` per line, so a
 *     visitor selecting them by hand gets the newlines, and a screen reader
 *     reads a code block rather than a stack of unrelated sentences.
 *   - A copy button, which is the actual reason anyone reads a block like this.
 *     It copies every line at once, joined with newlines, so pasting into a
 *     shell runs the step as written.
 *
 * No `UrlBar` or `TrafficLights`: nothing on this site uses either, and the
 * traffic lights are three decorative dots that belong to this component
 * alone.
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
      // Clipboard access can be refused (insecure origin, permissions
      // policy). Fails silently: the commands are still selectable text
      // either way.
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
        {/* In the title bar, not over the commands: the code block scrolls
            sideways, and a floating button there would have text passing
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
            {/* A line per command, a `nowrap` span per token: CSS treats a
                hyphen as a break point, so `--platform` would otherwise split
                into `--` and `platform` on a narrow column, reading as two
                arguments. The hanging indent in _terminal.scss then tells a
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
