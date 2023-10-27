/* eslint-disable react/function-component-definition */
import { MouseEvent } from "react"
import { styled } from "@material-ui/styles"
import { pipe } from "fp-ts/function"
import { Button, Tooltip } from "@material-ui/core"
import { AccountBox } from "@material-ui/icons"
import { nameToUpperInitial } from "./functional"
import { type UserWithRoles } from "./const"

type UserDisplayButtonProperties = {
  user: UserWithRoles
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void
}

const tooltipInfo = (user: UserWithRoles) => (
  <>
    DCR account
    <br />
    <b>{user.name}</b>
    <br />
    <i>{user.email}</i>
  </>
)

const UserToolTip = styled(Tooltip)({ maxWidth: 200 })

const UserButton = styled(Button)({
  display: "flex",
  flexDirection: "column",
  color: "hsl(210, 100%, 25%)",
})

const tooltipWrapper =
  (user: UserWithRoles) => (children: React.ReactElement<any, any>) => (
    <UserToolTip title={tooltipInfo(user)} placement="bottom-start">
      {children}
    </UserToolTip>
  )

const buttonWrapper =
  (handleClick: (event: MouseEvent<HTMLButtonElement>) => void) =>
  (text: string) => (
    <UserButton
      disableElevation
      size="large"
      endIcon={<AccountBox style={{ fontSize: "2.4rem" }} />}
      onClick={handleClick}>
      {text}
    </UserButton>
  )

const UserDisplayButton = ({
  user,
  handleClick,
}: UserDisplayButtonProperties) =>
  pipe(
    nameToUpperInitial(user.name as string),
    buttonWrapper(handleClick),
    tooltipWrapper(user),
  )

export { UserDisplayButton }
