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
					description: 'How the data was generated.',
					required: ['experimentType'],
					properties: {
						experimentType: {
							type: 'string',
							description: 'The sequencing strategy used.',
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
					description: 'The analysis workflow that produced the submitted files.',
					required: ['workflowName', 'genomeBuild', 'inputs'],
					properties: {
						workflowName: {
							type: 'string',
							description: 'Name of the workflow, as published by whoever maintains it.',
							pattern: '^[a-zA-Z][a-zA-Z0-9 _\\-]+[a-zA-Z0-9]+$',
						},
						workflowVersion: {
							type: 'string',
						},
						genomeBuild: {
							type: 'string',
							description: 'Reference genome the workflow aligned against.',
							enum: ['GRCh37', 'GRCh38_hla_decoy_ebv', 'GRCh38_Verily_v1'],
						},
						inputs: {
							type: 'array',
							description: 'The analyses this one was derived from.',
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
					description: 'How the data was generated.',
					required: ['experimentType'],
					properties: {
						experimentType: {
							type: 'string',
							description: 'The sequencing strategy used.',
							enum: ['WGS', 'WXS', 'RNA-Seq'],
						},
						sequencingCenter: { type: 'string' },
					},
				},
				donor: {
					type: 'object',
					description: 'The individual the biological material came from.',
					required: ['submitterDonorId', 'vitalStatus'],
					properties: {
						submitterDonorId: {
							type: 'string',
							description: 'Your own identifier for the donor. Song does not assign this.',
							pattern: '^DO-[0-9]+$',
						},
						vitalStatus: {
							type: 'string',
							description: 'Whether the donor was alive at last contact. Drives the conditional rule below.',
							enum: ['Alive', 'Deceased'],
						},
						treatmentDuration: {
							type: 'integer',
							description: 'Days of treatment received.',
							minimum: 0,
						},
						relapseType: {
							type: ['string', 'null'],
							enum: ['Distant recurrence/metastasis', 'Local recurrence', 'Progression (liquid tumours)', null],
						},
						// Defined so the conditional below constrains their values, not
						// just their presence: `required` alone accepts any value for a
						// property the schema never defines.
						causeOfDeath: {
							type: 'string',
							enum: ['Died of cancer', 'Died of other reasons', 'Unknown'],
						},
						survivalTime: {
							type: 'integer',
							description: 'Days from diagnosis to death. Required when the donor is deceased.',
							minimum: 0,
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
