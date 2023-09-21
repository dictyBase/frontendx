import { makeStyles, Theme } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { timeSince } from "./utils/timeSince"
// import { ErrorNotification } from "./ErrorNotification"
import { capitalizeFirstCharacter } from "./utils/stringCapitalizations"
import { UpdatedByUser } from "./types"

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    marginLeft: "auto",
  },
  toolbar: {
    backgroundColor: "#fafafa",
    borderRadius: "2px",
    border: "1px solid #ddd",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  label: {
    marginLeft: "auto",
    marginRight: theme.spacing(1),
    padding: theme.spacing(1),
    fontSize: "0.8rem",
    fontWeight: "bold",
    lineHeight: 1,
    color: "#fff",
    whiteSpace: "nowrap",
    borderRadius: "0.25em",
    backgroundColor: theme.palette.primary.light,
  },
  icon: {
    color: theme.palette.primary.light,
    fontSize: "1rem",
    marginRight: theme.spacing(0.5),
  },
  text: {
    color: theme.palette.primary.light,
  },
}))

// const error =
//   "Your login token has expired. Please log out and then log back in to regain full user access."

type Properties = {
  /** Timestamp for when this content was last updated */
  lastUpdate: string
  /** User object for who last updated this content */
  user: UpdatedByUser
  /** Function to execute when user clicks edit icon */
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

/** Displays the info page data that was fetched from the InfoPageContainer component */

const InfoPageViewToolbar = ({ handleClick, lastUpdate, user }: Properties) => {
  const classes = useStyles()

  const fullName = `${user.first_name} ${user.last_name}`
  const role = user.roles?.at(0)?.role
    ? `${capitalizeFirstCharacter(user.roles?.at(0)?.role as string)}`
    : "dictyBase User"

  return (
    <Box mt={2}>
      <Box className={classes.toolbar} data-testid="info-page-toolbar">
        <Box component="span" className={classes.text}>
          <strong>
            <FontAwesomeIcon className={classes.icon} icon="user" /> {fullName}
          </strong>{" "}
          edited {timeSince(lastUpdate)} ago
        </Box>
        <Box component="span" className={classes.label}>
          {role}
        </Box>{" "}
        <Tooltip title="Edit Page" placement="bottom">
          <IconButton className={classes.icon} onClick={handleClick}>
            <FontAwesomeIcon icon="pencil-alt" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}

export { InfoPageViewToolbar }
