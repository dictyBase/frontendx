module.exports = {
  propsParser: require("react-docgen-typescript").withCustomConfig(
    "./tsconfig.json",
  ).parse,
  styleguideDir: "docs",
  components: "src/**/*.tsx",
  ignore: [
    "**/*.test.{js,jsx,ts,tsx}",
    "src/common/utils/headerItems.tsx",
    "src/index.tsx",
  ],
  webpackConfig: require("react-scripts/config/webpack.config")("development"),
}
