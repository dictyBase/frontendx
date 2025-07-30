const base = "/publication"

// eslint-disable-next-line import/no-commonjs, unicorn/prefer-module
const withTM = require("next-transpile-modules")([
  "@dictybase/auth-mui5",
  "@dictybase/data-access",
  "@dictybase/dicty-image-mui5",
  "@dictybase/footer-mui5",
  "@dictybase/functional",
  "@dictybase/google-analytics",
  "@dictybase/header-mui5",
  "@dictybase/navbar-mui5",
  "@dictybase/ui-common",
  "@logto/react",
  "dicty-graphql-schema",
])
// eslint-disable-next-line import/no-commonjs, unicorn/prefer-module
module.exports = withTM({
  basePath: base,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
})
