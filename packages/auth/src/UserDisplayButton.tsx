import { MouseEvent } from "react"
import { Button, Tooltip } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { PersonSharp } from "@material-ui/icons"
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

const useStyles = makeStyles(() => ({
  tooltipWidth: {
    maxWidth: 200,
  },
  linksButton: {
    display: "flex",
    flexDirection: "column",
    color: "hsl(210, 100%, 25%)",
  },
}))

const UserDisplayButton = ({
  user,
  handleClick,
}: UserDisplayButtonProperties) => {
  const classes = useStyles()
  return (
    <Tooltip
      title={tooltipInfo(user)}
      placement="bottom-start"
      classes={{ tooltip: classes.tooltipWidth }}>
      <Button
        disableElevation
        className={classes.linksButton}
        endIcon={<PersonSharp />}
        onClick={handleClick}>
        {nameToUpperInitial(user.name as string)}
      </Button>
    </Tooltip>
  )
}

export { UserDisplayButton }
