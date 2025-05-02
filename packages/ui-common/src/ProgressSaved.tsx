import CloudDoneIcon from "@material-ui/icons/CloudDone"
import { Grid, Typography, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  fadeOut: {
    animation: "$fadeAway 0.25s forwards",
    animationDelay: "0.3s",
  },
  "@keyframes fadeAway": {
    "0%": {
      opacity: 1,
    },
    "100%": {
      opacity: 0,
    },
  },
})

const ProgressSaved = () => {
  const { fadeOut } = useStyles()
  return (
    <Grid alignItems="center" container spacing={1} wrap="nowrap">
      <Grid item>
        <Typography className={fadeOut}> Saved </Typography>
      </Grid>
      <Grid item>
        <CloudDoneIcon />
      </Grid>
    </Grid>
  )
}

export { ProgressSaved }
