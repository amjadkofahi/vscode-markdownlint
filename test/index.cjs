"use strict";

// This must be a CommonJS or the VS Code host fails with:
// Error [ERR_REQUIRE_ESM]: require() of ES Module .../index.mjs not supported.

async function run() {
  const { tests } = await import("./tests.cjs");
  return tests.reduce((previous, current) => previous.then(() => current()), Promise.resolve());
}

module.exports = { run };
