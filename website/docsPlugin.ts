const path = require("path");
const webpack = require("webpack");

// d3-dag's `exports` map blocks deep subpath imports, so resolve the ESM build
// as an absolute filesystem path (a sibling of the CJS `main` entry) — this
// bypasses the exports map, and an absolute alias target resolves directly.
const d3dagEsm = path.join(
  path.dirname(require.resolve("d3-dag")),
  "d3-dag.esm.min.mjs",
);

module.exports = function (context, options) {
  return {
    name: "custom-docusaurus-plugin",
    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          symlinks: false,
          alias: {
            // The Lectern dictionary viewer (embedded in the Building
            // Dictionaries playground) depends on d3-dag. d3-dag's CJS `main`
            // build (which webpack picks when the CJS Lectern bundle require()s
            // it) references Node built-ins (fs, vm, child_process, ...) in
            // code paths that never run in the browser, which breaks the web
            // bundle. Its ESM build is free of those references, so point the
            // bare `d3-dag` specifier at it.
            "d3-dag$": d3dagEsm,
          },
          // Safety net: stub any remaining Node core-module references reached
          // through browser-only third-party code so the web build never tries
          // to bundle them.
          fallback: {
            fs: false,
            path: false,
            os: false,
            vm: false,
            url: false,
            crypto: false,
            stream: false,
            module: false,
            worker_threads: false,
            child_process: false,
          },
        },
        // d3-dag's CJS build carries a dynamic `require(expr)` in a code path
        // the browser never reaches; it only lands in the server bundle (the
        // playground is browser-only and never executes during SSR). Silence
        // the resulting "Critical dependency" warning so the build stays clean.
        ignoreWarnings: [{ module: /d3-dag/ }],
        plugins: [
          // Rewrite `node:`-scheme built-in imports (e.g. `node:vm`) to their
          // bare specifiers so the fallback stubs above can catch them; without
          // this webpack throws UnhandledSchemeError on the web target.
          new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
            resource.request = resource.request.replace(/^node:/, "");
          }),
        ],
      };
    },
  };
};
