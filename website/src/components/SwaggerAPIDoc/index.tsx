import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import styles from './swagger-overrides.module.css';
import songAPISpec from './songAPI.json';
import scoreAPISpec from './scoreAPI.json';
import maestroAPISpec from './maestroAPI.json';
import lyricAPISpec from './lyricAPI.json';
import lecternAPISpec from './lecternAPI.json';

const specs = {
  song: songAPISpec,
  score: scoreAPISpec,
  maestro: maestroAPISpec,
  lyric: lyricAPISpec,
  lectern: lecternAPISpec
};

const SwaggerAPIDoc = ({ specName = 'song' }) => {
  const spec = specs[specName] || songAPISpec;

  return (
    <div className={styles.swaggerCard}>
      <SwaggerUI
        spec={spec}
        tryItOutEnabled={false}
        defaultModelsExpandDepth={-1}
        displayOperationId={false}
        filter={false}
        docExpansion="none"
      />
    </div>
  );
};

export default SwaggerAPIDoc;