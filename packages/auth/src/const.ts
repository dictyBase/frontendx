import { reduce } from "fp-ts/ReadonlyNonEmptyArray"
import { UserInfoResponse } from "@logto/react"

type UserWithRoles = UserInfoResponse & {
  roles: Array<string>
}

const concatPath = reduce(
  `${window.location.protocol}//${window.location.host}`,
  (accumulator: string, current: string) => `${accumulator}${current}`,
)

const callbackPath =
  import.meta.env.VITE_APP_BASENAME === "/"
    ? "/callback"
    : concatPath([import.meta.env.VITE_APP_BASENAME, "/callback"])
const homePath = concatPath([import.meta.env.VITE_APP_BASENAME, "/"])

export { callbackPath, homePath, type UserWithRoles }
