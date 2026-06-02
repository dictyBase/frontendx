/// <reference types="vite/client" />

declare module "virtual:dictybase/page-metadata" {
  import type { ACCESS } from "@dictybase/auth-mui5"

  export const pagesMetadata: Record<
    string,
    { access: ACCESS | undefined; roles: Array<string> | undefined }
  >
}
