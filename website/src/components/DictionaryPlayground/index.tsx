/*
 * Public entry point for the embedded Dictionary Playground.
 *
 * The real component (Playground.tsx) pulls in CodeMirror and the Lectern UI
 * library, both of which touch `window`/`document` at module load. Docusaurus
 * statically renders pages in Node, so we defer the whole thing to the browser
 * with <BrowserOnly>: the `require('./Playground')` only runs client-side, so
 * none of those modules evaluate during SSR.
 */

import BrowserOnly from '@docusaurus/BrowserOnly';
import React, { ReactElement } from 'react';

const FALLBACK_HEIGHT = 'clamp(520px, 78vh, 720px)';

const DictionaryPlayground = (): ReactElement => (
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
				Loading the Dictionary Playground…
			</div>
		}
	>
		{() => {
			const Playground = require('./Playground').default;
			return <Playground />;
		}}
	</BrowserOnly>
);

export default DictionaryPlayground;
