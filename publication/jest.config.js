const nextJest = require("next/jest")

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  testMatch: ["**/components/**/*.{ts,tsx}", "**/common/hooks/*.{ts,tsx}"],
  collectCoverageFrom: [
    "**/components/**/*.{ts,tsx}",
    "**/common/hooks/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/mocks/*.{ts,tsx}",
    "!**/pages/*.{ts,tsx}",
  ],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
