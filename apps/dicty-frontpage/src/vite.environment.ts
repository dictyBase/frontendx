/// <reference types="vite/client" />
import "typescript"

declare global {
  namespace NodeJS {
    interface ProcessEnvironment {
      NODE_ENV: "development" | "production"
      REACT_APP_BASENAME: string
      REACT_APP_GA_TRACKING_ID: string
      REACT_APP_NAVBAR_JSON: string
      REACT_APP_FOOTER_JSON: string
      REACT_APP_GRAPHQL_SERVER: string
      // the alternate graphql server used to prevent cross-site cookie issues
      REACT_APP_ALT_GRAPHQL_SERVER: string
      // Activates mock service worker
      REACT_APP_MOCK_SERVER: "on" | "off"
      // used to differentiate between deploy environments, specifically for using correct GraphQL URL
      DEPLOY_ENV: "development" | "staging" | "production"
    }
  }
}
