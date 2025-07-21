import CloudDoneIcon from "@mui/icons-material/CloudDone"
import { Grid, Typography } from "@mui/material"
import makeStyles from "@mui/styles/makeStyles"
import { green } from "@mui/material/colors"

const useStyles = makeStyles({
  text: {
    color: green[800],
    fontWeight: 600,
  },
  icon: {
    color: green[900],
  },
})

const ProgressSaved = () => {
  const { text, icon } = useStyles()
  return (
    <Grid alignItems="center" container spacing={1} wrap="nowrap">
      <Grid item>
        <Typography className={text}>Saved</Typography>
      </Grid>
      <Grid item>
        <CloudDoneIcon className={icon} />
      </Grid>
    </Grid>
  )
}

export { ProgressSaved }
