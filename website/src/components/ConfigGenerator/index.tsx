/*
 * Config Generator — embedded, client-side CSV → Overture configs playground.
 *
 * Ported from the Prelude IBCworkshop stage app. The original posted the CSV to
 * a Next.js `/api/generate-configs` route; here the generation logic (lib/) runs
 * directly in the browser, so nothing is sent to a server.
 *
 * Parametrized by `outputs` so each guide embeds its own focused instance:
 *   - Index Mappings          -> outputs={['esMapping']}
 *   - Customizing the Portal   -> outputs={['arrangerBase','arrangerExtended','arrangerTable','arrangerFacets']}
 * Omitting `outputs` shows all generated configs.
 *
 * No browser-only modules are imported at load time (FileReader / clipboard /
 * Blob are used inside handlers only), so this renders fine under SSR without a
 * <BrowserOnly> wrapper.
 */

import React, { ChangeEvent, ReactElement, useRef, useState } from 'react';

import { generateConfigs, GeneratedConfigs } from './lib/generateConfigs';
import styles from './styles.module.css';

type OutputKey = keyof GeneratedConfigs;

interface OutputMeta {
	label: string;
	filename: string;
	kind: 'json' | 'sql';
}

// Canonical order + display metadata for every generated config.
const OUTPUT_META: Record<OutputKey, OutputMeta> = {
	esMapping: { label: 'elasticsearch-mapping.json', filename: 'elasticsearch-mapping.json', kind: 'json' },
	arrangerBase: { label: 'arranger/base.json', filename: 'base.json', kind: 'json' },
	arrangerExtended: { label: 'arranger/extended.json', filename: 'extended.json', kind: 'json' },
	arrangerTable: { label: 'arranger/table.json', filename: 'table.json', kind: 'json' },
	arrangerFacets: { label: 'arranger/facets.json', filename: 'facets.json', kind: 'json' },
	lecternDictionary: { label: 'lectern/dictionary.json', filename: 'dictionary.json', kind: 'json' },
	postgresSql: { label: 'postgres-table.sql', filename: 'postgres-table.sql', kind: 'sql' },
};

const CANONICAL_ORDER: OutputKey[] = [
	'esMapping',
	'arrangerBase',
	'arrangerExtended',
	'arrangerTable',
	'arrangerFacets',
	'lecternDictionary',
	'postgresSql',
];

const SAMPLE_CSV = [
	'donor_id,gender,vital_status,primary_site,age_at_diagnosis,tumour_stage,survival_days',
	'DO001,Female,Alive,Breast,45,II,1200',
	'DO002,Male,Deceased,Lung,67,IV,340',
	'DO003,Female,Alive,Colorectal,52,III,890',
	'DO004,Male,Alive,Skin,38,I,1500',
].join('\n');

interface ConfigGeneratorProps {
	/** Which configs to surface; defaults to all, in canonical order. */
	outputs?: OutputKey[];
	title?: string;
	subtitle?: string;
}

function formatOutput(key: OutputKey, configs: GeneratedConfigs): string {
	const value = configs[key];
	return typeof value === 'string' ? value : JSON.stringify(value, null, 2);
}

function deriveName(csvText: string, filename: string): string {
	const base = filename.replace(/\.csv$/i, '') || csvText.split(',')[0] || 'data';
	return (
		base
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '_')
			.replace(/^_+|_+$/g, '')
			.slice(0, 40) || 'data'
	);
}

function previewRows(csvText: string): string[][] {
	return csvText
		.split(/\r?\n/)
		.filter((l) => l.trim())
		.slice(0, 6)
		.map((line) => line.split(',').map((f) => f.replace(/^"|"$/g, '').trim()));
}

const ConfigGenerator = ({ outputs, title, subtitle }: ConfigGeneratorProps): ReactElement => {
	const requested = (outputs && outputs.length > 0 ? outputs : CANONICAL_ORDER).filter(
		(k): k is OutputKey => k in OUTPUT_META,
	);
	const orderedOutputs = CANONICAL_ORDER.filter((k) => requested.includes(k));
	const needsTableName = orderedOutputs.some((k) => k === 'postgresSql' || k === 'lecternDictionary');

	const fileInputRef = useRef<HTMLInputElement>(null);
	const [csvText, setCsvText] = useState('');
	const [filename, setFilename] = useState('');
	const [indexName, setIndexName] = useState('');
	const [tableName, setTableName] = useState('');
	const [configs, setConfigs] = useState<GeneratedConfigs | null>(null);
	const [activeTab, setActiveTab] = useState<OutputKey>(orderedOutputs[0]);
	const [copiedTab, setCopiedTab] = useState<OutputKey | null>(null);
	const [error, setError] = useState<string | null>(null);

	const loadCsv = (text: string, name: string) => {
		setCsvText(text);
		setFilename(name);
		setConfigs(null);
		setError(null);
		const derived = deriveName(text, name);
		setIndexName((prev) => prev || derived);
		setTableName((prev) => prev || derived);
	};

	const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (ev) => loadCsv(ev.target?.result as string, file.name);
		reader.readAsText(file);
	};

	const runGenerate = (text: string, idx: string, tbl: string) => {
		setError(null);
		try {
			const result = generateConfigs(text, idx, tbl);
			setConfigs(result);
			setActiveTab(orderedOutputs[0]);
		} catch (err) {
			setConfigs(null);
			setError(err instanceof Error ? err.message : 'Generation failed');
		}
	};

	const loadExample = () => {
		const name = 'clinical_data';
		setCsvText(SAMPLE_CSV);
		setFilename('clinical_data.csv');
		setIndexName(name);
		setTableName(name);
		runGenerate(SAMPLE_CSV, name, name);
	};

	const copyTab = async (key: OutputKey) => {
		if (!configs) return;
		try {
			await navigator.clipboard.writeText(formatOutput(key, configs));
			setCopiedTab(key);
			setTimeout(() => setCopiedTab(null), 1500);
		} catch {
			// clipboard unavailable — no-op
		}
	};

	const downloadTab = (key: OutputKey) => {
		if (!configs) return;
		const blob = new Blob([formatOutput(key, configs)], {
			type: OUTPUT_META[key].kind === 'json' ? 'application/json' : 'text/plain',
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = OUTPUT_META[key].filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const rows = csvText ? previewRows(csvText) : [];
	const canGenerate = Boolean(csvText.trim() && indexName.trim());

	return (
		<div className={styles.generator}>
			<div className={styles.header}>
				<h3 className={styles.title}>{title ?? 'Config Generator'}</h3>
				<p className={styles.subtitle}>
					{subtitle ??
						'Upload or paste CSV data and generate base configuration files in your browser. Nothing is sent to a server.'}
				</p>
			</div>

			<div className={styles.body}>
				{/* Step 1 — CSV input */}
				<section className={styles.section}>
					<h4 className={styles.sectionHeading}>1. Provide CSV data</h4>

					<div className={styles.fileRow}>
						<button
							type="button"
							className={`${styles.btnPrimary} ${styles.uploadBtn}`}
							onClick={() => fileInputRef.current?.click()}
						>
							Upload .csv file
						</button>
						<button type="button" className={styles.ghostButton} onClick={loadExample}>
							Load example
						</button>
						{filename && <span className={styles.fileName}>{filename}</span>}
						<input ref={fileInputRef} type="file" accept=".csv" onChange={onFileChange} style={{ display: 'none' }} />
					</div>

					<label className={styles.label}>Or paste CSV content</label>
					<textarea
						className={styles.textarea}
						value={csvText}
						onChange={(e) => loadCsv(e.target.value, filename || 'data')}
						placeholder={'donor_id,age,diagnosis\nDO001,45,C34.1\n...'}
						rows={6}
					/>

					{rows.length > 0 && (
						<div className={styles.previewWrap}>
							<p className={styles.previewCaption}>Preview (first 5 rows)</p>
							<table className={styles.previewTable}>
								<tbody>
									{rows.map((row, ri) => (
										<tr key={ri} className={ri === 0 ? styles.previewHeaderRow : undefined}>
											{row.map((cell, ci) => (
												<td key={ci}>{cell}</td>
											))}
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</section>

				{/* Step 2 — Options */}
				<section className={styles.section}>
					<h4 className={styles.sectionHeading}>2. Configure options</h4>
					<div className={styles.optionsGrid}>
						<div>
							<label className={styles.label}>Index name</label>
							<input
								className={styles.input}
								value={indexName}
								onChange={(e) => setIndexName(e.target.value)}
								placeholder="e.g. clinical_data"
							/>
						</div>
						{needsTableName && (
							<div>
								<label className={styles.label}>Table name</label>
								<input
									className={styles.input}
									value={tableName}
									onChange={(e) => setTableName(e.target.value)}
									placeholder="e.g. clinical_data"
								/>
							</div>
						)}
					</div>
				</section>

				{/* Generate */}
				<button
					type="button"
					className={`${styles.btnPrimary} ${styles.generateBtn}`}
					onClick={() => runGenerate(csvText, indexName, tableName)}
					disabled={!canGenerate}
				>
					Generate configs
				</button>

				{error && <div className={styles.error}>{error}</div>}

				{/* Step 3 — Output */}
				{configs && (
					<section className={styles.output}>
						<h4 className={styles.outputHeading}>3. Generated configs</h4>

						{orderedOutputs.length > 1 && (
							<div className={styles.tabBar}>
								{orderedOutputs.map((key) => (
									<button
										type="button"
										key={key}
										className={`${styles.tab} ${activeTab === key ? styles.tabActive : ''}`}
										onClick={() => setActiveTab(key)}
									>
										{OUTPUT_META[key].label}
									</button>
								))}
							</div>
						)}

						<div className={styles.outputBody}>
							<div className={styles.outputToolbar}>
								<button type="button" className={styles.ghostButton} onClick={() => copyTab(activeTab)}>
									{copiedTab === activeTab ? 'Copied!' : 'Copy'}
								</button>
								<button type="button" className={styles.ghostButton} onClick={() => downloadTab(activeTab)}>
									Download
								</button>
							</div>
							<pre className={styles.pre}>{formatOutput(activeTab, configs)}</pre>
						</div>
					</section>
				)}
			</div>
		</div>
	);
};

export default ConfigGenerator;
