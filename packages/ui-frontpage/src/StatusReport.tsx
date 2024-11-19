import { makeStyles, Paper, Grid, Typography, Divider } from "@material-ui/core"
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked"
import { UptimeProperties } from "./types"

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
    color: "green",
  },
})

const StatusReport = ({ name, url, status }: UptimeProperties) => {
  const { root, statusGrid, statusIndicator } = useStyles()
  return (
    <Paper className={root}>
      <Grid container spacing={1} alignContent="center">
        <Grid item className={statusGrid}>
          <RadioButtonCheckedIcon className={statusIndicator} />
        </Grid>
        <Grid item >
          <Divider orientation="vertical"/>
        </Grid>
        <Grid item>
          <Typography>{name}</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export { StatusReport }
