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

// eslint-disable-next-line import/no-commonjs, unicorn/prefer-module
const withTM = transpileModules([
  "@dictybase/navbar",
  "dicty-graphql-schema",
])

// eslint-disable-next-line import/no-default-export
export default withTM(nextConfig)
