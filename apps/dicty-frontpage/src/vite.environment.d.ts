/* eslint-disable unicorn/prevent-abbreviations */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_LOGTO_APPID: string
  VITE_APP_BASENAME: string
  VITE_APP_FRONTPAGE_URL: string
  VITE_APP_STOCKCENTER_URL: string
  VITE_GA_TRACKING_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "virtual:dictybase/page-metadata" {
  import type { ACCESS } from "@dictybase/auth-mui5"

  export const pagesMetadata: Record<
    string,
    { access: ACCESS | undefined; roles: Array<string> | undefined }
  >
}
