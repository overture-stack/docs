import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import songAPISpec from './songAPI.json';
import scoreAPISpec from './scoreAPI.json';
import maestroAPISpec from './maestroAPI.json';

const specs = {
  song: songAPISpec,
  score: scoreAPISpec,
  maestro: maestroAPISpec
};

const SwaggerAPIDoc = ({ specName = 'song' }) => {
  const spec = specs[specName] || songAPISpec;

  return (
    <SwaggerUI 
      spec={spec}
      tryItOutEnabled={false}
      defaultModelsExpandDepth={-1}
      displayOperationId={false}
      filter={false}
      docExpansion="none"
    />
  );
};

export default SwaggerAPIDoc;