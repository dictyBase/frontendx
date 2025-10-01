import Typography from "@mui/material/Typography"
import { grey } from "@mui/material/colors"


const WaiverRequestInformation = () => {
  return (
    <Typography sx={(theme) => ({
      backgroundColor: grey[200],
      border: "1px solid #e6f2ff",
      borderRadius: theme.spacing(1),
      margin: theme.spacing(2),
      padding: theme.spacing(3),
    })}>
      Please send an email to
      <a href="mailto:dictystocks@northwestern.edu" target="_top">
        dictystocks@northwestern.edu
      </a>
      describing why you need a waiver.
    </Typography>
  )
}

export { WaiverRequestInformation }
