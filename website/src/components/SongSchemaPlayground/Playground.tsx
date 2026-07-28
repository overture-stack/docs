/*
 * Song Schema Playground — embedded, client-side Song schema editor.
 *
 * Integrated "both" experience for the Building Song Schemas guide:
 *   - Generate a starter schema from CSV (Generate from CSV panel), and
 *   - edit it in a live editor that validates the Song schema envelope + inner
 *     JSON Schema as you type, with a rendered field preview.
 *
 * Same shell/patterns as the Dictionary Playground: emotion -> CSS Modules,
 * CodeMirror with rainbow brackets + oneDark, three-tier validation. Browser-
 * only (CodeMirror), so it loads through <BrowserOnly> from index.tsx.
 */

import { json } from '@codemirror/lang-json';
import { RangeSetBuilder } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { Decoration, EditorView, ViewPlugin, ViewUpdate } from '@codemirror/view';
import { indentationMarkers } from '@replit/codemirror-indentation-markers';
import ReactCodeMirror from '@uiw/react-codemirror';
import React, { ReactElement, useCallback, useEffect, useRef, useState } from 'react';

import { generateSongSchema } from './lib/generateSongSchema';
import { SongValidationResult, validateSongSchema } from './lib/validateSongSchema';
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

const editorExtensions = [json(), rainbowBracketsPlugin, rainbowBracketTheme, indentationMarkers()];

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

	const splitContainerRef = useRef<HTMLDivElement>(null);
	const isDragging = useRef(false);
	const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

	const handleDownload = useCallback(() => {
		const blob = new Blob([editorValue], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'song-schema.json';
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

	const preview = result.status !== 'error' ? result.preview : null;

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
					<button
						type="button"
						className={styles.ghostButton}
						onClick={handleCopy}
						disabled={result.status === 'error'}
					>
						{copied ? 'Copied!' : 'Copy JSON'}
					</button>
					<button
						type="button"
						className={styles.btnPrimary}
						onClick={handleDownload}
						disabled={result.status === 'error'}
					>
						Download JSON
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

					{/* Validation status */}
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
						) : result.status === 'warning' ? (
							<div className={styles.statusMsgList}>
								{result.warnings.map((w, i) => (
									<div key={i} className={[styles.statusMsg, styles.statusMsgWarn].join(' ')}>
										{w}
									</div>
								))}
							</div>
						) : (
							<div className={styles.statusMsgList}>
								{result.errors.map((err, i) => (
									<div key={i} className={[styles.statusMsg, styles.statusMsgErr].join(' ')}>
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
						<div className={styles.previewBody}>
							<p className={styles.previewName}>
								Analysis type: <code>{preview.name || '(unnamed)'}</code>
							</p>
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
									{preview.properties.map((p) => (
										<tr key={p.name}>
											<td className={styles.fieldName}>{p.name}</td>
											<td className={styles.fieldType}>{p.type}</td>
											<td>
												{p.required ? (
													<span className={styles.requiredBadge}>Required</span>
												) : (
													<span className={styles.optionalText}>optional</span>
												)}
											</td>
											<td className={styles.fieldDetails}>{p.details}</td>
										</tr>
									))}
								</tbody>
							</table>
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
