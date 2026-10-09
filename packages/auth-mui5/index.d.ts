/// <reference types="vite/client" />

/* eslint-disable unicorn/prevent-abbreviations */
interface ImportMetaEnv {
  VITE_AUTH_ENABLED: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
