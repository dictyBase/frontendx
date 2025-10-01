import { grey } from "@mui/material/colors"
import Typography from "@mui/material/Typography"


/**
 * ShippingMethodPrepaidNotice contains the notice for sending a prepaid
 * shipping label.
 */
const ShippingMethodPrepaidNotice = () => {
  return (
    <Typography sx={(theme) => ({
      backgroundColor: grey[200],
      borderRadius: theme.spacing(1),
      margin: theme.spacing(2),
      padding: theme.spacing(3),
    })}>
      If using a prepaid shipping label, please send ASAP to{" "}
      <a href="mailto:dictystocks@northwestern.edu" target="_top">
        dictystocks@northwestern.edu
      </a>
    </Typography>
  )
}

export { ShippingMethodPrepaidNotice }
