import { reduce } from "fp-ts/ReadonlyNonEmptyArray"

const concatPath = reduce(
  `http://${window.location.host}`,
  (accumulator: string, current: string) => `${accumulator}${current}`,
)

const callbackPath = concatPath([
  import.meta.env.VITE_APP_BASENAME,
  "/callback",
])
const homePath = concatPath([import.meta.env.VITE_APP_BASENAME, "/"])

export { callbackPath, homePath }
