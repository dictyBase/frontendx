/// <reference types="vite/client" />

// eslint-disable-next-line unicorn/prevent-abbreviations
interface ImportMetaEnv {
  VITE_APP_LOGTO_API_SECOND_RESOURCE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
