module.exports = {
  propsParser: require("react-docgen-typescript").withCustomConfig(
    "./tsconfig.json",
  ).parse,
  styleguideDir: "styleguide",
  components: "components/**/*.tsx",
  title: "dictyBase Publication",
  ignore: ["**/*.test.{js,jsx,ts,tsx}"],
  webpackConfig: require("react-scripts/config/webpack.config")("development"),
}
