/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_APP_LOGTO_API_SECOND_RESOURCE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
