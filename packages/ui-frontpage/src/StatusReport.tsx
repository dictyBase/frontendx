import { Link } from "react-router-dom"
import { match } from "ts-pattern"
import { makeStyles, Paper, Grid, Typography, Divider } from "@material-ui/core"
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked"
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
        .with(Status.UP, () => "green")
        .with(Status.DOWN, () => "orange")
        .exhaustive(),
  },
  text: {
    fontFamily: "'Nimbus Mono PS', 'Courier New', monospace",
  },
})

const StatusReport = ({ name, url, status }: UptimeProperties) => {
  const { text, root, statusGrid, statusIndicator } = useStyles({ status })
  return (
    <Link to={url}>
      <Paper className={root}>
        <Grid container spacing={1} alignContent="center">
          <Grid item className={statusGrid}>
            <RadioButtonCheckedIcon className={statusIndicator} />
          </Grid>
          <Grid item>
            <Divider orientation="vertical" />
          </Grid>
          <Grid item>
            <Typography className={text}>{name}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Link>
  )
}

export { StatusReport }
