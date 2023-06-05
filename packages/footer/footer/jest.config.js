module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
      diagnostics: false,
    },
  },
  testEnvironment: "jsdom",
  preset: "ts-jest",
  testPathIgnorePatterns: ["src/e2e/"],
  coveragePathIgnorePatterns: [
    "dist/",
    "src/data/",
    "src/types/",
    "src/e2e/",
    "src/styles/",
  ],
}
