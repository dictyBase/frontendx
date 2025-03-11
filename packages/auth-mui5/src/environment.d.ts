/* eslint-disable unicorn/prevent-abbreviations */
interface ImportMetaEnv {
  VITE_LOGTO_APPID: string
  VITE_APP_BASENAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
