/*
 * Song Schema Playground — embedded, client-side Song schema editor.
 *
 * Integrated "both" experience for the Building Song Schemas guide:
 *   - Generate a starter schema from CSV (Generate from CSV panel), and
 *   - edit it in a live editor that validates the Song schema envelope + inner
 *     JSON Schema as you type, with a rendered preview of the property tree.
 *
 * Same shell/patterns as the Dictionary Playground: emotion -> CSS Modules,
 * CodeMirror with rainbow brackets + oneDark, three-tier validation. Browser-
 * only (CodeMirror), so it loads through <BrowserOnly> from index.tsx.
 */

import { json, jsonParseLinter } from '@codemirror/lang-json';
import { RangeSetBuilder } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { Decoration, EditorView, ViewPlugin, ViewUpdate } from '@codemirror/view';
import { indentationMarkers } from '@replit/codemirror-indentation-markers';
import ReactCodeMirror from '@uiw/react-codemirror';
import React, { Fragment, ReactElement, useCallback, useEffect, useRef, useState } from 'react';

import { generateSongSchema } from './lib/generateSongSchema';
import { locateJsonPath } from './lib/locateJsonPath';
import { Issue, PreviewGroup, SongValidationResult, validateSongSchema } from './lib/validateSongSchema';
import { DEMO_TEMPLATE, STARTER_TEMPLATE } from './templates';
import styles from './styles.module.css';

const SPLIT_MIN = 20;
const SPLIT_MAX = 80;
const SPLIT_DEFAULT = 46;

const BRACKET_COLORS = ['#e5c07b', '#61afef', '#c678dd', '#56b6c2', '#98c379', '#e06c75'];
const OPEN_BRACKETS = new Set(['{', '[', '(']);
const CLOSE_BRACKETS = new Set(['}', ']', ')']);

const bracketDecorations = BRACKET_COLORS.map((_, i) => Decoration.mark({ class: `cm-rainbow-bracket-${i}` }));

const rainbowBracketTheme = EditorView.baseTheme({
	...Object.fromEntries(
		BRACKET_COLORS.map((color, i) => [`& .cm-rainbow-bracket-${i}`, { color, fontWeight: 'bold' }]),
	),
	'& .cm-indent-markers': {
		'--indent-marker-bg-color': 'rgba(150,160,180,0.20)',
		'--indent-marker-active-bg-color': 'rgba(150,160,180,0.45)',
	},
});

function buildRainbowDecorations(view: EditorView) {
	const builder = new RangeSetBuilder<Decoration>();
	const text = view.state.doc.toString();
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
			marks.push({ from: i, to: i + 1, depth: matchedDepth % BRACKET_COLORS.length });
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

/*
 * Findings highlighted in the document.
 *
 * The validator reports a JSON path with each finding, which locateJsonPath maps
 * back to an offset, so a finding underlines the key it is about and tints that
 * line. A document that does not parse has no structural findings, so the syntax
 * error stands alone: lang-json's own linter provides its position, which avoids
 * reading offsets out of browser-specific SyntaxError messages.
 *
 * Validation runs here on the document rather than being pushed in from React,
 * so highlights can never lag the text: the function is pure and cheap, and the
 * rainbow-bracket plugin above already rescans on every change.
 */
const syntaxErrorPosition = jsonParseLinter();

const errorLine = Decoration.line({ class: 'cm-song-error-line' });
const warningLine = Decoration.line({ class: 'cm-song-warning-line' });

const diagnosticTheme = EditorView.baseTheme({
	'& .cm-song-error-line': { backgroundColor: 'rgba(198, 40, 40, 0.22)' },
	'& .cm-song-warning-line': { backgroundColor: 'rgba(180, 83, 9, 0.20)' },
	'& .cm-song-error-token': {
		textDecoration: 'underline wavy #ff6b6b',
		textUnderlineOffset: '3px',
	},
	'& .cm-song-warning-token': {
		textDecoration: 'underline wavy #f0a94a',
		textUnderlineOffset: '3px',
	},
});

interface Highlight {
	from: number;
	to: number;
	decoration: Decoration;
}

function buildDiagnosticDecorations(view: EditorView) {
	const doc = view.state.doc;
	const text = doc.toString();
	const result = validateSongSchema(text);
	const highlights: Highlight[] = [];
	const tintedLines = new Set<number>();

	const tintLine = (pos: number, severity: 'error' | 'warning'): void => {
		const line = doc.lineAt(pos);
		if (tintedLines.has(line.from)) return;
		tintedLines.add(line.from);
		highlights.push({ from: line.from, to: line.from, decoration: severity === 'error' ? errorLine : warningLine });
	};

	if (result.preview === null) {
		// Unparseable: the only thing to point at is where JSON.parse gave up.
		for (const diagnostic of syntaxErrorPosition(view)) {
			tintLine(Math.min(diagnostic.from, Math.max(0, doc.length - 1)), 'error');
		}
	} else {
		const mark = (issue: Issue, severity: 'error' | 'warning'): void => {
			const range = locateJsonPath(text, issue.path);
			if (range === null || range.from >= range.to) return;
			tintLine(range.from, severity);
			highlights.push({
				from: range.from,
				to: range.to,
				decoration: Decoration.mark({
					class: severity === 'error' ? 'cm-song-error-token' : 'cm-song-warning-token',
					attributes: { title: issue.message },
				}),
			});
		};
		for (const issue of result.errors) mark(issue, 'error');
		for (const issue of result.warnings) mark(issue, 'warning');
	}

	// A RangeSetBuilder only accepts ranges in document order, and a line
	// decoration has to land before any mark starting on that same line.
	highlights.sort((a, b) => a.from - b.from || a.to - b.to);
	const builder = new RangeSetBuilder<Decoration>();
	for (const { from, to, decoration } of highlights) builder.add(from, to, decoration);
	return builder.finish();
}

const diagnosticsPlugin = ViewPlugin.fromClass(
	class {
		decorations: ReturnType<typeof buildDiagnosticDecorations>;
		constructor(view: EditorView) {
			this.decorations = buildDiagnosticDecorations(view);
		}
		update(update: ViewUpdate) {
			if (update.docChanged) {
				this.decorations = buildDiagnosticDecorations(update.view);
			}
		}
	},
	{ decorations: (v) => v.decorations },
);

const editorExtensions = [
	json(),
	rainbowBracketsPlugin,
	rainbowBracketTheme,
	diagnosticsPlugin,
	diagnosticTheme,
	indentationMarkers(),
];

// Enum chips wrap, so the cap only guards against a controlled vocabulary with
// dozens of terms; patterns are truncated because a long regex is unreadable
// inline either way, and the full value stays available on hover.
const ENUM_CHIP_LIMIT = 8;
const PATTERN_MAX_CHARS = 34;

const truncate = (value: string, max: number): string => (value.length > max ? `${value.slice(0, max - 1)}…` : value);

// The analysis type and its top-level objects each get their own section, so a
// field pointing at one of those scrolls to it. Anything deeper is detail, and
// opens inline in the row that names it.
const INLINE_FROM_DEPTH = 2;

/** Names a group the way its heading does, for a button's tooltip. */
const describe = (group: PreviewGroup): string => (group.prefix ? `${group.prefix} ${group.title}` : group.title);

/** An object's own constraints. Conditional rules render after the table, not here. */
const GroupNotes = ({ group }: { group: PreviewGroup }): ReactElement | null =>
	group.notes.length > 0 ? (
		<>
			{group.notes.map((note, i) => (
				<div key={i} className={styles.groupNote}>
					{note}
				</div>
			))}
		</>
	) : null;

/** The rules deciding when a field becomes required, shown below the fields they govern. */
const GroupConditions = ({ group }: { group: PreviewGroup }): ReactElement | null =>
	group.conditions.length > 0 ? (
		<div className={styles.conditionBlock}>
			<span className={styles.conditionLabel}>Conditional rules</span>
			{group.conditions.map((condition, i) => (
				<div key={i} className={styles.groupCondition}>
					{condition}
				</div>
			))}
		</div>
	) : null;

interface GroupTableProps {
	group: PreviewGroup;
	/** Every group by path, so a row can resolve the table it opens. */
	groups: Map<string, PreviewGroup>;
	expanded: ReadonlySet<string>;
	onToggle: (path: string) => void;
	onJump: (path: string) => void;
}

/** One object's field definitions, with deeper objects expanding inside their row. */
const GroupTable = ({ group, groups, expanded, onToggle, onJump }: GroupTableProps): ReactElement => (
	<table className={styles.fieldTable}>
		<thead>
			<tr>
				<th>Field</th>
				<th>Type</th>
				<th>Required</th>
				<th>Details</th>
			</tr>
		</thead>
		<tbody>
			{group.fields.map((field) => {
				const child = field.childPath ? groups.get(field.childPath) : undefined;
				const inline = child !== undefined && child.depth >= INLINE_FROM_DEPTH;
				const isOpen = inline && child !== undefined && expanded.has(child.path);
				return (
					<Fragment key={field.name}>
						<tr>
							<td
								className={[
									styles.fieldName,
									field.requirement === 'required' ? styles.fieldNameRequired : '',
								].join(' ')}
							>
								{field.name}
							</td>
							<td className={styles.fieldType}>
								{child === undefined ? (
									field.type
								) : inline ? (
									<button
										type="button"
										className={styles.toggleButton}
										onClick={() => onToggle(child.path)}
										aria-expanded={isOpen}
										title={`${isOpen ? 'Hide' : 'Show'} the ${child.fields.length} fields of ${describe(child)}`}
									>
										{field.type} {isOpen ? '▾' : '▸'}
									</button>
								) : (
									<button
										type="button"
										className={styles.jumpButton}
										onClick={() => onJump(child.path)}
										title={`Jump to ${describe(child)}`}
									>
										{field.type} ↓
									</button>
								)}
							</td>
							<td className={styles.fieldRequirement}>
								{field.requirement === 'required' ? (
									<span className={styles.requiredBadge}>yes</span>
								) : field.requirement === 'conditional' ? (
									<span className={styles.conditionalBadge} title={field.rule ?? undefined}>
										conditional
									</span>
								) : (
									<span className={styles.optionalBadge}>no</span>
								)}
							</td>
							<td className={styles.fieldDetails}>
								{field.description && <div className={styles.fieldDescription}>{field.description}</div>}
								{field.enumValues && (
									<span className={styles.enumChips}>
										{field.enumValues.slice(0, ENUM_CHIP_LIMIT).map((value, i) => (
											<code key={`${value}-${i}`} className={styles.enumChip}>
												{value}
											</code>
										))}
										{field.enumValues.length > ENUM_CHIP_LIMIT && (
											<span className={styles.enumMore} title={field.enumValues.join(', ')}>
												+{field.enumValues.length - ENUM_CHIP_LIMIT} more
											</span>
										)}
									</span>
								)}
								{field.pattern && (
									<div className={styles.detailsLine}>
										matches{' '}
										<code className={styles.patternValue} title={field.pattern}>
											{truncate(field.pattern, PATTERN_MAX_CHARS)}
										</code>
									</div>
								)}
								{field.details && <div className={styles.detailsLine}>{field.details}</div>}
							</td>
						</tr>
						{isOpen && child !== undefined && (
							<tr className={styles.nestedRow}>
								<td colSpan={4}>
									<div className={styles.nestedPanel}>
										<div className={styles.nestedHeading}>
											{child.prefix && <span className={styles.groupPrefix}>{child.prefix}</span>}
											<code className={styles.groupTitle}>{child.title}</code>
											{child.kind && <span className={styles.groupKind}>{child.kind}</span>}
										</div>
										{/* The row above already carries this object's description; an array's
										    item shape has its own, which is worth showing. */}
										{child.description && child.description !== field.description && (
											<p className={styles.groupDescription}>{child.description}</p>
										)}
										<GroupNotes group={child} />
										{child.fields.length > 0 ? (
											<GroupTable
												group={child}
												groups={groups}
												expanded={expanded}
												onToggle={onToggle}
												onJump={onJump}
											/>
										) : (
											<div className={styles.groupEmpty}>No fields defined; any content is accepted.</div>
										)}
										<GroupConditions group={child} />
									</div>
								</td>
							</tr>
						)}
					</Fragment>
				);
			})}
		</tbody>
	</table>
);

const SAMPLE_CSV = [
	'donor_id,gender,vital_status,primary_site,age_at_diagnosis,tumour_stage,survival_days',
	'DO001,Female,Alive,Breast,45,II,1200',
	'DO002,Male,Deceased,Lung,67,IV,340',
	'DO003,Female,Alive,Colorectal,52,III,890',
	'DO004,Male,Alive,Skin,38,I,1500',
].join('\n');

const SongSchemaPlayground = (): ReactElement => {
	const [editorValue, setEditorValue] = useState(STARTER_TEMPLATE);
	const [result, setResult] = useState<SongValidationResult>(() => validateSongSchema(STARTER_TEMPLATE));
	const [splitPct, setSplitPct] = useState(SPLIT_DEFAULT);
	const [copied, setCopied] = useState(false);
	const [showCsv, setShowCsv] = useState(false);
	const [csvText, setCsvText] = useState('');
	const [analysisName, setAnalysisName] = useState('');
	const [csvError, setCsvError] = useState<string | null>(null);
	const [expanded, setExpanded] = useState<ReadonlySet<string>>(() => new Set<string>());

	const splitContainerRef = useRef<HTMLDivElement>(null);
	const previewBodyRef = useRef<HTMLDivElement>(null);
	const isDragging = useRef(false);
	const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	const toggleGroup = useCallback((path: string) => {
		setExpanded((current) => {
			const next = new Set(current);
			if (!next.delete(path)) next.add(path);
			return next;
		});
	}, []);

	// Scrolls the preview to the table describing a nested object. Matching on the
	// data attribute rather than an id keeps arbitrary property names safe to use.
	const jumpToGroup = useCallback((path: string) => {
		const container = previewBodyRef.current;
		if (!container) return;
		for (const section of Array.from(container.querySelectorAll('[data-group]'))) {
			if (section.getAttribute('data-group') === path) {
				section.scrollIntoView({ behavior: 'smooth', block: 'start' });
				return;
			}
		}
	}, []);

	const onDragStart = useCallback((e: React.MouseEvent) => {
		e.preventDefault();
		isDragging.current = true;
		document.body.style.userSelect = 'none';
		document.body.style.cursor = 'col-resize';

		const onMouseMove = (ev: MouseEvent) => {
			if (!isDragging.current || !splitContainerRef.current) return;
			const rect = splitContainerRef.current.getBoundingClientRect();
			const pct = ((ev.clientX - rect.left) / rect.width) * 100;
			setSplitPct(Math.min(SPLIT_MAX, Math.max(SPLIT_MIN, pct)));
		};
		const onMouseUp = () => {
			isDragging.current = false;
			document.body.style.userSelect = '';
			document.body.style.cursor = '';
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('mouseup', onMouseUp);
		};
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', onMouseUp);
	}, []);

	const applyValue = (value: string) => {
		setEditorValue(value);
		setResult(validateSongSchema(value));
	};

	const handleEditorChange = useCallback((value: string) => {
		setEditorValue(value);
		if (debounceTimer.current) clearTimeout(debounceTimer.current);
		debounceTimer.current = setTimeout(() => setResult(validateSongSchema(value)), 500);
	}, []);

	const handleFormat = useCallback(() => {
		try {
			applyValue(JSON.stringify(JSON.parse(editorValue), null, 2));
		} catch {
			// not valid JSON — nothing to format
		}
	}, [editorValue]);

	const handleReset = useCallback(() => applyValue(STARTER_TEMPLATE), []);
	const handleLoadDemo = useCallback(() => applyValue(DEMO_TEMPLATE), []);

	const handleCopy = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(editorValue);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch {
			// clipboard unavailable — no-op
		}
	}, [editorValue]);

	const loadExampleCsv = () => {
		setCsvText(SAMPLE_CSV);
		setAnalysisName('clinical_data');
		setCsvError(null);
	};

	const generateFromCsv = () => {
		setCsvError(null);
		try {
			const schema = generateSongSchema(csvText, analysisName);
			applyValue(JSON.stringify(schema, null, 2));
			setShowCsv(false);
		} catch (err) {
			setCsvError(err instanceof Error ? err.message : 'Generation failed');
		}
	};

	// Clean up the debounce timer on unmount.
	useEffect(() => () => {
		if (debounceTimer.current) clearTimeout(debounceTimer.current);
	}, []);

	// The preview renders whenever the JSON parses into something coherent, even
	// with errors outstanding, so the schema stays visible while it is fixed.
	const preview = result.preview;
	const groupsByPath = new Map((preview?.groups ?? []).map((group) => [group.path, group]));
	const sections = (preview?.groups ?? []).filter((group) => group.depth < INLINE_FROM_DEPTH);

	return (
		<div className={styles.playground}>
			{/* Header */}
			<div className={styles.header}>
				<div>
					<h3 className={styles.title}>Song Schema Playground</h3>
					<p className={styles.subtitle}>
						Generate a starter Song schema from CSV, then edit it with live validation. Everything runs in your
						browser; nothing is sent to a server.
					</p>
				</div>
				<div className={styles.headerActions}>
					<button type="button" className={styles.btnPrimary} onClick={handleCopy} disabled={!preview}>
						{copied ? 'Copied!' : 'Copy JSON'}
					</button>
				</div>
			</div>

			{/* Generate-from-CSV panel */}
			{showCsv && (
				<div className={styles.csvPanel}>
					<div className={styles.csvRow}>
						<span className={styles.csvLabel}>Generate a starter schema from CSV</span>
						<button type="button" className={styles.ghostButton} onClick={loadExampleCsv}>
							Load example CSV
						</button>
					</div>
					<textarea
						className={styles.csvTextarea}
						value={csvText}
						onChange={(e) => setCsvText(e.target.value)}
						placeholder={'donor_id,gender,vital_status\nDO001,Female,Alive\n...'}
						rows={5}
					/>
					<div className={styles.csvInputs}>
						<div className={styles.nameField}>
							<label>Analysis type name</label>
							<input
								className={styles.textInput}
								value={analysisName}
								onChange={(e) => setAnalysisName(e.target.value)}
								placeholder="e.g. clinical_data"
							/>
						</div>
						<button
							type="button"
							className={styles.btnPrimary}
							onClick={generateFromCsv}
							disabled={!csvText.trim()}
						>
							Generate schema
						</button>
					</div>
					{csvError && <div className={styles.csvError}>{csvError}</div>}
				</div>
			)}

			{/* Split pane */}
			<div ref={splitContainerRef} className={styles.split}>
				{/* Editor panel */}
				<div className={styles.editorPanel} style={{ width: `${splitPct}%` }}>
					<div className={styles.editorToolbar}>
						<span className={styles.paneLabel}>Schema Editor</span>
						<div className={styles.toolbarButtons}>
							<button
								type="button"
								className={`${styles.ghostButton} ${showCsv ? styles.ghostButtonActive : ''}`}
								onClick={() => setShowCsv((s) => !s)}
							>
								Generate from CSV
							</button>
							<button type="button" className={styles.ghostButton} onClick={handleFormat}>
								Format
							</button>
							<button type="button" className={styles.ghostButton} onClick={handleReset}>
								Reset
							</button>
							<button type="button" className={styles.ghostButton} onClick={handleLoadDemo}>
								Load Demo
							</button>
						</div>
					</div>

					{/* Validation status: errors are what Song rejects, warnings are advisory */}
					<div
						className={[
							styles.status,
							result.status === 'valid'
								? styles.statusValid
								: result.status === 'warning'
									? styles.statusWarning
									: styles.statusError,
						].join(' ')}
					>
						{result.status === 'valid' ? (
							<div className={styles.statusValidText}>Valid Song schema</div>
						) : (
							<div className={styles.statusMsgList}>
								{result.errors.map((issue, i) => (
									<div key={`e${i}`} className={[styles.statusMsg, styles.statusMsgErr].join(' ')}>
										{issue.message}
									</div>
								))}
								{result.warnings.map((issue, i) => (
									<div key={`w${i}`} className={[styles.statusMsg, styles.statusMsgWarn].join(' ')}>
										{issue.message}
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
							style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}
							basicSetup={{ lineNumbers: true, foldGutter: true, tabSize: 2 }}
						/>
					</div>
				</div>

				{/* Drag handle */}
				<div
					className={styles.dragHandle}
					onMouseDown={onDragStart}
					onDoubleClick={() => setSplitPct(SPLIT_DEFAULT)}
					title="Drag to resize; double-click to reset"
				>
					<span className={styles.dragDots}>
						{Array.from({ length: 5 }).map((_, i) => (
							<span key={i} className={styles.dragDot} />
						))}
					</span>
				</div>

				{/* Preview panel */}
				<div className={styles.previewPanel}>
					<div className={styles.previewHeader}>Live Preview</div>
					{preview ? (
						<div ref={previewBodyRef} className={styles.previewBody}>
							{/* The analysis type and its objects each get a section; deeper objects
								open inline from the row that names them. */}
							{sections.map((group) => (
								<section key={group.path} data-group={group.path} className={styles.group}>
									<div className={styles.groupHeading}>
										{group.prefix && <span className={styles.groupPrefix}>{group.prefix}</span>}
										<code className={styles.groupTitle}>{group.title}</code>
										{group.kind && <span className={styles.groupKind}>{group.kind}</span>}
										{group.required && <span className={styles.requiredBadge}>required</span>}
									</div>
									{group.description && <p className={styles.groupDescription}>{group.description}</p>}
									<GroupNotes group={group} />
									{group.summary ? (
										<div className={styles.groupSummary}>{group.summary}</div>
									) : group.fields.length > 0 ? (
										<GroupTable
											group={group}
											groups={groupsByPath}
											expanded={expanded}
											onToggle={toggleGroup}
											onJump={jumpToGroup}
										/>
									) : (
										<div className={styles.groupEmpty}>No fields defined; any content is accepted.</div>
									)}
									<GroupConditions group={group} />
								</section>
							))}
						</div>
					) : (
						<div className={styles.previewEmpty}>Fix the schema errors on the left to see a preview.</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default SongSchemaPlayground;
