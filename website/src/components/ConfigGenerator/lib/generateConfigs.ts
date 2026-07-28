// Client-side orchestrator for the Config Generator.
//
// Ports the logic of the Prelude stage app's Next.js `/api/generate-configs`
// route into a pure, synchronous browser function. Every step below is a pure
// transform (no filesystem, network, or logger), so the whole thing runs
// entirely client-side — the hard requirement for the embedded playgrounds.

import { parseCsv } from './csvParser';
import { generateArrangerConfigs } from './generateArrangerConfigs';
import { generateEsMapping } from './generateEsMapping';
import { generateLecternDictionary } from './generateLecternDictionary';
import { generatePostgresSql } from './generatePostgresTable';

export interface GeneratedConfigs {
	postgresSql: string;
	lecternDictionary: object;
	esMapping: object;
	arrangerBase: object;
	arrangerExtended: object;
	arrangerTable: object;
	arrangerFacets: object;
}

/**
 * Generate all base configs from CSV content.
 *
 * @throws Error with a human-readable message when the input is empty or the
 *         CSV headers cannot be parsed — callers should surface `.message`.
 */
export function generateConfigs(csvContent: string, indexName: string, tableName: string): GeneratedConfigs {
	if (!csvContent?.trim()) {
		throw new Error('CSV content is required');
	}
	if (!indexName?.trim()) {
		throw new Error('Index name is required');
	}

	const csv = parseCsv(csvContent);
	if (csv.headers.length === 0) {
		throw new Error('Could not parse CSV headers');
	}

	const schemaName = tableName?.trim() || indexName;
	const esMapping = generateEsMapping(csv, indexName);
	const { base, extended, table, facets } = generateArrangerConfigs(esMapping, indexName);
	const postgresSql = generatePostgresSql(csv, schemaName);
	const lecternDictionary = generateLecternDictionary(csv, schemaName, indexName);

	return {
		postgresSql,
		lecternDictionary,
		esMapping,
		arrangerBase: base,
		arrangerExtended: extended,
		arrangerTable: table,
		arrangerFacets: facets,
	};
}
