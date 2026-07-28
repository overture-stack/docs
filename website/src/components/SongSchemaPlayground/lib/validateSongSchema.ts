// Structural validator for Song schemas (client-side, pure).
//
// Song has no published Zod/meta-schema to validate against the way Lectern
// does, so this walks the `{ name, schema }` envelope and the inner JSON Schema
// and reports Song-specific, field-level feedback in three tiers, mirroring the
// Dictionary Playground's UX:
//   - error:   unparseable, or nothing to preview (no properties object)
//   - warning: renders, but has structural issues Song would reject or ignore
//   - valid:   a well-formed Song schema

export interface PreviewProperty {
	name: string;
	type: string;
	required: boolean;
	details: string;
}

export interface PreviewSchema {
	name: string;
	properties: PreviewProperty[];
}

export type SongValidationResult =
	| { status: 'valid'; preview: PreviewSchema }
	| { status: 'warning'; preview: PreviewSchema; warnings: string[] }
	| { status: 'error'; errors: string[] };

const KNOWN_TYPES = new Set(['string', 'number', 'integer', 'boolean', 'object', 'array', 'null']);
// Fields Song's base schema already provides; redefining them here can conflict.
const BASE_OWNED = new Set(['studyId', 'analysisType', 'samples', 'files', 'study']);
const NAME_PATTERN = /^[A-Za-z0-9_-]+$/;

function isPlainObject(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function describeProperty(def: Record<string, unknown>): string {
	const parts: string[] = [];
	if (Array.isArray(def.enum)) {
		const values = def.enum.map((v) => (v === null ? 'null' : String(v)));
		const shown = values.slice(0, 4).join(', ');
		parts.push(`enum: ${shown}${values.length > 4 ? `, +${values.length - 4} more` : ''}`);
	}
	if (typeof def.pattern === 'string') parts.push(`pattern: ${def.pattern}`);
	if (def.const !== undefined) parts.push(`const: ${String(def.const)}`);
	if (typeof def.format === 'string') parts.push(`format: ${def.format}`);
	if (typeof def.minimum === 'number' || typeof def.maximum === 'number') {
		parts.push(`range: ${def.minimum ?? '−∞'}..${def.maximum ?? '∞'}`);
	}
	if (typeof def.minItems === 'number' || typeof def.maxItems === 'number') {
		parts.push(`items: ${def.minItems ?? 0}..${def.maxItems ?? '∞'}`);
	}
	if (isPlainObject(def.properties)) {
		parts.push(`fields: ${Object.keys(def.properties).join(', ')}`);
	}
	return parts.join(' · ');
}

function typeLabel(def: Record<string, unknown>): string {
	const t = def.type;
	if (Array.isArray(t)) return t.join(' | ');
	if (typeof t === 'string') return t;
	if (Array.isArray(def.enum)) return 'enum';
	return '—';
}

function buildPreview(name: unknown, required: string[], properties: Record<string, unknown>): PreviewSchema {
	const requiredSet = new Set(required);
	return {
		name: typeof name === 'string' ? name : '',
		properties: Object.entries(properties).map(([key, def]) => ({
			name: key,
			type: isPlainObject(def) ? typeLabel(def) : '—',
			required: requiredSet.has(key),
			details: isPlainObject(def) ? describeProperty(def) : '',
		})),
	};
}

export function validateSongSchema(text: string): SongValidationResult {
	let parsed: unknown;
	try {
		parsed = JSON.parse(text);
	} catch (e) {
		return {
			status: 'error',
			errors: [`JSON syntax error: ${e instanceof Error ? e.message : String(e)}`],
		};
	}

	if (!isPlainObject(parsed)) {
		return { status: 'error', errors: ['Top-level value must be a JSON object with "name" and "schema".'] };
	}
	if (!isPlainObject(parsed.schema)) {
		return { status: 'error', errors: ['Missing "schema": a Song schema wraps its definition in a "schema" object.'] };
	}
	const schema = parsed.schema;
	if (!isPlainObject(schema.properties)) {
		return {
			status: 'error',
			errors: ['schema.properties must be an object with at least one field.'],
		};
	}

	const properties = schema.properties;
	const required = Array.isArray(schema.required) ? (schema.required as unknown[]).filter((r): r is string => typeof r === 'string') : [];
	const preview = buildPreview(parsed.name, required, properties);
	const warnings: string[] = [];

	// Envelope
	if (typeof parsed.name !== 'string' || !parsed.name.trim()) {
		warnings.push('Missing "name": Song identifies the analysis type by this field.');
	} else if (!NAME_PATTERN.test(parsed.name)) {
		warnings.push(`name "${parsed.name}": use only letters, numbers, hyphens, and underscores.`);
	}
	if (schema.type !== 'object') {
		warnings.push('schema.type should be "object".');
	}
	if (Object.keys(properties).length === 0) {
		warnings.push('schema.properties is empty; add at least one field.');
	}
	if ('required' in schema && !Array.isArray(schema.required)) {
		warnings.push('schema.required should be an array of field names.');
	}
	for (const r of required) {
		if (!(r in properties)) {
			warnings.push(`required lists "${r}", which is not defined in properties.`);
		}
	}

	// Per-property structural checks
	for (const [key, def] of Object.entries(properties)) {
		if (BASE_OWNED.has(key)) {
			warnings.push(`"${key}" is provided by Song's base schema; defining it here may conflict.`);
		}
		if (!isPlainObject(def)) {
			warnings.push(`property "${key}" should be an object.`);
			continue;
		}
		const types = Array.isArray(def.type) ? def.type : def.type != null ? [def.type] : [];
		for (const t of types) {
			if (!KNOWN_TYPES.has(t as string)) {
				warnings.push(`property "${key}": unknown type "${String(t)}".`);
			}
		}
		if ('enum' in def && !Array.isArray(def.enum)) {
			warnings.push(`property "${key}": enum should be an array of allowed values.`);
		}
		if (typeof def.pattern === 'string') {
			try {
				new RegExp(def.pattern);
			} catch {
				warnings.push(`property "${key}": pattern is not a valid regular expression.`);
			}
		}
		for (const numKey of ['minItems', 'maxItems', 'minimum', 'maximum'] as const) {
			if (numKey in def && typeof def[numKey] !== 'number') {
				warnings.push(`property "${key}": ${numKey} should be a number.`);
			}
		}
	}

	return warnings.length > 0 ? { status: 'warning', preview, warnings } : { status: 'valid', preview };
}
