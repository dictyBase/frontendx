import { pipe } from "fp-ts/function"
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

export { getCallbackPath, getHomePath, type UserWithRoles }
