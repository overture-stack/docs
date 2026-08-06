// CSV → starter Song schema generator (client-side, pure).
//
// The reference config generator does not emit a Song schema, so this is new.
// It produces the `{ name, schema: { type, required, properties } }` envelope
// Song expects, inferring a JSON Schema `type` per column and adding an `enum`
// for low-cardinality string columns (a controlled vocabulary), which is the
// most common starting point an administrator then refines.

import { parseCsv } from '../../ConfigGenerator/lib/csvParser';

export type JsonSchemaType = 'string' | 'integer' | 'number' | 'boolean';

export interface SongSchemaProperty {
	type: JsonSchemaType;
	enum?: string[];
}

export interface SongSchema {
	name: string;
	schema: {
		type: 'object';
		required: string[];
		properties: Record<string, SongSchemaProperty>;
	};
}

const BOOLEAN_VALUES = new Set(['true', 'false', 'yes', 'no', '0', '1']);

function inferJsonType(values: string[]): JsonSchemaType {
	const nonEmpty = values.map((v) => v.trim()).filter((v) => v !== '');
	if (nonEmpty.length === 0) return 'string';
	if (nonEmpty.every((v) => BOOLEAN_VALUES.has(v.toLowerCase()))) return 'boolean';
	if (nonEmpty.every((v) => !isNaN(Number(v)))) {
		return nonEmpty.every((v) => Number.isInteger(Number(v))) ? 'integer' : 'number';
	}
	return 'string';
}

function sanitizePropertyName(header: string, index: number): string {
	const cleaned = header
		.trim()
		.replace(/\s+/g, '_')
		.replace(/[^A-Za-z0-9_]/g, '');
	return cleaned || `field_${index + 1}`;
}

/**
 * Generate a starter Song schema from CSV content.
 *
 * @throws Error when the CSV is empty or its headers cannot be parsed.
 */
export function generateSongSchema(csvContent: string, analysisTypeName: string): SongSchema {
	if (!csvContent?.trim()) {
		throw new Error('CSV content is required');
	}
	const csv = parseCsv(csvContent);
	if (csv.headers.length === 0) {
		throw new Error('Could not parse CSV headers');
	}

	const name = (analysisTypeName ?? '').trim() || 'exampleAnalysis';
	const properties: Record<string, SongSchemaProperty> = {};
	const required: string[] = [];

	csv.headers.forEach((header, i) => {
		const key = sanitizePropertyName(header, i);
		const values = csv.rows.map((row) => row[i] ?? '');
		const type = inferJsonType(values);
		const property: SongSchemaProperty = { type };

		// Suggest an enum for repeated, low-cardinality string columns — a likely
		// controlled vocabulary (e.g. gender, vital status). Skip unique-per-row
		// columns (identifiers), which show no repetition.
		if (type === 'string') {
			const nonEmpty = values.map((v) => v.trim()).filter((v) => v !== '');
			const distinct = Array.from(new Set(nonEmpty));
			if (distinct.length >= 2 && distinct.length <= 6 && distinct.length < nonEmpty.length) {
				property.enum = distinct;
			}
		}

		properties[key] = property;

		// Require columns that are populated in every row.
		const nonEmptyCount = values.filter((v) => v.trim() !== '').length;
		if (csv.rows.length > 0 && nonEmptyCount === csv.rows.length) {
			required.push(key);
		}
	});

	return {
		name,
		schema: {
			type: 'object',
			required,
			properties,
		},
	};
}
