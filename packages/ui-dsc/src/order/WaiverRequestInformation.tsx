import Typography from "@mui/material/Typography"
import { grey } from "@mui/material/colors"

const WaiverRequestInformation = () => (
  <Typography
    sx={{
      backgroundColor: grey[200],
      border: "1px solid #e6f2ff",
      borderRadius: 1,
      margin: 2,
      padding: 3,
    }}>
    Please send an email to{" "}
    <a href="mailto:dictystocks@northwestern.edu" target="_top">
      dictystocks@northwestern.edu
    </a>{" "}
    describing why you need a waiver.
  </Typography>
)

export { WaiverRequestInformation }
