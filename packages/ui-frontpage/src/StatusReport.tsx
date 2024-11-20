import { Link } from "react-router-dom"
import { match } from "ts-pattern"
import { makeStyles, Grid, Typography } from "@material-ui/core"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import ErrorIcon from "@material-ui/icons/Error"
import grey from "@material-ui/core/colors/grey"
import green from "@material-ui/core/colors/green"
import red from "@material-ui/core/colors/red"
import { UptimeProperties, Status } from "./types"

const useStyles = makeStyles({
  root: {
    color: "black",
    padding: "0.3rem",
    columnGap: "1rem",
    transition: "background-color 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: grey[200],
    },
  },
  statusGrid: {
    lineHeight: 0,
  },
  statusUp: {
    color: green[700],
  },
  statusDown: {
    color: red[700],
  },
  text: {
    fontFamily: "'Nimbus Mono PS', 'Courier New', monospace",
  },
})

const StatusReport = ({ name, url, status }: UptimeProperties) => {
  const { text, root, statusGrid, statusUp, statusDown } = useStyles()

  const statusIcon = match(status)
    .with(Status.UP, () => <CheckCircleIcon className={statusUp} />)
    .with(Status.DOWN, () => <ErrorIcon className={statusDown} />)
    .exhaustive()

  return (
    <Link to={url}>
      <Grid container justifyContent="space-between" className={root}>
        <Grid item>
          <Typography className={text}>{name}</Typography>
        </Grid>
        <Grid item className={statusGrid}>
          {statusIcon}
        </Grid>
      </Grid>
    </Link>
  )
}

export { StatusReport }
