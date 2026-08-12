// The shape `data/components.ts` § `groups` only ever explained in prose:
// distributed metadata becomes one index, the index becomes a search API, the
// API becomes a portal. StackDiagram.tsx draws it; this file is the edges and
// the layout, kept out of the component for the same reason
// `data/heroDiagram.ts`'s positions are: a visual call belongs somewhere a
// person can nudge it without touching a component.
//
// Coordinates are a 0-100 x/y space (not pixels), stretched to fill
// StackDiagram's own container by an SVG viewBox of the same span. Node
// cards are positioned by the same percentages, so both layers move
// together regardless of the container's actual size. See
// .dev/products-diagram-plan.md for the shape this was planned against.
//
// Two edges the plan flagged as inferred rather than sourced are resolved
// here, checked against the submodules' own docs 2026-08-11 rather than left
// open:
//   - Lectern feeding Song as well as Lyric: no. Lectern's own docs
//     (`lectern/docs/01-overview.md`) name only Lyric as what it "typically
//     works with" for submission validation; Song's README lists Lectern
//     only in its general related-projects table, the same table every
//     component appears in, not a validation dependency.
//   - Score sitting downstream of Song or beside it: downstream. Score's own
//     docs (`score/docs/overview.md`, `score/docs/setup.md`) describe Song as
//     managing "metadata for files stored by Score" and require Song running
//     for Score's own dev stack, i.e. Song catalogs a file before Score
//     moves its bytes, matching the plan's original edge.
import { components, type OvertureComponent } from "./components";

export type FlowNodeId = OvertureComponent["id"];

export type FlowNode = {
  id: FlowNodeId;
  /** 0-100, left to right. */
  x: number;
  /** 0-100, top to bottom. */
  y: number;
};

/**
 * Seven nodes on two lanes: a top lane carrying the single path from
 * dictionary to portal, and a bottom lane for the two components that feed
 * it — Song feeds both Maestro and Score, so it sits under Lyric rather than
 * in the top lane itself. Control is not a node here; it is the band
 * StackDiagram draws around all seven, matching how `data/components.ts`'s
 * own Control group blurb describes it.
 */
export const flowNodes: FlowNode[] = [
  { id: "lectern", x: 10, y: 30 },
  { id: "lyric", x: 32, y: 30 },
  { id: "maestro", x: 50, y: 30 },
  { id: "arranger", x: 80, y: 30 },
  { id: "stage", x: 98, y: 30 },
  { id: "song", x: 10, y: 74 },
  { id: "score", x: 32, y: 74 },
];

/**
 * The same seven nodes, laid out top to bottom for narrow viewports instead
 * of left to right: `flowNodes`' fixed-width cards can't shrink to fit a
 * phone screen without the labels becoming unreadable (see
 * .dev/products-diagram-plan.md § Mobile — checked against a real 375px
 * screenshot before this was written, not decided in the abstract), so the
 * two lanes rotate from top/bottom into left/right instead, and the whole
 * flow reads down the page rather than across it. Every node and edge below
 * `mobile` still exists; StackDiagram renders both layouts and CSS shows
 * whichever one applies.
 */
export const flowNodesMobile: FlowNode[] = [
  { id: "lectern", x: 27, y: 16 },
  { id: "song", x: 73, y: 16 },
  { id: "lyric", x: 27, y: 37 },
  { id: "score", x: 73, y: 37 },
  { id: "maestro", x: 50, y: 59 },
  { id: "arranger", x: 50, y: 80 },
  { id: "stage", x: 50, y: 97 },
];

export function flowNode(
  id: FlowNodeId,
  nodes: FlowNode[] = flowNodes,
): FlowNode {
  const node = nodes.find((candidate) => candidate.id === id);
  if (!node) {
    throw new Error(`componentFlow: no node for "${id}"`);
  }
  return node;
}

/**
 * The database backing three of the seven components, printed as a second
 * line on their own card rather than as separate nodes: each one is private
 * storage for its owner, not something anything downstream connects to, so
 * it isn't a step in the flow the way the search index below is. Sourced
 * from each component's own setup docs, checked 2026-08-11, not assumed from
 * what's typical for a service like it:
 *   - Lectern: `lectern/docs/02-Setup.md` — "Lectern requires a MongoDB
 *     database to store dictionaries and metadata."
 *   - Lyric: `lyric/docs/01-overview.md` — "PostgreSQL: the backing store
 *     for all submitted data and its audit history."
 *   - Song: `song/docs/00-overview.md` — "connects to Postgres DB for data
 *     storage."
 */
export type FlowStorage = { label: string; icon: string };

export const flowNodeStorage: Partial<Record<FlowNodeId, FlowStorage>> = {
  lectern: { label: "MongoDB", icon: "mongodb" },
  lyric: { label: "PostgreSQL", icon: "postgresql" },
  song: { label: "PostgreSQL", icon: "postgresql" },
};

/** The dashed band StackDiagram draws around every node, and where its own
 * "Control" tag sits on it — one pair per layout, since the band's shape
 * follows the nodes it encloses. Both in the same 0-100 space as the nodes
 * above. */
export const flowBand = { x: 2, y: 14, width: 96, height: 68, rx: 10 };
export const flowControlLabel = { x: 54, y: 6 };

export const flowBandMobile = { x: 6, y: 8, width: 88, height: 92, rx: 10 };
export const flowControlLabelMobile = { x: 50, y: 3 };

/**
 * The one piece of infrastructure drawn as its own stop in the flow rather
 * than a line on a component's card, because it belongs to neither side of
 * it: the index Maestro builds and Arranger searches sits between them, not
 * inside either. Both halves of the label are sourced independently rather
 * than picked to match each other — Maestro's own docs
 * (`maestro/docs/overview.md`) build "a single Elasticsearch index" and say
 * nothing about OpenSearch; Arranger's (`arranger/docs/overview.md`) reads
 * "any properly structured OpenSearch or Elasticsearch index" and supports
 * both. Checked 2026-08-11.
 */
export const SEARCH_INDEX_ID = "search-index" as const;
export type FlowEndpointId = FlowNodeId | typeof SEARCH_INDEX_ID;

export type FlowAnnotation = {
  id: typeof SEARCH_INDEX_ID;
  label: string;
  /** Both marks shown, not one picked: see the sourcing note above. Keys
   * into `data/techIcons.ts`. */
  icons: string[];
  x: number;
  y: number;
};

export const flowSearchIndex: FlowAnnotation = {
  id: SEARCH_INDEX_ID,
  label: "OpenSearch / Elasticsearch",
  icons: ["opensearch", "elasticsearch"],
  x: 65,
  y: 30,
};

export const flowSearchIndexMobile: FlowAnnotation = {
  id: SEARCH_INDEX_ID,
  label: "OpenSearch / Elasticsearch",
  icons: ["opensearch", "elasticsearch"],
  x: 50,
  y: 69.5,
};

/** Either kind of point an edge can run between, resolved to plain x/y. */
export function flowPoint(
  id: FlowEndpointId,
  nodes: FlowNode[],
  searchIndex: FlowAnnotation,
): { x: number; y: number } {
  return id === SEARCH_INDEX_ID ? searchIndex : flowNode(id, nodes);
}

export type FlowEdge = { from: FlowEndpointId; to: FlowEndpointId };

/**
 * Every edge, as component ids from `data/components.ts` (plus the search
 * index above). Each one is a sentence in a component's own summary, not a
 * fact invented for the diagram — see the header comment above for the two
 * that needed checking beyond the summaries themselves.
 */
export const flowEdges: FlowEdge[] = [
  // Submissions are validated against a dictionary.
  { from: "lectern", to: "lyric" },
  // Tabular submissions and file metadata both feed the index.
  { from: "lyric", to: "maestro" },
  { from: "song", to: "maestro" },
  // File metadata is cataloged, then the bytes move.
  { from: "song", to: "score" },
  // The index becomes a search API.
  { from: "maestro", to: SEARCH_INDEX_ID },
  { from: SEARCH_INDEX_ID, to: "arranger" },
  // The API becomes a portal.
  { from: "arranger", to: "stage" },
];

/** All component ids the flow lays out, in the order they should render. */
export const flowComponents: OvertureComponent[] = flowNodes.map(
  (node) => components.find((c) => c.id === node.id)!,
);
