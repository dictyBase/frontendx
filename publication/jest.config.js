const nextJest = require("next/jest")

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Configure jsdom because by default jest uses a node environment
  // So jsdom uses the browser implementation. See: https://stackoverflow.com/questions/69227566/consider-using-the-jsdom-test-environment
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./jest.setup.js"],
  modulePaths: ["./"],
  testPathIgnorePatterns: ["__tests__/mocks/"],
  coveragePathIgnorePatterns: ["__tests__/mocks/", "common/hooks/"],
  collectCoverageFrom: [
    "**/components/**/*.{ts,tsx}",
    "**/common/hooks/*.{ts,tsx}",
  ],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
