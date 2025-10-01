import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Alert from "@mui/lab/Alert"
import { match } from "ts-pattern"
import { PlasmidAvailableDisplay } from "stock-center/src/components/PlasmidAvailableDisplay"
import { PlasmidCartItem } from "../types"


type Properties = {
  /** Data for the stock item */
  cartData: PlasmidCartItem
}

/** PlasmidDetailsCardHeader displays the header at the top of the  card
 * on the strain details page.
 */

const PlasmidDetailsCardHeader = ({ cartData }: Properties) => {

  return (
    <Grid item xs={12}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h2">Plasmid Details</Typography>
        </Grid>
        <Grid item>
          {match(cartData.in_stock)
            .with(true, () => <PlasmidAvailableDisplay cartData={cartData} />)
            .with(false, () => (
              <Alert
                sx={{ '& .MuiAlert-message': { padding: '0px' } }}
                icon={false}
                severity="error">
                Currently unavailable at the DSC
              </Alert>
            ))
            .exhaustive()}
        </Grid>
      </Grid>
    </Grid>
  )
}

export { PlasmidDetailsCardHeader }
