import { useLogto } from "@logto/react"
import { headerStyles } from "@dictybase/header"
import {
  split as splitString,
  slice as sliceString,
  toUpperCase,
} from "fp-ts/string"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { ReadonlyNonEmptyArray, head, last } from "fp-ts/ReadonlyNonEmptyArray"

type LogoutButtonProperties = {
  url: string
  name: string
}


const firstLast = (nameArry: ReadonlyNonEmptyArray<string>) => [
  head(nameArry),
  last(nameArry),
]
const upperFirst = (fullname: string) =>
  pipe(fullname, sliceString(0, 1), toUpperCase)

const nameToUpperInitial = (fullName: string) =>
  pipe(fullName, splitString(" "), firstLast, Amap(upperFirst)).join("")

const LogoutButton = ({ url, name }: LogoutButtonProperties) => {
  const { signOut } = useLogto()

  return (
  )
}

export { LogoutButton }
