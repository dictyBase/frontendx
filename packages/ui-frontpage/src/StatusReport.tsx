import { Link } from "react-router-dom"
import { match } from "ts-pattern"
import { makeStyles, Paper, Grid, Typography, Divider } from "@material-ui/core"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import green from "@material-ui/core/colors/green"
import lightGreen from "@material-ui/core/colors/lightGreen"
import { UptimeProperties, Status } from "./types"

const useStyles = makeStyles({
  root: {
    // paddingLeft: "0.8rem",
    // paddingRight: "0.8rem",
    color: "black",
    paddingTop: "0.2rem",
    paddingBottom: "0.2rem",
    transition: "background-color 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: "grey",
    },
  },
  statusGrid: {
    lineHeight: 0,
  },
  statusIndicator: {
    color: ({ status }: { status: Status }) =>
      match(status)
        .with(Status.UP, () => green[700])
        .with(Status.DOWN, () => "orange")
        .exhaustive(),
  },
  statusText: {
    fontFamily: "'Nimbus Mono PS', 'Courier New', monospace",
    fontWeight: 600,
    color: ({ status }: { status: Status }) =>
      match(status)
        .with(Status.UP, () => green[700])
        .with(Status.DOWN, () => "orange")
        .exhaustive(),
  },
  text: {
    fontFamily: "'Nimbus Mono PS', 'Courier New', monospace",
  },
})

const StatusReport = ({ name, url, status }: UptimeProperties) => {
  const { text, root, statusText, statusGrid, statusIndicator } = useStyles({
    status,
  })
  return (
    <Link to={url}>
      <Grid
        container
        spacing={1}
        justifyContent="space-between"
        className={root}>
        <Grid item>
          <Typography className={text}>{name}</Typography>
        </Grid>
        <Grid item className={statusGrid}>
          <CheckCircleIcon className={statusIndicator} />
        </Grid>
      </Grid>
    </Link>
  )
}

export { StatusReport }
