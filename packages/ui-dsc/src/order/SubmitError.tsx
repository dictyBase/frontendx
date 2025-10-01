import Alert from "@mui/lab/Alert"
import Typography from "@mui/material/Typography"

/**
 * SubmitError is the display if there is an error in form submission.
 */
const SubmitError = () => {
  return (
    <Alert severity="error" sx={{ marginBottom: 2 }}>
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
