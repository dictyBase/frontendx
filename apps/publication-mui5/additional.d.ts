/// <reference types="next" />
import "typescript"

declare global {
  namespace NodeJS {
    // eslint-disable-next-line unicorn/prevent-abbreviations
    interface ProcessEnv {
      NEXT_PUBLIC_FRONTPAGE_URL: string
      NEXT_PUBLIC_STOCKCENTER_URL: string
      NEXT_PUBLIC_BASENAME: string
      NEXT_PUBLIC_GRAPHQL_SERVER: string
      // the alternate graphql server used to prevent cross-site cookie issues
      NEXT_PUBLIC_ALT_GRAPHQL_SERVER: string
      // Activates mock service worker
      NEXT_PUBLIC_MOCK_SERVER: "on" | "off"
      // used to differentiate between deploy environments, specifically for using correct GraphQL URL
      NEXT_PUBLIC_DEPLOY_ENV: "development" | "staging" | "production"
      NEXT_PUBLIC_LOGTO_API_FIRST_RESOURCE: string
      NEXT_PUBLIC_LOGTO_API_SECOND_RESOURCE: string
      NEXT_PUBLIC_LOGTO_ENDPOINT: string
      NEXT_PUBLIC_LOGTO_APPID: string
    }
  }
}
