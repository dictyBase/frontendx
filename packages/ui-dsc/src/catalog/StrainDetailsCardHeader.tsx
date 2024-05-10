import { ChangeEvent } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import Alert from "@material-ui/lab/Alert"
import { match, P } from "ts-pattern"
import { AvailableDisplay } from "stock-center/src/components/AvailableDisplay"
import { StrainCartItem } from "../types"

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
  /** Tab value */
  value: number
  /** Function for handling tab changes */
  handleChange: (event: ChangeEvent<{}>, value: any) => void
  /** Number of phenotypes */
  phenotypeLength: number
  /** Data for the stock item */
  cartData: StrainCartItem
}

/** StrainDetailsCardHeader displays the header at the top of the  card
 * on the strain details page.
 */

const StrainDetailsCardHeader = ({
  value,
  handleChange,
  phenotypeLength,
  cartData,
}: Properties) => {
  const classes = useStyles()

  const tabStyles = {
    root: classes.root,
    selected: classes.selected,
    wrapper: classes.wrapper,
  }

  return (
    <Grid item xs={12}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          {match(phenotypeLength)
            .with(0, () => <Typography variant="h2">Strain Details</Typography>)
            .with(
              P.when((c) => c > 0),
              () => (
                <Tabs
                  value={value}
                  onChange={handleChange}
                  classes={{ indicator: classes.indicator }}
                  aria-label="strain details tabs">
                  <Tab
                    classes={tabStyles}
                    label={
                      <Typography variant="body1">Strain Details</Typography>
                    }
                    {...a11yProperties(0)}
                  />
                  <Tab
                    classes={tabStyles}
                    label={
                      <Typography variant="body1">
                        Phenotypes
                        <span className={classes.number}>
                          {phenotypeLength}
                        </span>
                      </Typography>
                    }
                    {...a11yProperties(1)}
                  />
                </Tabs>
              ),
            )
            .otherwise(() => (
              <></>
            ))}
        </Grid>
        <Grid item>
          {match(cartData.in_stock)
            .with(true, () => <AvailableDisplay cartData={cartData} />)
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

export { StrainDetailsCardHeader }
