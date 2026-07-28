// Starter and demo Song schemas for the embedded Song Schema Playground.
// The demo exercises the features the guide documents: nested objects,
// enum, pattern, required, arrays with minItems/maxItems, if/then, and
// numeric minimum. Pure data, no runtime dependencies.

export const STARTER_TEMPLATE = JSON.stringify(
	{
		name: 'exampleAnalysis',
		schema: {
			type: 'object',
			required: ['experiment'],
			properties: {
				experiment: {
					type: 'object',
					required: ['experimentType'],
					properties: {
						experimentType: {
							type: 'string',
							enum: ['WGS', 'WXS', 'RNA-Seq'],
						},
						platform: {
							type: 'string',
						},
					},
				},
			},
		},
	},
	null,
	2,
);

export const DEMO_TEMPLATE = JSON.stringify(
	{
		name: 'sequencingExperiment',
		schema: {
			type: 'object',
			required: ['workflow', 'experiment', 'donor'],
			properties: {
				workflow: {
					type: 'object',
					required: ['workflowName', 'genomeBuild', 'inputs'],
					properties: {
						workflowName: {
							type: 'string',
							pattern: '^[a-zA-Z][a-zA-Z0-9 _\\-]+[a-zA-Z0-9]+$',
						},
						workflowVersion: {
							type: 'string',
						},
						genomeBuild: {
							type: 'string',
							enum: ['GRCh37', 'GRCh38_hla_decoy_ebv', 'GRCh38_Verily_v1'],
						},
						inputs: {
							type: 'array',
							minItems: 1,
							maxItems: 2,
							items: {
								type: 'object',
								properties: {
									analysisType: { type: 'string' },
									tumourAnalysisId: {
										type: 'string',
										pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{13}$',
									},
								},
							},
						},
					},
				},
				experiment: {
					type: 'object',
					required: ['experimentType'],
					properties: {
						experimentType: {
							type: 'string',
							enum: ['WGS', 'WXS', 'RNA-Seq'],
						},
						sequencingCenter: { type: 'string' },
					},
				},
				donor: {
					type: 'object',
					required: ['submitterDonorId', 'vitalStatus'],
					properties: {
						submitterDonorId: {
							type: 'string',
							pattern: '^DO-[0-9]+$',
						},
						vitalStatus: {
							type: 'string',
							enum: ['Alive', 'Deceased'],
						},
						treatmentDuration: {
							type: 'integer',
							minimum: 0,
						},
						relapseType: {
							type: ['string', 'null'],
							enum: ['Distant recurrence/metastasis', 'Local recurrence', 'Progression (liquid tumours)', null],
						},
					},
					if: {
						properties: { vitalStatus: { const: 'Deceased' } },
					},
					then: {
						required: ['causeOfDeath', 'survivalTime'],
					},
				},
			},
		},
	},
	null,
	2,
);
