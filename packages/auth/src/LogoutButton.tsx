import { useLogto } from "@logto/react"
import { Box, Menu } from "@material-ui/core"
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom"
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
import { PersonSharp } from "@material-ui/icons"
import { type UserWithRoles } from "./const"
import { UserDisplayButton } from "./UserDisplayButton"
import { UserMenuItem } from "./UserMenuItem"

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
    <Box display="flex" flexDirection="column" justifyContent="center">
      <UserDisplayButton user={user} handleClick={handleClick} />
      <Menu
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        anchorEl={getMenuElement}
        open={isOpen}
        onClose={handleClose}
        keepMounted>
        <UserMenuItem
          icon={<PersonSharp />}
          onClick={() => clientRouter.navigate("/user/show", { state: user })}>
          Profile
        </UserMenuItem>
        <UserMenuItem icon={<MeetingRoomIcon />} onClick={() => signOut(url)}>
          Logout
        </UserMenuItem>
      </Menu>
    </Box>
  )
}

export { LogoutButton }
