const base = "/publication"

// eslint-disable-next-line import/no-commonjs, unicorn/prefer-module
const withTM = require("next-transpile-modules")([
  "@dictybase/navbar",
  "@dictybase/header",
  "@dictybase/footer",
  "@dictybase/auth",
  "@dictybase/dicty-image",
  "@dictybase/functional",
  "@dictybase/ui-common",
  "@dictybase/image-plugin",
  "dicty-graphql-schema",
  "@logto/react",
])
// eslint-disable-next-line import/no-commonjs, unicorn/prefer-module
module.exports = withTM({
  basePath: base,
  swcMinify: true,
})
