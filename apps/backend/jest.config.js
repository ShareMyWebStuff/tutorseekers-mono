/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  setupFiles: ["./.jest/env.js"],
  globalSetup: "./.jest/global-setup.js",
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};
