import { Link } from "react-router-dom"
import { makeStyles } from 'tss-react/mui';
import { blue } from "@mui/material/colors"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import { PaymentInfoBoxItems } from "./PaymentInfoBoxItems"

const useStyles = makeStyles()((theme) => ({
  panel: {
    backgroundColor: blue[100],
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(3),
  },
}));

/**
 * PaymentInfoBox contains general information about making a payment.
 */
const PaymentInfoBox = () => {
  const { classes } = useStyles()

  return (
    <Grid container>
      <Grid item xs={12} className={classes.panel}>
        <PaymentInfoBoxItems />
        <Box mb={2} />
        <Button
          component={Link}
          to="/information/payment"
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          color="primary"
          endIcon={<OpenInNewIcon />}>
          Payment Information
        </Button>
      </Grid>
    </Grid>
  )
}

export { PaymentInfoBox }
