/* eslint-disable unicorn/filename-case */
/* eslint-disable unicorn/prevent-abbreviations */
import "typescript"

declare global {
  namespace NodeJS {
    interface ProcessEnvironment {
      NODE_ENV: "development" | "production"
      NEXT_PUBLIC_BASENAME: string
      NEXT_PUBLIC_GA_TRACKING_ID: string
      NEXT_PUBLIC_NAVBAR_JSON: string
      NEXT_PUBLIC_FOOTER_JSON: string
      NEXT_PUBLIC_GRAPHQL_SERVER: string
      NEXT_PUBLIC_FRONTPAGE_URL: string
      NEXT_PUBLIC_STOCKCENTER_URL: string
      // the alternate graphql server used to prevent cross-site cookie issues
      NEXT_PUBLIC_ALT_GRAPHQL_SERVER: string
      // used to differentiate between deploy environments, specifically for using correct GraphQL URL
      NEXT_PUBLIC_DEPLOY_ENV: "development" | "staging" | "production"
    }
  }
}
