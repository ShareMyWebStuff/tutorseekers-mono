"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseTestDir = "<rootDir>/__tests__";
const config = {
    setupFiles: ["<rootDir>/.jest/env.js"],
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: [`${baseTestDir}/**/*.test.ts`],
};
exports.default = config;
