import { useLogto } from "@logto/react"
import {
  split as splitString,
  slice as sliceString,
  toUpperCase,
} from "fp-ts/string"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { ReadonlyNonEmptyArray, head, last } from "fp-ts/ReadonlyNonEmptyArray"
import { Button } from "@material-ui/core"
import { Button, Box } from "@material-ui/core"
import { PersonSharp } from "@material-ui/icons"

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
    <Box display="flex" flexDirection="column-reverse" justifyContent="center">
      <Button
        disableElevation
        className={classes.indigo}
        variant="contained"
        color="primary"
        endIcon={<PersonSharp />}
        onClick={() => signOut(url)}>
        {nameToUpperInitial(name)}
      </Button>
    </Box>
  )
}

export { LogoutButton }
