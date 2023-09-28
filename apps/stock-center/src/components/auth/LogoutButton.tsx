import { dscRouter } from "../../routes"
import { useLogto, UserInfoResponse } from "@logto/react"
import {
  split as splitString,
  slice as sliceString,
  toUpperCase,
} from "fp-ts/string"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { ReadonlyNonEmptyArray, head, last } from "fp-ts/ReadonlyNonEmptyArray"
import { Button, Box, Menu, MenuItem, Tooltip } from "@material-ui/core"
import { PersonSharp } from "@material-ui/icons"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { indigo } from "@material-ui/core/colors"
import { useState, MouseEvent } from "react"

type LogoutButtonProperties = {
  url: string
  user: UserInfoResponse
}

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
    DCR account<br/>
    <b>{user.name}</b><br/>
    <i>{user.email}</i>
  </>
)

const LogoutButton = ({ url, user }: LogoutButtonProperties) => {
  const [menuElem, setMenuElem] = useState<HTMLElement | null>(null)
  const { signOut } = useLogto()
  const classes = useStyles()
  const handleClick = (event: MouseEvent<HTMLButtonElement>) =>
    setMenuElem(event.currentTarget)
  const handleClose = () => setMenuElem(null)

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
        anchorEl={menuElem}
        open={Boolean(menuElem)}
        onClose={handleClose}
        keepMounted>
        <MenuItem onClick={() => dscRouter.navigate("/user/show")}>
          Profile
        </MenuItem>
        <MenuItem onClick={() => signOut(url)}>Logout</MenuItem>
      </Menu>
    </Box>
  )
}

export { LogoutButton }
