import Typography from "@material-ui/core/Typography"
import { makeStyles, type Theme } from "@material-ui/core/styles"
import { grey } from "@material-ui/core/colors"

const useStyles = makeStyles((theme: Theme) => ({
  waiver: {
    backgroundColor: grey[200],
    border: "1px solid #e6f2ff",
    borderRadius: theme.spacing(1),
    margin: theme.spacing(2),
    padding: theme.spacing(3),
  },
}))

const WaiverRequestInformation = () => {
  const classes = useStyles()

  return (
    <Typography className={classes.waiver}>
      Please send an email to
      <a href="mailto:dictystocks@northwestern.edu" target="_top">
        dictystocks@northwestern.edu
      </a>
      describing why you need a waiver.
    </Typography>
  )
}

export { WaiverRequestInformation }
