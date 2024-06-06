import { Box, Menu } from "@material-ui/core"
import { useState, MouseEvent } from "react"
import {
  Option,
  none as Onone,
  match as Omatch,
  toNullable,
  of as Oof,
} from "fp-ts/Option"
import { pipe } from "fp-ts/function"
import { type UserWithRoles } from "./const"
import { UserDisplayButton } from "./UserDisplayButton"
import { ProfileMenuItem } from "./ProfileMenuItem"
import { LogoutMenuItem } from "./LogoutMenuItem"

/**
 * LogoutButtonProperties interface represents the props passed to the LogoutButton component.
 * @interface LogoutButtonProperties
 * @property {string} url - The redirect URL after logging out.
 * @property {User} user - The user object to display in the user display button.
 */
type LogoutButtonProperties = {
  url: string
  frontPageUrl: string
  user: UserWithRoles
}

/**
 * LogoutButton component renders a logout button with a dropdown menu.
 */
const LogoutButton = ({
  url,
  frontPageUrl,
  user,
}: LogoutButtonProperties): JSX.Element => {
  /**
   * menuElement state represents the current menu element, wrapped in an Option type.
   */
  const [menuElement, setMenuElement] = useState<Option<HTMLElement>>(Onone)

  /**
   * getMenuElement is a utility function that converts the menuElement from an Option type to HTMLElement.
   */
  const getMenuElement = (): HTMLElement =>
    pipe(menuElement, toNullable) as HTMLElement

  /**
   * handleClose is a handler function that sets the menuElement to Onone, closing the menu.
   */
  const handleClose = (): void => setMenuElement(Onone)

  /**
   * handleClick is a handler function that sets the menuElement to the clicked element, opening the menu.
   */
  const handleClick = (event: MouseEvent<HTMLElement>): void =>
    setMenuElement(Oof(event.currentTarget))

  /**
   * isOpen represents the state of the menu, whether it is open or closed.
   */
  const isOpen: boolean = pipe(
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
        <ProfileMenuItem
          onClick={() => window.location.assign(`${frontPageUrl}/user/show`)}
        />
        <LogoutMenuItem redirectPath={url} />
      </Menu>
    </Box>
  )
}

export { LogoutButton }
