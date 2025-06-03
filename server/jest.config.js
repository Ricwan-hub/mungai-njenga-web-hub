export default {
  testEnvironment: 'node',
  // preset: '@shelf/jest-postgres', // Not using this for now to keep it simpler
  setupFilesAfterEnv: ['./src/tests/setupTests.js'],
  // Jest by default uses CommonJS. To make it work with ES Modules (`import`/`export` in .js files)
  // when `type: "module"` is in package.json, Node's experimental ESM support for Jest is needed.
  // This might require setting NODE_OPTIONS=--experimental-vm-modules
  // Or, use Babel to transpile tests. For now, let's assume Node's ESM support is sufficient or will be handled by NODE_OPTIONS in test script.
  // If tests have issues with ES Modules, will need to add transform: {} or use Babel.
  // No specific transform for now, rely on Node's native ESM capabilities if Jest is invoked correctly.
  // For Supertest with an ES Module app, ensure app is exported correctly and tests import it as ESM.
};
