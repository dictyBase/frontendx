import { Link } from "react-router-dom"
import { match } from "ts-pattern"
import { makeStyles, Paper, Grid, Typography, Divider } from "@material-ui/core"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import green from "@material-ui/core/colors/green"
import { UptimeProperties, Status } from "./types"

const useStyles = makeStyles({
  root: {
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
  },
  statusGrid: {
    lineHeight: 0,
  },
  statusIndicator: {
    // filter: "blur(1px)",
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
      <Paper elevation={2} className={root}>
        <Grid container spacing={1}>
          <Grid item>
            <Typography className={text}>{name}</Typography>
          </Grid>
          <Grid item>
            <Divider orientation="vertical" />
          </Grid>
          <Grid item>
            <Typography className={statusText}>UP</Typography>
          </Grid>
          <Grid item className={statusGrid}>
            <CheckCircleIcon className={statusIndicator} />
          </Grid>
        </Grid>
      </Paper>
    </Link>
  )
}

export { StatusReport }
