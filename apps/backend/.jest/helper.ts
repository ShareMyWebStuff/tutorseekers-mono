import { JestConfigWithTsJest } from "ts-jest";
/**
 * Passed in a config object it will extend that object. Previously we would not
 * deep merge the config, and therefore we had some issues with coverage.
 *
 * @param {object} config - Fields to override in the config. Defaults to empty object.
 * @param {boolean} useESModules - Whether to use ES modules or not. Defaults to false.
 *
 * @returns
 */
const extendBase = (
  config: JestConfigWithTsJest = {},
  useESModules: boolean = false,
): JestConfigWithTsJest => {
  const {
    modulePathIgnorePatterns = [],
    coveragePathIgnorePatterns = [],
    transformIgnorePatterns = [],
    moduleDirectories = [],
    ...rest
  } = config;

  return {
    preset: useESModules ? "ts-jest/presets/default-esm" : "ts-jest",
    moduleNameMapper: useESModules
      ? {
          "^(\\.{1,2}/.*)\\.js$": "$1",
        }
      : undefined,
    transform: {
      "^.+\\.m?[jt]sx?$": [
        "ts-jest",
        {
          diagnostics: false,
          isolatedModules: true,
          useESM: useESModules,
        },
      ],
    },
    transformIgnorePatterns: [
      "/node_modules/(?!@shieldpay/.*)",
      ...transformIgnorePatterns,
    ],
    modulePathIgnorePatterns: ["__factories__", ...modulePathIgnorePatterns],
    coveragePathIgnorePatterns: [
      "__factories__",
      ...coveragePathIgnorePatterns,
    ],
    moduleDirectories: ["node_modules", "src", ...moduleDirectories],
    ...rest,
  };
};

export { extendBase };
