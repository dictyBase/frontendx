const base = "/publication"

// eslint-disable-next-line import/no-commonjs, unicorn/prefer-module
const withTM = require("next-transpile-modules")([
  "@dictybase/navbar",
  "dicty-graphql-schema",
])
// eslint-disable-next-line import/no-commonjs, unicorn/prefer-module
module.exports = withTM({
  basePath: base,
  swcMinify: true,
})
