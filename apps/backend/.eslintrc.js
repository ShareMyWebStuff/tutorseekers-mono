module.exports = {
    extends: "@shieldpay/eslint-config",
    parserOptions: {
      tsconfigRootDir: __dirname,
      project: ["./tsconfig.linting.json"],
    },
};