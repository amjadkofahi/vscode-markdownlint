import { runTests } from '@vscode/test-electron';

// @ts-ignore
const extensionDevelopmentPath = new URL("..", import.meta.url).pathname;
// @ts-ignore
const extensionTestsPath = new URL("./index.cjs", import.meta.url).pathname;

try {
  // @ts-ignore
  await runTests({ extensionDevelopmentPath, extensionTestsPath });
} catch (error) {
  console.error(`TEST FAILURE: ${error}`);
  process.exit(1);
}
