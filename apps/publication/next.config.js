const base = "/publication"

// eslint-disable-next-line import/no-commonjs, unicorn/prefer-module
const withTM = require("next-transpile-modules")([
  "@dictybase/auth",
  "@dictybase/dicty-image",
  "@dictybase/footer",
  "@dictybase/functional",
  "@dictybase/google-analytics",
  "@dictybase/header",
  "@dictybase/navbar",
  "@dictybase/ui-common",
  "@logto/react",
  "dicty-graphql-schema",
])
// eslint-disable-next-line import/no-commonjs, unicorn/prefer-module
module.exports = withTM({
  basePath: base,
  swcMinify: true,
})
