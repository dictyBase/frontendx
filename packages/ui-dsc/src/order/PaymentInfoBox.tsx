import { Link } from "react-router-dom"
import { blue } from "@mui/material/colors"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import { PaymentInfoBoxItems } from "./PaymentInfoBoxItems"

/**
 * PaymentInfoBox contains general information about making a payment.
 */
const PaymentInfoBox = () => (
  <Grid container>
    <Grid
      item
      xs={12}
      sx={{
        backgroundColor: blue[100],
        borderRadius: 1,
        marginTop: 2,
        marginBottom: 2,
        padding: 3,
      }}>
      <PaymentInfoBoxItems />
      <Box mb={2} />
      <Button
        component={Link}
        to="/information/payment"
        target="_blank"
        rel="noopener noreferrer"
        variant="outlined"
        endIcon={<OpenInNewIcon />}>
        Payment Information
      </Button>
    </Grid>
  </Grid>
)

export { PaymentInfoBox }
