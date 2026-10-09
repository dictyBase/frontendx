/// <reference types="vite/client" />

/* eslint-disable unicorn/prevent-abbreviations */
interface ImportMetaEnv {
  AUTH_ENABLED: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
