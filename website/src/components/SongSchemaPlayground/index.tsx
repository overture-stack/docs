/*
 * Public entry point for the embedded Song Schema Playground.
 *
 * The real component (Playground.tsx) imports CodeMirror, which touches
 * `window` at module load. Docusaurus renders pages in Node, so we defer the
 * whole thing to the browser with <BrowserOnly>: `require('./Playground')` only
 * runs client-side, so CodeMirror never evaluates during SSR.
 */

import BrowserOnly from '@docusaurus/BrowserOnly';
import React, { ReactElement } from 'react';

const FALLBACK_HEIGHT = 'clamp(560px, 82vh, 760px)';

const SongSchemaPlayground = (): ReactElement => (
	<BrowserOnly
		fallback={
			<div
				style={{
					height: FALLBACK_HEIGHT,
					margin: '1.5rem 0',
					border: '1px solid var(--ifm-color-emphasis-300)',
					borderRadius: 8,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					color: 'var(--ifm-color-emphasis-600)',
					fontSize: 14,
				}}
			>
				Loading the Song Schema Playground…
			</div>
		}
	>
		{() => {
			const Playground = require('./Playground').default;
			return <Playground />;
		}}
	</BrowserOnly>
);

export default SongSchemaPlayground;
