// eslint-disable-next-line unicorn/prevent-abbreviations
interface ImportMetaEnv {
  VITE_APP_STOCKCENTER_URL: string
  VITE_APP_STATUS_JSON?: string
}

interface ImportMeta {
  env: ImportMetaEnv
}
