// https://nextjs.org/docs/api-reference/next.config.js/introduction
import transpileModules from "next-transpile-modules"
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // /* config options here */
  // basePath: "",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/gene/sadA",
        permanent: true,
      },
      {
        source: "/gene",
        destination: "/gene/sadA",
        permanent: true,
      },
    ]
  },
}

const withTM = transpileModules([
  "@dictybase/navbar",
  "@dictybase/header",
  "@dictybase/footer",
  "@dictybase/auth",
  "@dictybase/dicty-image",
  "@dictybase/functional",
  "@dictybase/ui-common",
  "dicty-graphql-schema",
  "@logto/react",
])

// eslint-disable-next-line import/no-default-export
export default withTM(nextConfig)
