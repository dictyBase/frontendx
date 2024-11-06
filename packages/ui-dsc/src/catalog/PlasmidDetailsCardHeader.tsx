import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Alert from "@material-ui/lab/Alert"
import { match } from "ts-pattern"
import { AvailableDisplay } from "stock-center/src/components/AvailableDisplay"
import { PlasmidCartItem } from "../types"

// accessibility helper function
const a11yProperties = (index: number) => ({
  id: `strain-details-tab-${index}`,
  "aria-controls": `strain-details-tabpanel-${index}`,
})

const useStyles = makeStyles(({ palette }) => ({
  root: {
    "&:not(:first-of-type)": {
      marginLeft: "5px",
    },
    color: "#002f5e",
    opacity: 1,
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    border: "1px #e4e4e4 solid",
    borderBottomWidth: 0,
  },
  selected: {
    background: "#f4f6f8",
    border: "none",
    "& $wrapper": {
      opacity: 1,
    },
  },
  wrapper: {
    opacity: 0.7,
  },
  indicator: {
    display: "none",
  },
  number: {
    background: palette.primary.main,
    borderRadius: "0.8em",
    color: "#ffffff",
    display: "inline-block",
    fontWeight: 700,
    fontSize: "0.8rem",
    marginLeft: "5px",
    textAlign: "center",
    width: "1.5em",
  },
  message: {
    padding: "0px",
  },
}))

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
            .with(true, () => <></>)
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
