/*
 * Dictionary Playground — embedded, client-side Lectern dictionary editor.
 *
 * Ported from the Prelude IBCworkshop stage app for the Overture docs site.
 * Changes from the source:
 *   - emotion `css` prop  -> Docusaurus CSS Modules (styles.module.css)
 *   - Stage theme adapter -> Lectern's own `defaultTheme`
 *   - "Publish to Lectern" (server call) -> client-side Download / Copy JSON
 *   - full-viewport fixed layout -> in-flow embedded block with a fixed height
 *
 * This module is browser-only (CodeMirror + Lectern UI touch `window`) and is
 * loaded through `<BrowserOnly>` from index.tsx, so it never runs during SSR.
 */

import { json } from "@codemirror/lang-json";
import { RangeSetBuilder } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
import {
  Decoration,
  EditorView,
  ViewPlugin,
  ViewUpdate,
} from "@codemirror/view";
// @ts-ignore - Dictionary is both the Zod schema and the type; ts-ignore needed for the Zod runtime value
import { Dictionary } from "@overture-stack/lectern-dictionary";
import {
  DictionaryStaticDataProvider,
  DictionaryTableStateProvider,
  DictionaryTableViewer,
  defaultTheme,
  ThemeProvider,
  useDictionaryTableState,
} from "@overture-stack/lectern-ui";
import { indentationMarkers } from "@replit/codemirror-indentation-markers";
import ReactCodeMirror from "@uiw/react-codemirror";
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { DEMO_TEMPLATE, STARTER_TEMPLATE } from "./templates";
import styles from "./styles.module.css";

// Rainbow bracket colours — 6 levels, cycling
const BRACKET_COLORS = [
  "#e5c07b",
  "#61afef",
  "#c678dd",
  "#56b6c2",
  "#98c379",
  "#e06c75",
];
const OPEN_BRACKETS = new Set(["{", "[", "("]);
const CLOSE_BRACKETS = new Set(["}", "]", ")"]);

// Mark decorations for each depth level
const bracketDecorations = BRACKET_COLORS.map((_, i) =>
  Decoration.mark({ class: `cm-rainbow-bracket-${i}` }),
);

// CSS theme: one rule per depth level + indentation-marker overrides
const rainbowBracketTheme = EditorView.baseTheme({
  ...Object.fromEntries(
    BRACKET_COLORS.map((color, i) => [
      `& .cm-rainbow-bracket-${i}`,
      { color, fontWeight: "bold" },
    ]),
  ),
  "& .cm-indent-markers": {
    "--indent-marker-bg-color": "rgba(150,160,180,0.20)",
    "--indent-marker-active-bg-color": "rgba(150,160,180,0.45)",
  },
});

function buildRainbowDecorations(view: EditorView) {
  const builder = new RangeSetBuilder<Decoration>();
  const doc = view.state.doc;
  const text = doc.toString();
  let depth = 0;

  const stack: number[] = [];
  const marks: { from: number; to: number; depth: number }[] = [];

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (OPEN_BRACKETS.has(ch)) {
      marks.push({ from: i, to: i + 1, depth: depth % BRACKET_COLORS.length });
      stack.push(depth);
      depth++;
    } else if (CLOSE_BRACKETS.has(ch)) {
      depth = Math.max(0, depth - 1);
      const matchedDepth = stack.length > 0 ? stack.pop()! : depth;
      marks.push({
        from: i,
        to: i + 1,
        depth: matchedDepth % BRACKET_COLORS.length,
      });
    }
  }

  for (const { from, to, depth: d } of marks) {
    builder.add(from, to, bracketDecorations[d]);
  }

  return builder.finish();
}

const rainbowBracketsPlugin = ViewPlugin.fromClass(
  class {
    decorations: ReturnType<typeof buildRainbowDecorations>;
    constructor(view: EditorView) {
      this.decorations = buildRainbowDecorations(view);
    }
    update(update: ViewUpdate) {
      if (update.docChanged) {
        this.decorations = buildRainbowDecorations(update.view);
      }
    }
  },
  { decorations: (v) => v.decorations },
);

const editorExtensions = [
  json(),
  rainbowBracketsPlugin,
  rainbowBracketTheme,
  indentationMarkers(),
];

type ParseResult =
  /** JSON is valid and matches the Lectern schema exactly */
  | { status: "valid"; dictionary: unknown }
  /** JSON is parseable but has schema warnings — preview still renders */
  | { status: "warning"; dictionary: unknown; warnings: string[] }
  /** JSON syntax error — cannot render anything */
  | { status: "error"; errors: string[] };

function parseDictionary(text: string): ParseResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch (e) {
    return {
      status: "error",
      errors: [
        `JSON syntax error: ${e instanceof Error ? e.message : String(e)}`,
      ],
    };
  }

  const result = Dictionary.safeParse(parsed);
  if (result.success) {
    return { status: "valid", dictionary: result.data };
  }

  const warnings = result.error.errors.map(
    (issue: { path: (string | number)[]; message: string }) => {
      const path = issue.path.length > 0 ? issue.path.join(".") + ": " : "";
      return `${path}${issue.message}`;
    },
  );
  return { status: "warning", dictionary: parsed, warnings };
}

// The DictionaryStateProvider initialises with ['Required'] as the active
// filter, which hides all non-required fields. This resets it on mount.
const FilterResetter = (): null => {
  const { setFilters } = useDictionaryTableState();
  useEffect(() => {
    setFilters([]);
  }, []);
  return null;
};

const DictionaryPlayground = (): ReactElement => {
  const [editorValue, setEditorValue] = useState(STARTER_TEMPLATE);
  const [parseResult, setParseResult] = useState<ParseResult>(() =>
    parseDictionary(STARTER_TEMPLATE),
  );
  const [previewKey, setPreviewKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Remount the preview each time we get a renderable dictionary so it bounces.
  useEffect(() => {
    if (parseResult.status !== "error") {
      setPreviewKey((k) => k + 1);
    }
  }, [parseResult]);

  const handleFormat = useCallback(() => {
    try {
      const formatted = JSON.stringify(JSON.parse(editorValue), null, 2);
      setEditorValue(formatted);
      setParseResult(parseDictionary(formatted));
    } catch {
      // not valid JSON — nothing to format
    }
  }, [editorValue]);

  const handleReset = useCallback(() => {
    setEditorValue(STARTER_TEMPLATE);
    setParseResult(parseDictionary(STARTER_TEMPLATE));
  }, []);

  const handleLoadDemo = useCallback(() => {
    setEditorValue(DEMO_TEMPLATE);
    setParseResult(parseDictionary(DEMO_TEMPLATE));
  }, []);

  const handleEditorChange = useCallback((value: string) => {
    setEditorValue(value);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setParseResult(parseDictionary(value));
    }, 600);
  }, []);

  const handleDownload = useCallback(() => {
    const blob = new Blob([editorValue], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dictionary.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [editorValue]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(editorValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — no-op
    }
  }, [editorValue]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderableDictionary: any =
    parseResult.status !== "error" ? parseResult.dictionary : null;

  return (
    <div className={styles.playground}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>Dictionary Playground</h3>
          <p className={styles.subtitle}>
            Edit a Lectern dictionary above; see it rendered live below. For the
            full field and restriction reference, see{" "}
            <a
              href="/develop/Lectern/dictionaryReference"
              target="_blank"
              rel="noopener noreferrer"
            >
              building data dictionaries
            </a>
            .
          </p>
        </div>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.ghostButton}
            onClick={handleCopy}
            disabled={parseResult.status === "error"}
          >
            {copied ? "Copied!" : "Copy JSON"}
          </button>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={handleDownload}
            disabled={parseResult.status === "error"}
          >
            Download JSON
          </button>
        </div>
      </div>

      {/* Editor above, live preview stacked below (full content width) */}
      <div className={styles.stack}>
        {/* Editor panel */}
        <div className={styles.editorPanel}>
          {/* Editor toolbar */}
          <div className={styles.editorToolbar}>
            <span className={styles.paneLabel}>Schema Editor</span>
            <div className={styles.toolbarButtons}>
              {[
                { label: "Format", onClick: handleFormat },
                { label: "Reset", onClick: handleReset },
                { label: "Load Demo", onClick: handleLoadDemo },
              ].map(({ label, onClick }) => (
                <button
                  type="button"
                  key={label}
                  className={styles.ghostButton}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Validation status */}
          <div
            className={[
              styles.status,
              parseResult.status === "valid"
                ? styles.statusValid
                : parseResult.status === "warning"
                  ? styles.statusWarning
                  : styles.statusError,
            ].join(" ")}
          >
            {parseResult.status === "valid" ? (
              <div className={styles.statusValidText}>
                Valid Lectern dictionary
              </div>
            ) : parseResult.status === "warning" ? (
              <div className={styles.statusMsgList}>
                {parseResult.warnings.map((w, i) => (
                  <div
                    key={i}
                    className={[styles.statusMsg, styles.statusMsgWarn].join(
                      " ",
                    )}
                  >
                    {w}
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.statusMsgList}>
                {parseResult.errors.map((err, i) => (
                  <div
                    key={i}
                    className={[styles.statusMsg, styles.statusMsgErr].join(
                      " ",
                    )}
                  >
                    {err}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CodeMirror editor */}
          <div className={styles.editorWrap}>
            <ReactCodeMirror
              value={editorValue}
              onChange={handleEditorChange}
              extensions={editorExtensions}
              theme={oneDark}
              height="100%"
              style={{ flex: 1, minHeight: 0, overflow: "hidden" }}
              basicSetup={{ lineNumbers: true, foldGutter: true, tabSize: 2 }}
            />
          </div>
        </div>

        {/* Preview panel */}
        <div className={styles.previewPanel}>
          <div className={styles.previewHeader}>Live Preview</div>

          {renderableDictionary ? (
            <div key={previewKey} className={styles.previewContent}>
              <div className={styles.previewBody}>
                <div className={styles.previewScale}>
                  <ThemeProvider theme={defaultTheme}>
                    <DictionaryStaticDataProvider
                      staticDictionaries={[renderableDictionary]}
                    >
                      <DictionaryTableStateProvider>
                        <FilterResetter />
                        <DictionaryTableViewer />
                      </DictionaryTableStateProvider>
                    </DictionaryStaticDataProvider>
                  </ThemeProvider>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.previewEmpty}>
              Fix the schema errors on the left to see a preview.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DictionaryPlayground;
