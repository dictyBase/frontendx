// https://nextjs.org/docs/api-reference/next.config.js/introduction
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

export default nextConfig
