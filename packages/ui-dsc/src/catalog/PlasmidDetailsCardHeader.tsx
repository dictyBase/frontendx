import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Alert from "@material-ui/lab/Alert"
import { match } from "ts-pattern"
import { PlasmidAvailableDisplay } from "stock-center/src/components/PlasmidAvailableDisplay"
import { PlasmidCartItem } from "../types"

const useStyles = makeStyles({
  message: {
    padding: "0px",
  },
})

type Properties = {
  /** Data for the stock item */
  cartData: PlasmidCartItem
}

/** PlasmidDetailsCardHeader displays the header at the top of the  card
 * on the strain details page.
 */

const PlasmidDetailsCardHeader = ({ cartData }: Properties) => {
  const classes = useStyles()

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
                classes={{ message: classes.message }}
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
