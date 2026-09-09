/// <reference types="vite/client" />
//
declare namespace NodeJS {
  interface ProcessEnv {
    CI: string
    BASE_URL: string
  }
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
