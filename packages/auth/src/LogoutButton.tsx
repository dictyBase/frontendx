import { useLogto, UserInfoResponse } from "@logto/react"
import { Button, Box, Menu, MenuItem, Tooltip } from "@material-ui/core"
import { PersonSharp } from "@material-ui/icons"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { indigo } from "@material-ui/core/colors"
import { useState, MouseEvent } from "react"
import { Router as RemixRouter } from "@remix-run/router"
import {
  split as splitString,
  slice as sliceString,
  toUpperCase,
} from "fp-ts/string"
import {
  Option,
  none as Onone,
  match as Omatch,
  toNullable,
  of as Oof,
} from "fp-ts/Option"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { ReadonlyNonEmptyArray, head, last } from "fp-ts/ReadonlyNonEmptyArray"

type LogoutButtonProperties = {
  url: string
  user: UserInfoResponse
  clientRouter: RemixRouter
}

type clickEvent = MouseEvent<HTMLElement>

const useStyles = makeStyles((theme: Theme) => ({
  indigo: {
    color: theme.palette.getContrastText(indigo[200]),
    backgroundColor: indigo[200],
  },
  tooltipWidth: {
    maxWidth: 200,
  },
}))

const firstLast = (nameArry: ReadonlyNonEmptyArray<string>) => [
  head(nameArry),
  last(nameArry),
]
const upperFirst = (fullname: string) =>
  pipe(fullname, sliceString(0, 1), toUpperCase)

const nameToUpperInitial = (fullName: string) =>
  pipe(fullName, splitString(" "), firstLast, Amap(upperFirst)).join("")

const tooltipInfo = (user: UserInfoResponse) => (
  <>
    DCR account
    <br />
    <b>{user.name}</b>
    <br />
    <i>{user.email}</i>
  </>
)

const LogoutButton = ({ url, user, clientRouter }: LogoutButtonProperties) => {
  const [menuElement, setMenuElement] = useState<Option<HTMLElement>>(Onone)
  const { signOut } = useLogto()
  const classes = useStyles()
  const getMenuElement = () => pipe(menuElement, toNullable) as HTMLElement
  const handleClose = () => setMenuElement(Onone)
  const handleClick = (event: clickEvent) =>
    setMenuElement(Oof(event.currentTarget))
  const isOpen = pipe(
    menuElement,
    Omatch(
      () => false,
      () => true,
    ),
  )

  return (
    <Box display="flex" flexDirection="column-reverse" justifyContent="center">
      <Tooltip
        title={tooltipInfo(user)}
        placement="bottom-start"
        classes={{ tooltip: classes.tooltipWidth }}>
        <Button
          disableElevation
          className={classes.indigo}
          variant="contained"
          endIcon={<PersonSharp />}
          onClick={handleClick}>
          {nameToUpperInitial(user.name as string)}
        </Button>
      </Tooltip>
      <Menu
        anchorEl={getMenuElement}
        open={isOpen}
        onClose={handleClose}
        keepMounted>
        <MenuItem
          onClick={() => clientRouter.navigate("/user/show", { state: user })}>
          Profile
        </MenuItem>
        <MenuItem onClick={() => signOut(url)}>Logout</MenuItem>
      </Menu>
    </Box>
  )
}

export { LogoutButton }
