import { Theme } from "@mui/material/styles"
import { makeStyles } from "tss-react/mui"
import { grey } from "@mui/material/colors"
import Typography from "@mui/material/Typography"

const useStyles = makeStyles()((theme: Theme) => ({
  prepaid: {
    backgroundColor: grey[200],
    borderRadius: theme.spacing(1),
    margin: theme.spacing(2),
    padding: theme.spacing(3),
  },
}))

/**
 * ShippingMethodPrepaidNotice contains the notice for sending a prepaid
 * shipping label.
 */
const ShippingMethodPrepaidNotice = () => {
  const { classes } = useStyles()

  return (
    <Typography className={classes.prepaid}>
      If using a prepaid shipping label, please send ASAP to{" "}
      <a href="mailto:dictystocks@northwestern.edu" target="_top">
        dictystocks@northwestern.edu
      </a>
    </Typography>
  )
}

export { ShippingMethodPrepaidNotice }
