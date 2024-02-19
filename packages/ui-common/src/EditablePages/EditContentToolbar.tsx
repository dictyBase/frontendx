import { makeStyles, Theme } from "@material-ui/core/styles"
import { Box, Tooltip, IconButton, Grid } from "@material-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ContentBySlugQuery } from "dicty-graphql-schema"
import { useNavigate } from "react-router-dom"
import { timeSince } from "../timeSince"

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

type Properties = {
  /** Timestamp for when this content was last updated */
  lastUpdate: string
  /** User object for who last updated this content */
  user: NonNullable<ContentBySlugQuery["contentBySlug"]>["updated_by"]
}

/** Displays the info page data that was fetched from the InfoPageContainer component */

const EditContentToolbar = ({ lastUpdate, user }: Properties) => {
  const navigate = useNavigate()
  const classes = useStyles()
  const fullName = `${user.first_name} ${user.last_name}`
  const handleClick = () => {
    navigate("../edit", { relative: "path" })
  }

  return (
    <Grid
      container
      justifyContent="space-between"
      className={classes.toolbar}
      data-testid="info-page-toolbar">
      <Grid item>
        <Box component="span" className={classes.text}>
          <strong>
            <FontAwesomeIcon className={classes.icon} icon="user" /> {fullName}
          </strong>{" "}
          edited {timeSince(lastUpdate)} ago
        </Box>
      </Grid>
      <Grid item>
        <Tooltip title="Edit Page" placement="bottom">
          <IconButton className={classes.icon} onClick={handleClick}>
            <FontAwesomeIcon icon="pencil-alt" />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  )
}

export { EditContentToolbar }
