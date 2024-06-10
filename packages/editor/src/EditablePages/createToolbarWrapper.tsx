/* eslint-disable react/function-component-definition */
import { makeStyles, Theme } from "@material-ui/core/styles"
import { Box, Grid } from "@material-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { timeSince } from "../utils/timeSince"

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

type ToolbarProperties = {
  children: Array<JSX.Element>
}

const createToolbarWrapper =
  (lastUpdate: string, firstName: string, lastName: string) =>
  ({ children }: ToolbarProperties) => {
    const classes = useStyles()
    const fullName = `${firstName} ${lastName}`

    return (
      <Grid
        container
        justifyContent="space-between"
        className={classes.toolbar}
        data-testid="info-page-toolbar">
        <Grid item>
          <Box component="span" className={classes.text}>
            <strong>
              <FontAwesomeIcon className={classes.icon} icon="user" />{" "}
              {fullName}
            </strong>{" "}
            edited {timeSince(lastUpdate)} ago
          </Box>
        </Grid>
        <Grid item>
          <Grid container spacing={1}>
            {children.map((child) => (
              <Grid item>{child}</Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    )
  }

export { createToolbarWrapper }
