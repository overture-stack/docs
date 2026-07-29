// Locates a JSON path inside raw JSON text (client-side, pure).
//
// The validator works on `JSON.parse` output, which carries no positions, so
// this maps a path like ['schema', 'properties', 'donor', 'type'] back to an
// offset range in the document the editor is showing.
//
// It assumes well-formed JSON, which the caller guarantees: a document that does
// not parse has no structural findings to locate, and its syntax error already
// carries its own position. Anything unexpected returns null rather than
// guessing, so a highlight is either right or absent.

export interface JsonRange {
	from: number;
	to: number;
}

interface Cursor {
	text: string;
	pos: number;
}

const WHITESPACE = new Set([' ', '\t', '\n', '\r']);

function skipWhitespace(c: Cursor): void {
	while (c.pos < c.text.length && WHITESPACE.has(c.text[c.pos])) c.pos++;
}

/** Advances past a string literal, honouring escapes, and returns its range. */
function readString(c: Cursor): JsonRange | null {
	if (c.text[c.pos] !== '"') return null;
	const from = c.pos;
	c.pos++;
	while (c.pos < c.text.length) {
		const ch = c.text[c.pos];
		if (ch === '\\') {
			c.pos += 2;
			continue;
		}
		c.pos++;
		if (ch === '"') return { from, to: c.pos };
	}
	return null;
}

/** Advances past any value, returning its range. */
function skipValue(c: Cursor): JsonRange | null {
	skipWhitespace(c);
	const from = c.pos;
	const ch = c.text[c.pos];
	if (ch === undefined) return null;

	if (ch === '"') return readString(c);

	if (ch === '{' || ch === '[') {
		const close = ch === '{' ? '}' : ']';
		c.pos++;
		while (c.pos < c.text.length) {
			skipWhitespace(c);
			if (c.text[c.pos] === close) {
				c.pos++;
				return { from, to: c.pos };
			}
			if (c.text[c.pos] === ',' || c.text[c.pos] === ':') {
				c.pos++;
				continue;
			}
			if (skipValue(c) === null) return null;
		}
		return null;
	}

	// A number, true, false, or null: run to the next structural character.
	while (c.pos < c.text.length && !',}]'.includes(c.text[c.pos]) && !WHITESPACE.has(c.text[c.pos])) c.pos++;
	return c.pos > from ? { from, to: c.pos } : null;
}

/** Unescapes a JSON string literal so it can be compared to a path segment. */
function unquote(text: string, range: JsonRange): string | null {
	try {
		const value: unknown = JSON.parse(text.slice(range.from, range.to));
		return typeof value === 'string' ? value : null;
	} catch {
		return null;
	}
}

function descend(c: Cursor, path: readonly (string | number)[], index: number): JsonRange | null {
	skipWhitespace(c);
	const segment = path[index];
	const last = index === path.length - 1;

	if (typeof segment === 'number') {
		if (c.text[c.pos] !== '[') return null;
		c.pos++;
		for (let i = 0; ; i++) {
			skipWhitespace(c);
			if (c.text[c.pos] === ']' || c.pos >= c.text.length) return null;
			if (i === segment) {
				if (last) return skipValue(c);
				return descend(c, path, index + 1);
			}
			if (skipValue(c) === null) return null;
			skipWhitespace(c);
			if (c.text[c.pos] === ',') c.pos++;
		}
	}

	if (c.text[c.pos] !== '{') return null;
	c.pos++;
	// Duplicate keys are legal JSON and `JSON.parse` keeps the last, so the last
	// match is the one the findings were computed from.
	let match: JsonRange | null = null;
	while (c.pos < c.text.length) {
		skipWhitespace(c);
		if (c.text[c.pos] === '}') return match;

		const keyRange = readString(c);
		if (keyRange === null) return match;
		skipWhitespace(c);
		if (c.text[c.pos] !== ':') return match;
		c.pos++;

		if (unquote(c.text, keyRange) === segment) {
			if (last) {
				match = keyRange;
				if (skipValue(c) === null) return match;
			} else {
				// Deeper segments may not resolve, in which case the key we matched on
				// the way down is still the most specific place to point at.
				const branch: Cursor = { text: c.text, pos: c.pos };
				const deeper = descend(branch, path, index + 1);
				match = deeper ?? keyRange;
				if (skipValue(c) === null) return match;
			}
		} else if (skipValue(c) === null) {
			return match;
		}

		skipWhitespace(c);
		if (c.text[c.pos] === ',') c.pos++;
	}
	return match;
}

/**
 * Finds where a path sits in JSON text. Object segments resolve to the key
 * token, including its quotes, since that is what identifies the finding; array
 * indices resolve to the element's value.
 *
 * @returns the range, or null when the path is empty or does not resolve.
 */
export function locateJsonPath(text: string, path: readonly (string | number)[]): JsonRange | null {
	if (path.length === 0) return null;
	return descend({ text, pos: 0 }, path, 0);
}
