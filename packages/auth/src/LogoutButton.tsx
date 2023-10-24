import { useLogto } from "@logto/react"
import { Box, Menu, MenuItem } from "@material-ui/core"
import { useState, MouseEvent } from "react"
import { Router as RemixRouter } from "@remix-run/router"
import {
  Option,
  none as Onone,
  match as Omatch,
  toNullable,
  of as Oof,
} from "fp-ts/Option"
import { pipe } from "fp-ts/function"
import { type UserWithRoles } from "auth"
import { UserDisplayButton } from "./UserDisplayButton"

type LogoutButtonProperties = {
  url: string
  user: UserWithRoles
  clientRouter: RemixRouter
}

const LogoutButton = ({ url, user, clientRouter }: LogoutButtonProperties) => {
  const [menuElement, setMenuElement] = useState<Option<HTMLElement>>(Onone)
  const { signOut } = useLogto()
  const getMenuElement = () => pipe(menuElement, toNullable) as HTMLElement
  const handleClose = () => setMenuElement(Onone)
  const handleClick = (event: MouseEvent<HTMLElement>) =>
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
      <UserDisplayButton user={user} handleClick={handleClick} />
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
