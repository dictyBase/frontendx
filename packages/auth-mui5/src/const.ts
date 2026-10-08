import { pipe } from "fp-ts/function"
import { not } from "fp-ts/Predicate"
import { reduce as Areduce } from "fp-ts/Array"
import { UserInfoResponse } from "@logto/react"

type UserWithRoles = UserInfoResponse & {
  roles: Array<string>
}

const getCallbackPath = (basename: string) => {
  const segments = basename === "/" ? ["/callback"] : [basename, "/callback"]
  return pipe(
    segments,
    Areduce(
      `${window.location.protocol}//${window.location.host}`,
      (accumulator: string, current: string) => `${accumulator}${current}`,
    ),
  )
}

const getHomePath = (basename: string) => {
  const segments = basename === "/" ? ["/"] : [basename, "/"]
  return pipe(
    segments,
    Areduce(
      `${window.location.protocol}//${window.location.host}`,
      (accumulator: string, current: string) => `${accumulator}${current}`,
    ),
  )
}

const isProductionMode = (mode: string) => mode === "production"

const AUTH_ENABLED = pipe(import.meta.env.MODE, not(isProductionMode))

export { getCallbackPath, getHomePath, type UserWithRoles, AUTH_ENABLED }
