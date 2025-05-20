// eslint-disable-next-line unicorn/prevent-abbreviations
interface ImportMetaEnv {
  VITE_APP_STOCKCENTER_URL: string
  VITE_APP_FRONTPAGE_URL: string
}

interface ImportMeta {
  env: ImportMetaEnv
}
