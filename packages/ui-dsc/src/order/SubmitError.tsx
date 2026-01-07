import { makeStyles } from 'tss-react/mui';
import Alert from '@mui/material/Alert'
import Typography from "@mui/material/Typography"

const useStyles = makeStyles()((theme) => ({
  alert: {
    marginBottom: theme.spacing(2),
  },
}));

/**
 * SubmitError is the display if there is an error in form submission.
 */
const SubmitError = () => {
  const { classes } = useStyles()

  return (
    <Alert severity="error" className={classes.alert}>
      <Typography variant="body1">
        There was an error submitting your order. This is most likely a problem
        on our end. If the problem persists, please email us at &nbsp;
        <a
          href="mailto:dictystocks@northwestern.edu?Subject=Question"
          target="_top">
          dictystocks@northwestern.edu
        </a>
        .
      </Typography>
    </Alert>
  )
}

export { SubmitError }
