// https://nextjs.org/docs/api-reference/next.config.js/introduction
import transpileModules from "next-transpile-modules"
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // /* config options here */
  basePath: "/gene",
  images: {
    unoptimized: true,
  },
}

const withTM = transpileModules([
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

// eslint-disable-next-line import/no-default-export
export default withTM(nextConfig)
