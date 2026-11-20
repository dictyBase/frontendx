import { grey } from "@mui/material/colors"
import Typography from "@mui/material/Typography"

/**
 * ShippingMethodPrepaidNotice contains the notice for sending a prepaid
 * shipping label.
 */
const ShippingMethodPrepaidNotice = () => (
  <Typography
    sx={{
      backgroundColor: grey[200],
      borderRadius: 1,
      margin: 2,
      padding: 3,
    }}>
    If using a prepaid shipping label, please send ASAP to{" "}
    <a href="mailto:dictystocks@northwestern.edu" target="_top">
      dictystocks@northwestern.edu
    </a>
  </Typography>
)

export { ShippingMethodPrepaidNotice }
