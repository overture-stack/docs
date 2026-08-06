// Structural validator and preview builder for Song schemas (client-side, pure).
//
// Song has no published Zod/meta-schema to validate against the way Lectern
// does. It validates a registration server-side against its own JSON
// meta-schema plus an analysis-type name check, so this module mirrors those
// rules in the browser and reports them in three tiers:
//   - error:   Song's registration meta-schema or name check rejects this
//   - warning: Song accepts it, but Song's own JSON Schema build (or a later
//              submission) may not, or it is probably not what was meant
//   - valid:   a well-formed Song schema
//
// Rules mirrored from Song, verified against the checked-out submodule
// (song-server/src/main/resources/schemas/analysis/analysisTypeRegistration.json
// and service/AnalysisTypeService.java):
//   - the schema body may hold only `type`, `definitions`, `properties`, and
//     `required` (the meta-schema sets `additionalProperties: false`)
//   - `type` must be exactly "object", and `properties` must be present
//   - the top level may not redefine `studyId`, `analysisState`,
//     `analysisType`, `analysisTypeId`, `files`, or `analysisId` ("not": {})
//   - `experiment`, when present, must be an object
//   - `required` must be an array of unique strings
//   - the analysis type name must match [a-zA-Z0-9._-]+ and may not be
//     "registration" (a reserved route on the registration endpoint)
//
// Deliberately not enforced: older Song servers also required a top-level
// `experiment` listed in `required`; that requirement was dropped upstream, so
// the version note lives in the guide rather than in a validator rule.
//
// The preview groups the schema into one table per object, because that is the
// shape Song schemas actually take: a handful of top-level objects, each with
// its own fields. Song runs everit json-schema 1.11.1 with draft-07 support, so
// the preview also renders what real Song schemas use beyond plain properties:
// `definitions` + `$ref` reuse, `allOf` composition, nested `if`/`then`/`else`,
// `dependencies`, `oneOf`/`anyOf`, and the key-level keywords (`propertyNames`,
// `additionalProperties`, `patternProperties`). Song's own base schema uses all
// of these, and its meta-schema explicitly allows `definitions`.
//
// Everything the preview emits is phrased for a reader rather than transcribed:
// bounds read as "1 to 2 items" rather than "1..2", a field a conditional makes
// required is marked conditional rather than optional, and enum values and
// patterns are handed over structured so the table can lay them out.

/** Whether a submission must carry a field, and whether that depends on a rule. */
export type Requirement = "required" | "conditional" | "optional";

/** One row of a table: a single field definition. */
export interface PreviewField {
  name: string;
  type: string;
  requirement: Requirement;
  /** The field's own `description` annotation, if it carries one. */
  description: string;
  /** The rule that makes a conditional field required; null otherwise. */
  rule: string | null;
  /** Allowed values, for the table to render as chips. */
  enumValues: string[] | null;
  /** Regex constraint, for the table to truncate with the full value on hover. */
  pattern: string | null;
  /** Remaining constraints, already phrased in plain English. */
  details: string;
  /** Path of the table describing this field, when it is an object or array of objects. */
  childPath: string | null;
}

/** One table: an object, its own constraints, and the fields it defines. */
export interface PreviewGroup {
  /** Dotted path of this object; '' for the analysis type itself. Unique per preview. */
  path: string;
  /** Heading above the table. */
  title: string;
  /**
   * Reads before the title, so an array's item shape says what it describes
   * ("each item in workflow.inputs") rather than labelling itself with a word
   * that could be mistaken for a statement about whether it is required.
   */
  prefix: string;
  /** 'analysis type' for the schema root; empty elsewhere, where it would add nothing. */
  kind: string;
  /** 0 for the analysis type, 1 for its top-level objects, and so on. */
  depth: number;
  /** Whether this object is required by its parent. */
  required: boolean;
  /** The object's own `description` annotation, if it carries one. */
  description: string;
  /** Constraints on the object itself: allowed keys, composition, item bounds. */
  notes: string[];
  /** Conditional rules: `if`/`then`/`else` and `dependencies`. */
  conditions: string[];
  fields: PreviewField[];
  /**
   * Replaces the table when every field only points at another table, which
   * would otherwise say nothing the headings below already say.
   */
  summary: string | null;
}

export interface PreviewSchema {
  name: string;
  groups: PreviewGroup[];
}

/**
 * A finding, with the JSON path it applies to so the editor can highlight it.
 * An empty path means the document as a whole.
 */
export interface Issue {
  message: string;
  path: (string | number)[];
}

export interface SongValidationResult {
  status: "valid" | "warning" | "error";
  errors: Issue[];
  warnings: Issue[];
  /** Null only when the JSON gives us nothing coherent to render. */
  preview: PreviewSchema | null;
}

/** The schema body, which every structural finding hangs off. */
const BODY = ["schema"];
/** Where the properties a finding names live. */
const PROPS = ["schema", "properties"];

function at(path: (string | number)[], message: string): Issue {
  return { message, path };
}

const KNOWN_TYPES = [
  "string",
  "number",
  "integer",
  "boolean",
  "object",
  "array",
  "null",
] as const;
const KNOWN_TYPE_SET: ReadonlySet<string> = new Set(KNOWN_TYPES);
// Named in the message, so a typo tells the author what to write instead.
const KNOWN_TYPE_LIST = `${KNOWN_TYPES.slice(0, -1).join(", ")}, or ${
  KNOWN_TYPES[KNOWN_TYPES.length - 1]
}`;

// The draft-07 vocabulary Song's schema build understands, plus its annotations.
// Anything else in a property definition is inert, so it is worth pointing out.
const JSON_SCHEMA_KEYWORDS: ReadonlySet<string> = new Set([
  "$comment",
  "$id",
  "$ref",
  "$schema",
  "additionalItems",
  "additionalProperties",
  "allOf",
  "anyOf",
  "const",
  "contains",
  "contentEncoding",
  "contentMediaType",
  "default",
  "definitions",
  "dependencies",
  "description",
  "else",
  "enum",
  "examples",
  "exclusiveMaximum",
  "exclusiveMinimum",
  "format",
  "if",
  "items",
  "maxItems",
  "maxLength",
  "maxProperties",
  "maximum",
  "minItems",
  "minLength",
  "minProperties",
  "minimum",
  "multipleOf",
  "not",
  "oneOf",
  "pattern",
  "patternProperties",
  "properties",
  "propertyNames",
  "readOnly",
  "required",
  "then",
  "title",
  "type",
  "uniqueItems",
  "writeOnly",
]);
// A typo has to be close to a real keyword to be worth guessing at.
const MAX_KEYWORD_EDITS = 2;

function editDistance(a: string, b: string): number {
  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const current = [i];
    for (let j = 1; j <= b.length; j++) {
      current[j] = Math.min(
        previous[j] + 1,
        current[j - 1] + 1,
        previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    previous = current;
  }
  return previous[b.length];
}

/** The keyword an unrecognised key was most likely meant to be, if any is close. */
function nearestKeyword(key: string): string | null {
  const lower = key.toLowerCase();
  let best: string | null = null;
  let bestDistance = MAX_KEYWORD_EDITS + 1;
  for (const keyword of JSON_SCHEMA_KEYWORDS) {
    const distance = editDistance(lower, keyword.toLowerCase());
    if (distance < bestDistance) {
      best = keyword;
      bestDistance = distance;
    }
  }
  return bestDistance <= MAX_KEYWORD_EDITS ? best : null;
}
// Top-level names Song's meta-schema rejects outright; its base schema owns them.
const RESERVED_TOP_LEVEL = new Set([
  "studyId",
  "analysisState",
  "analysisType",
  "analysisTypeId",
  "files",
  "analysisId",
]);
// The only keys the meta-schema allows in the schema body.
const ALLOWED_SCHEMA_KEYS = new Set([
  "type",
  "definitions",
  "properties",
  "required",
]);
// The fields a registration request carries (RegisterAnalysisTypeRequest). Spring
// deserializes the body with unknown properties ignored, so anything else is
// dropped before Song sees it rather than rejected.
const ALLOWED_ENVELOPE_KEYS = new Set(["name", "schema", "options"]);
const NAME_PATTERN = /^[A-Za-z0-9._-]+$/;
const RESERVED_NAME = "registration";
// Guard rails for pathological or self-referential schemas.
const MAX_DEPTH = 8;
const MAX_GROUPS = 60;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function quoteList(values: string[]): string {
  return values.map((v) => `"${v}"`).join(", ");
}

function stringItems(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((v): v is string => typeof v === "string")
    : [];
}

function literal(value: unknown): string {
  return value === null ? "null" : String(value);
}

function joinValues(values: unknown[], limit = 4): string {
  const shown = values.slice(0, limit).map(literal).join(", ");
  return `${shown}${values.length > limit ? `, +${values.length - limit} more` : ""}`;
}

/* ── Plain-English constraint phrasing ──────────────────────────────────── */

function pluralize(count: number, unit: string): string {
  return `${count} ${unit}${count === 1 ? "" : "s"}`;
}

/** "exactly 2 items", "1 to 2 items", "at least 1 character". */
function countPhrase(min: unknown, max: unknown, unit: string): string | null {
  const hasMin = typeof min === "number";
  const hasMax = typeof max === "number";
  if (hasMin && hasMax) {
    return min === max
      ? `exactly ${pluralize(min, unit)}`
      : `${min} to ${pluralize(max, unit)}`;
  }
  if (hasMin) return `at least ${pluralize(min as number, unit)}`;
  if (hasMax) return `at most ${pluralize(max as number, unit)}`;
  return null;
}

/** "between 0 and 10", "minimum 0", "maximum 10". */
function numberPhrase(min: unknown, max: unknown): string | null {
  const hasMin = typeof min === "number";
  const hasMax = typeof max === "number";
  if (hasMin && hasMax) return `between ${min} and ${max}`;
  if (hasMin) return `minimum ${min}`;
  if (hasMax) return `maximum ${max}`;
  return null;
}

function nameList(names: string[]): string {
  return names.join(", ");
}

/* ── $ref resolution and composition ────────────────────────────────────── */

interface BuildContext {
  /** The schema body, which owns `definitions`. */
  root: Record<string, unknown>;
  unresolved: Set<string>;
  groups: PreviewGroup[];
}

/** Resolves a local JSON pointer (`#/definitions/common/md5`) against the schema body. */
function resolvePointer(
  root: Record<string, unknown>,
  ref: string,
): Record<string, unknown> | null {
  if (!ref.startsWith("#/")) return null;
  let node: unknown = root;
  for (const rawSegment of ref.slice(2).split("/")) {
    const segment = rawSegment.replace(/~1/g, "/").replace(/~0/g, "~");
    if (!isPlainObject(node) || !(segment in node)) return null;
    node = node[segment];
  }
  return isPlainObject(node) ? node : null;
}

/** A schema with its `$ref` targets and `allOf` members folded in. */
interface Flattened {
  /** Keywords other than properties/required/$ref/allOf, nearest definition winning. */
  keywords: Record<string, unknown>;
  properties: Record<string, unknown>;
  required: Set<string>;
  /** Pointers this schema composed itself from, for the preview to show. */
  refs: string[];
}

function flatten(def: Record<string, unknown>, ctx: BuildContext): Flattened {
  const keywords: Record<string, unknown> = {};
  const properties: Record<string, unknown> = {};
  const required = new Set<string>();
  const refs: string[] = [];
  const seen = new Set<string>();

  const absorb = (node: Record<string, unknown>): void => {
    for (const [key, value] of Object.entries(node)) {
      if (
        key === "properties" ||
        key === "required" ||
        key === "$ref" ||
        key === "allOf"
      )
        continue;
      if (!(key in keywords)) keywords[key] = value;
    }
    if (isPlainObject(node.properties)) {
      for (const [key, value] of Object.entries(node.properties)) {
        if (!(key in properties)) properties[key] = value;
      }
    }
    for (const name of stringItems(node.required)) required.add(name);

    if (typeof node.$ref === "string") {
      refs.push(node.$ref);
      if (!seen.has(node.$ref)) {
        seen.add(node.$ref);
        const target = resolvePointer(ctx.root, node.$ref);
        if (target) absorb(target);
        else ctx.unresolved.add(node.$ref);
      }
    }
    // Song's base schema composes with `allOf: [{ "$ref": ... }]` alongside
    // its own properties, so members are merged rather than listed.
    if (Array.isArray(node.allOf)) {
      for (const member of node.allOf) {
        if (isPlainObject(member)) absorb(member);
      }
    }
  };

  absorb(def);
  return { keywords, properties, required, refs };
}

/* ── Field and object descriptions ──────────────────────────────────────── */

function typeLabel(flat: Flattened): string {
  const t = flat.keywords.type;
  if (Array.isArray(t)) return t.map(literal).join(" | ");
  if (typeof t === "string") return t;
  if (Array.isArray(flat.keywords.enum)) return "enum";
  if (Object.keys(flat.properties).length > 0) return "object";
  if (isPlainObject(flat.keywords.items)) return "array";
  return "—";
}

/** Labels one branch of a `oneOf`/`anyOf` compactly, e.g. `null` or `string`. */
function branchLabel(branch: unknown): string {
  if (!isPlainObject(branch)) return String(branch);
  if (branch.const !== undefined) return literal(branch.const);
  if (typeof branch.$ref === "string") return branch.$ref;
  if (Array.isArray(branch.enum)) return `one of ${joinValues(branch.enum, 3)}`;
  if (typeof branch.type === "string") return branch.type;
  if (Array.isArray(branch.type)) return branch.type.map(literal).join(" | ");
  if (typeof branch.pattern === "string") return `pattern ${branch.pattern}`;
  return "schema";
}

/** The parts of a field's definition the table lays out separately. */
interface FieldDescription {
  description: string;
  enumValues: string[] | null;
  pattern: string | null;
  details: string;
}

function describeField(flat: Flattened, ctx: BuildContext): FieldDescription {
  const parts: string[] = [];
  const kw = flat.keywords;

  // `"not": {}` is how Song's base schema forbids a property outright.
  if (isPlainObject(kw.not) && Object.keys(kw.not).length === 0)
    parts.push("forbidden");
  if (kw.const !== undefined) parts.push(`always ${literal(kw.const)}`);
  if (typeof kw.format === "string") parts.push(`format ${kw.format}`);

  const length = countPhrase(kw.minLength, kw.maxLength, "character");
  if (length) parts.push(length);
  const range = numberPhrase(kw.minimum, kw.maximum);
  if (range) parts.push(range);
  const items = countPhrase(kw.minItems, kw.maxItems, "item");
  if (items) parts.push(items);
  if (kw.uniqueItems === true) parts.push("no duplicate items");

  // A scalar array: the item shape belongs on this row, since it gets no table.
  if (isPlainObject(kw.items)) {
    const itemFlat = flatten(kw.items, ctx);
    if (Object.keys(itemFlat.properties).length === 0) {
      const label = typeLabel(itemFlat);
      if (label !== "—") parts.push(`of ${label}`);
      if (Array.isArray(itemFlat.keywords.enum)) {
        parts.push(`each item one of ${joinValues(itemFlat.keywords.enum)}`);
      }
      if (typeof itemFlat.keywords.pattern === "string") {
        parts.push(`each item matches ${itemFlat.keywords.pattern}`);
      }
    }
  }

  for (const key of ["oneOf", "anyOf"] as const) {
    const branches = kw[key];
    if (Array.isArray(branches)) {
      const label = key === "oneOf" ? "exactly one of" : "any of";
      parts.push(`${label}: ${branches.map(branchLabel).join(" | ")}`);
    }
  }
  if (flat.refs.length > 0) parts.push(`reuses ${flat.refs.join(", ")}`);

  return {
    description: typeof kw.description === "string" ? kw.description : "",
    enumValues: Array.isArray(kw.enum) ? kw.enum.map(literal) : null,
    pattern: typeof kw.pattern === "string" ? kw.pattern : null,
    details: parts.join(" · "),
  };
}

/** Key-level and whole-object constraints, shown above the object's table. */
function describeObject(flat: Flattened, ctx: BuildContext): string[] {
  const notes: string[] = [];
  const kw = flat.keywords;

  if (isPlainObject(kw.propertyNames)) {
    const names = kw.propertyNames;
    if (Array.isArray(names.enum))
      notes.push(`allowed keys: ${names.enum.map(literal).join(", ")}`);
    if (typeof names.pattern === "string")
      notes.push(`keys must match ${names.pattern}`);
  }
  if (kw.additionalProperties === false)
    notes.push("no keys beyond those listed");
  if (isPlainObject(kw.additionalProperties)) {
    notes.push(
      `any other key must be ${typeLabel(flatten(kw.additionalProperties, ctx))}`,
    );
  }
  if (isPlainObject(kw.patternProperties)) {
    for (const [pattern, sub] of Object.entries(kw.patternProperties)) {
      const label = isPlainObject(sub) ? typeLabel(flatten(sub, ctx)) : "—";
      notes.push(`keys matching ${pattern}: ${label}`);
    }
  }
  const keyCount = countPhrase(kw.minProperties, kw.maxProperties, "key");
  if (keyCount) notes.push(keyCount);
  const items = countPhrase(kw.minItems, kw.maxItems, "item");
  if (items) notes.push(items);
  if (kw.uniqueItems === true) notes.push("no duplicate items");
  if (flat.refs.length > 0) notes.push(`composed from ${flat.refs.join(", ")}`);
  return notes;
}

/* ── Conditionals ───────────────────────────────────────────────────────── */

/** One leaf of an `if` clause, in the form each branch needs to state it. */
interface Condition {
  positive: string;
  negative: string;
}

/** A rule, and the fields it makes required, so those rows can be marked. */
interface ConditionEntry {
  line: string;
  requires: string[];
}

/**
 * Reads an `if` clause as readable conditions. Song's base schema nests the
 * clause through intermediate objects (`specimen.tumourNormalDesignation`), so
 * this walks down to the constrained leaf and reports the dotted path.
 */
function conditionParts(
  node: Record<string, unknown>,
  prefix: string,
  out: Condition[],
): void {
  if (isPlainObject(node.properties)) {
    for (const [key, cond] of Object.entries(node.properties)) {
      if (!isPlainObject(cond)) continue;
      const path = prefix ? `${prefix}.${key}` : key;
      if (cond.const !== undefined) {
        out.push({
          positive: `${path} is ${literal(cond.const)}`,
          negative: `${path} is not ${literal(cond.const)}`,
        });
      } else if (Array.isArray(cond.enum)) {
        const values = joinValues(cond.enum, 3);
        out.push({
          positive: `${path} is one of ${values}`,
          negative: `${path} is none of ${values}`,
        });
      } else if (typeof cond.pattern === "string") {
        out.push({
          positive: `${path} matches ${cond.pattern}`,
          negative: `${path} does not match ${cond.pattern}`,
        });
      } else if (isPlainObject(cond.properties)) {
        conditionParts(cond, path, out);
      } else {
        out.push({
          positive: `${path} is set`,
          negative: `${path} is not set`,
        });
      }
    }
  }
  for (const name of stringItems(node.required)) {
    out.push({ positive: `${name} is present`, negative: `${name} is absent` });
  }
}

/** What a `then`/`else` branch demands, and which fields it requires. */
interface BranchDemands {
  text: string;
  required: string[];
}

/**
 * Reads a `then`/`else` branch as what it demands of a submission. A property
 * that is both required and constrained is reported once, with its constraint.
 */
function branchDemands(node: Record<string, unknown>): BranchDemands {
  const constraints = new Map<string, string>();
  if (isPlainObject(node.properties)) {
    for (const [key, sub] of Object.entries(node.properties)) {
      if (!isPlainObject(sub)) continue;
      let label = "";
      if (sub.const !== undefined) label = `must be ${literal(sub.const)}`;
      else if (Array.isArray(sub.enum))
        label = `one of ${joinValues(sub.enum, 3)}`;
      else if (Array.isArray(sub.oneOf))
        label = sub.oneOf.map(branchLabel).join(" | ");
      else if (typeof sub.pattern === "string")
        label = `matches ${sub.pattern}`;
      else if (typeof sub.$ref === "string") label = `reuses ${sub.$ref}`;
      if (label) constraints.set(key, label);
    }
  }

  const parts: string[] = [];
  const required = stringItems(node.required);
  if (required.length > 0) {
    const named = required.map((name) => {
      const constraint = constraints.get(name);
      constraints.delete(name);
      return constraint ? `${name} (${constraint})` : name;
    });
    parts.push(`requires ${nameList(named)}`);
  }
  for (const [key, label] of constraints) parts.push(`${key} ${label}`);
  return { text: parts.join("; "), required };
}

function collectConditions(
  def: Record<string, unknown>,
  when: string[],
  depth: number,
  out: ConditionEntry[],
): void {
  if (depth > MAX_DEPTH) return;

  if (
    isPlainObject(def.if) &&
    (isPlainObject(def.then) || isPlainObject(def.else))
  ) {
    const parts: Condition[] = [];
    conditionParts(def.if, "", parts);
    const positive =
      parts.map((p) => p.positive).join(" and ") || "the if clause matches";
    // Negating several conditions at once is "not all of them hold", which is
    // only worth spelling out per-condition when there is exactly one.
    const negative =
      parts.length === 1 ? parts[0].negative : `not all of (${positive})`;

    if (isPlainObject(def.then)) {
      const demands = branchDemands(def.then);
      if (demands.text) {
        out.push({
          line: `when ${[...when, positive].join(" and ")}: ${demands.text}`,
          requires: demands.required,
        });
      }
      collectConditions(def.then, [...when, positive], depth + 1, out);
    }
    if (isPlainObject(def.else)) {
      const demands = branchDemands(def.else);
      if (demands.text) {
        out.push({
          line: `when ${[...when, negative].join(" and ")}: ${demands.text}`,
          requires: demands.required,
        });
      }
      collectConditions(def.else, [...when, negative], depth + 1, out);
    }
  }

  // Draft-07 `dependencies`: array form names properties, schema form carries its own required.
  if (isPlainObject(def.dependencies)) {
    for (const [key, dependency] of Object.entries(def.dependencies)) {
      const names = Array.isArray(dependency)
        ? stringItems(dependency)
        : isPlainObject(dependency)
          ? stringItems(dependency.required)
          : [];
      if (names.length > 0) {
        out.push({
          line: `when ${key} is present: requires ${nameList(names)}`,
          requires: names,
        });
      }
    }
  }
}

/* ── Group building ─────────────────────────────────────────────────────── */

/** Collapses a table whose every row only points at another table. */
function summarize(fields: PreviewField[]): string | null {
  if (fields.length === 0 || !fields.every((f) => f.childPath)) return null;

  const parts: string[] = [];
  const required = fields
    .filter((f) => f.requirement === "required")
    .map((f) => f.name);
  const conditional = fields
    .filter((f) => f.requirement === "conditional")
    .map((f) => f.name);
  const optional = fields
    .filter((f) => f.requirement === "optional")
    .map((f) => f.name);
  if (required.length > 0) parts.push(`Requires ${nameList(required)}`);
  if (conditional.length > 0)
    parts.push(`Conditionally requires ${nameList(conditional)}`);
  if (optional.length > 0) parts.push(`Optional: ${nameList(optional)}`);
  return `${parts.join(". ")}. Each has its own table below.`;
}

/** How a group announces itself above its table. */
interface GroupLabel {
  path: string;
  title: string;
  prefix: string;
  kind: string;
  required: boolean;
}

function addGroup(
  def: Record<string, unknown>,
  ctx: BuildContext,
  label: GroupLabel,
  depth: number,
): void {
  if (ctx.groups.length >= MAX_GROUPS) return;

  const flat = flatten(def, ctx);
  const entries: ConditionEntry[] = [];
  collectConditions(flat.keywords, [], 0, entries);

  // A field a conditional makes required reads as conditional, not optional.
  const conditionalRules = new Map<string, string>();
  for (const entry of entries) {
    for (const name of entry.requires) {
      if (!conditionalRules.has(name)) conditionalRules.set(name, entry.line);
    }
  }

  const group: PreviewGroup = {
    ...label,
    depth,
    // Annotations are allowed inside a property but not in the schema body, so
    // showing one at the root would imply support the meta-schema denies; the
    // allowed-keys error covers that case instead.
    description:
      depth > 0 && typeof flat.keywords.description === "string"
        ? flat.keywords.description
        : "",
    notes: describeObject(flat, ctx),
    conditions: entries.map((e) => e.line),
    fields: [],
    summary: null,
  };
  ctx.groups.push(group);

  // Children are queued and expanded after this group, so a table is always
  // followed by the tables it points at.
  const children: { def: Record<string, unknown>; label: GroupLabel }[] = [];

  for (const [key, rawField] of Object.entries(flat.properties)) {
    const requirement: Requirement = flat.required.has(key)
      ? "required"
      : conditionalRules.has(key)
        ? "conditional"
        : "optional";
    const rule =
      requirement === "conditional"
        ? (conditionalRules.get(key) ?? null)
        : null;

    const fieldDef = isPlainObject(rawField) ? rawField : null;
    if (!fieldDef) {
      group.fields.push({
        name: key,
        type: "—",
        requirement,
        rule,
        description: "",
        enumValues: null,
        pattern: null,
        details: "",
        childPath: null,
      });
      continue;
    }

    const fieldFlat = flatten(fieldDef, ctx);
    const fieldPath = label.path ? `${label.path}.${key}` : key;
    let childPath: string | null = null;

    if (depth < MAX_DEPTH) {
      if (Object.keys(fieldFlat.properties).length > 0) {
        childPath = fieldPath;
        children.push({
          def: fieldDef,
          label: {
            path: fieldPath,
            title: fieldPath,
            prefix: "",
            kind: "",
            required: requirement === "required",
          },
        });
      } else if (isPlainObject(fieldFlat.keywords.items)) {
        const items = fieldFlat.keywords.items;
        if (Object.keys(flatten(items, ctx).properties).length > 0) {
          childPath = `${fieldPath}.items`;
          // The item shape is not a field, so it carries no required badge; the
          // array's own row states whether the array is required and how many
          // items it may hold.
          children.push({
            def: items,
            label: {
              path: childPath,
              title: fieldPath,
              prefix: "each item in",
              kind: "",
              required: false,
            },
          });
        }
      }
    }

    const described = describeField(fieldFlat, ctx);
    group.fields.push({
      name: key,
      type: typeLabel(fieldFlat),
      requirement,
      rule,
      description: described.description,
      enumValues: described.enumValues,
      pattern: described.pattern,
      details: described.details,
      childPath,
    });
  }

  // Only the analysis type collapses this way: its objects each get their own
  // section below, whereas a deeper object's fields open inline in its row, so
  // collapsing one of those would hide the only way in.
  group.summary = depth === 0 ? summarize(group.fields) : null;

  for (const child of children) {
    addGroup(child.def, ctx, child.label, depth + 1);
  }
}

function buildPreview(
  name: unknown,
  schema: Record<string, unknown>,
  unresolved: Set<string>,
): PreviewSchema {
  const ctx: BuildContext = { root: schema, unresolved, groups: [] };
  const title = typeof name === "string" && name.trim() ? name : "(unnamed)";
  addGroup(
    schema,
    ctx,
    { path: "", title, prefix: "", kind: "analysis type", required: false },
    0,
  );
  return { name: typeof name === "string" ? name : "", groups: ctx.groups };
}

/* ── Structural warnings ────────────────────────────────────────────────── */

/**
 * Every property name a conditional demands, from nested `then`/`else` branches
 * and `dependencies`. A name required this way but absent from `properties` is
 * accepted by Song and enforced for presence only, with its value unconstrained,
 * which is usually an oversight rather than an intent.
 */
function conditionalRequirements(
  def: Record<string, unknown>,
  depth: number,
  out: Set<string>,
): void {
  if (depth > MAX_DEPTH) return;
  for (const key of ["then", "else"] as const) {
    const branch = def[key];
    if (!isPlainObject(branch)) continue;
    for (const name of stringItems(branch.required)) out.add(name);
    conditionalRequirements(branch, depth + 1, out);
  }
  if (isPlainObject(def.dependencies)) {
    for (const dependency of Object.values(def.dependencies)) {
      const names = Array.isArray(dependency)
        ? stringItems(dependency)
        : isPlainObject(dependency)
          ? stringItems(dependency.required)
          : [];
      for (const name of names) out.add(name);
    }
  }
}

/**
 * Walks the literal property tree collecting structural warnings. Song builds
 * the inner JSON Schema itself and is the authority on it, so these stay
 * warnings: the pattern check in particular runs a JavaScript regex against a
 * schema Song compiles with Java, and the two dialects do not agree on every
 * pattern.
 */
function collectWarnings(
  properties: Record<string, unknown>,
  prefix: string,
  basePath: (string | number)[],
  warnings: Issue[],
  depth: number,
  /** Paths already reported as errors, so one defect is not listed twice. */
  reported: Set<string>,
): void {
  for (const [key, def] of Object.entries(properties)) {
    const path = `${prefix}${key}`;
    const jsonPath = [...basePath, key];
    if (!isPlainObject(def)) {
      if (!reported.has(path))
        warnings.push(at(jsonPath, `property "${path}" should be an object.`));
      continue;
    }

    const types = Array.isArray(def.type)
      ? def.type
      : def.type != null
        ? [def.type]
        : [];
    for (const t of types) {
      if (!KNOWN_TYPE_SET.has(t as string)) {
        warnings.push(
          at(
            [...jsonPath, "type"],
            `property "${path}": unknown type "${String(t)}"; use ${KNOWN_TYPE_LIST}, or an array of those.`,
          ),
        );
      }
    }
    if ("enum" in def && !Array.isArray(def.enum)) {
      warnings.push(
        at(
          [...jsonPath, "enum"],
          `property "${path}": enum should be an array of allowed values.`,
        ),
      );
    }
    if (typeof def.pattern === "string") {
      try {
        new RegExp(def.pattern);
      } catch {
        warnings.push(
          at(
            [...jsonPath, "pattern"],
            `property "${path}": pattern is not a valid regular expression.`,
          ),
        );
      }
    }
    for (const numKey of [
      "minItems",
      "maxItems",
      "minimum",
      "maximum",
    ] as const) {
      if (numKey in def && typeof def[numKey] !== "number") {
        warnings.push(
          at(
            [...jsonPath, numKey],
            `property "${path}": ${numKey} should be a number.`,
          ),
        );
      }
    }

    // JSON Schema ignores keywords it does not recognise, and so does Song, so a
    // misspelled one is accepted and silently does nothing. `x-` keys are the
    // conventional escape hatch for deliberate extensions, so they pass.
    for (const keyword of Object.keys(def)) {
      if (JSON_SCHEMA_KEYWORDS.has(keyword) || keyword.startsWith("x-")) continue;
      const suggestion = nearestKeyword(keyword);
      warnings.push(
        at(
          [...jsonPath, keyword],
          `property "${path}": "${keyword}" is not a JSON Schema keyword${
            suggestion ? `; did you mean "${suggestion}"?` : "."
          }`,
        ),
      );
    }

    if (depth >= MAX_DEPTH) continue;

    // Checked whether or not `properties` is present: a required field is
    // unconstrained either way, and a typo in the keyword lands here.
    const defined = isPlainObject(def.properties) ? def.properties : null;
    const required = stringItems(def.required);
    if (defined === null) {
      if (required.length > 0) {
        warnings.push(
          at(
            [...jsonPath, "required"],
            `"${path}" requires ${quoteList(required)} but defines no properties.`,
          ),
        );
      }
    } else {
      required.forEach((name, i) => {
        if (!(name in defined)) {
          warnings.push(
            at(
              [...jsonPath, "required", i],
              `"${path}" requires "${name}", which it does not define in properties.`,
            ),
          );
        }
      });
    }

    const conditional = new Set<string>();
    conditionalRequirements(def, 0, conditional);
    const undeclared = Array.from(conditional).filter(
      (name) => defined === null || !(name in defined),
    );
    if (undeclared.length > 0) {
      warnings.push(
        at(
          [...jsonPath, "then"],
          `"${path}" conditionally requires ${quoteList(undeclared)}, which it does not define in properties.`,
        ),
      );
    }

    if (defined !== null) {
      collectWarnings(
        defined,
        `${path}.`,
        [...jsonPath, "properties"],
        warnings,
        depth + 1,
        reported,
      );
    } else if (
      isPlainObject(def.items) &&
      isPlainObject(def.items.properties)
    ) {
      collectWarnings(
        def.items.properties,
        `${path}.items.`,
        [...jsonPath, "items", "properties"],
        warnings,
        depth + 2,
        reported,
      );
    }
  }
}

function fail(
  message: string,
  path: (string | number)[] = [],
): SongValidationResult {
  return {
    status: "error",
    errors: [at(path, message)],
    warnings: [],
    preview: null,
  };
}

export function validateSongSchema(text: string): SongValidationResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch (e) {
    return fail(
      `JSON syntax error: ${e instanceof Error ? e.message : String(e)}`,
    );
  }

  if (!isPlainObject(parsed)) {
    return fail(
      'Top-level value must be a JSON object with "name" and "schema".',
    );
  }
  if (!isPlainObject(parsed.schema)) {
    return fail(
      'Missing "schema": a Song schema wraps its definition in a "schema" object.',
      BODY,
    );
  }
  const schema = parsed.schema;
  if (!isPlainObject(schema.properties)) {
    return fail(
      "schema.properties must be an object with at least one property.",
      PROPS,
    );
  }

  const properties = schema.properties;
  const errors: Issue[] = [];
  const warnings: Issue[] = [];

  // Envelope: Song registers the schema under this name.
  if (typeof parsed.name !== "string" || !parsed.name.trim()) {
    errors.push(
      at(
        ["name"],
        'Missing "name": Song registers the analysis type under this name.',
      ),
    );
  } else if (!NAME_PATTERN.test(parsed.name)) {
    errors.push(
      at(
        ["name"],
        `name "${parsed.name}": use only letters, numbers, dots, hyphens, and underscores.`,
      ),
    );
  } else if (parsed.name === RESERVED_NAME) {
    errors.push(
      at(
        ["name"],
        `name "${RESERVED_NAME}" is reserved by Song's registration endpoint; choose another name.`,
      ),
    );
  }

  for (const key of Object.keys(parsed).filter(
    (k) => !ALLOWED_ENVELOPE_KEYS.has(k),
  )) {
    warnings.push(
      at(
        [key],
        `"${key}" is not part of a registration request, which carries name, schema, and options.`,
      ),
    );
  }

  // Schema body: the meta-schema allows no keys beyond these four.
  for (const key of Object.keys(schema).filter(
    (k) => !ALLOWED_SCHEMA_KEYS.has(k),
  )) {
    errors.push(
      at(
        [...BODY, key],
        `"${key}" is not allowed in the schema body, which may only contain type, definitions, properties, and required.`,
      ),
    );
  }
  if (schema.type !== "object") {
    errors.push(
      at(
        "type" in schema ? [...BODY, "type"] : BODY,
        'schema.type must be "object".',
      ),
    );
  }
  if (Object.keys(properties).length === 0) {
    warnings.push(
      at(PROPS, "schema.properties is empty; add at least one property."),
    );
  }

  // required: an array of unique strings, naming properties that exist.
  if ("required" in schema) {
    const requiredPath = [...BODY, "required"];
    if (!Array.isArray(schema.required)) {
      errors.push(
        at(requiredPath, "schema.required must be an array of property names."),
      );
    } else {
      const required = stringItems(schema.required);
      if (required.length !== schema.required.length) {
        errors.push(
          at(requiredPath, "schema.required must contain only strings."),
        );
      }
      const repeated = Array.from(
        new Set(required.filter((r, i) => required.indexOf(r) !== i)),
      );
      if (repeated.length > 0) {
        errors.push(
          at(
            requiredPath,
            `schema.required repeats ${quoteList(repeated)}; its entries must be unique.`,
          ),
        );
      }
      required.forEach((name, i) => {
        if (!(name in properties)) {
          warnings.push(
            at(
              [...requiredPath, i],
              `required lists "${name}", which is not defined in properties.`,
            ),
          );
        }
      });
    }
  }

  // Top-level properties: Song's base schema owns these names.
  const reserved = Object.keys(properties).filter((key) =>
    RESERVED_TOP_LEVEL.has(key),
  );
  for (const key of reserved) {
    errors.push(
      at(
        [...PROPS, key],
        `"${key}" belongs to Song's base schema and cannot be redefined at the top level.`,
      ),
    );
  }
  const reported = new Set(reserved);
  if ("experiment" in properties && !isPlainObject(properties.experiment)) {
    errors.push(
      at(
        [...PROPS, "experiment"],
        '"experiment" must be an object.',
      ),
    );
    reported.add("experiment");
  }

  collectWarnings(properties, "", PROPS, warnings, 0, reported);

  // Song compiles the schema after the meta-schema check, so a pointer that
  // resolves to nothing fails the registration too.
  const unresolved = new Set<string>();
  const preview = buildPreview(parsed.name, schema, unresolved);
  if (unresolved.size > 0) {
    // The fix belongs under `definitions`, so that is where this points.
    errors.push(
      at(
        "definitions" in schema ? [...BODY, "definitions"] : BODY,
        `unresolved $ref: ${quoteList(Array.from(unresolved))}; add it under "definitions".`,
      ),
    );
  }

  const status =
    errors.length > 0 ? "error" : warnings.length > 0 ? "warning" : "valid";
  return { status, errors, warnings, preview };
}
