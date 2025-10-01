import { ChangeEvent } from "react"
import Grid from "@mui/material/Grid"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Alert from "@mui/lab/Alert"
import Box from "@mui/material/Box"
import { match, P } from "ts-pattern"
import { StrainAvailableDisplay } from "stock-center/src/components/StrainAvailableDisplay"
import { StrainCartItem } from "../types"

// accessibility helper function
const a11yProperties = (index: number) => ({
  id: `strain-details-tab-${index}`,
  "aria-controls": `strain-details-tabpanel-${index}`,
})


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
                  sx={{
                    "& .MuiTabs-indicator": {
                      display: "none",
                    },
                  }}
                  aria-label="strain details tabs">
                  <Tab
                    sx={{
                      "&:not(:first-of-type)": {
                        marginLeft: "5px",
                      },
                      color: "#002f5e",
                      opacity: 1,
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                      border: "1px #e4e4e4 solid",
                      borderBottomWidth: 0,
                      "&.Mui-selected": {
                        background: "#f4f6f8",
                        border: "none",
                        "& .MuiTab-wrapper": {
                          opacity: 1,
                        },
                      },
                      "& .MuiTab-wrapper": {
                        opacity: 0.7,
                      },
                    }}
                    label={
                      <Typography variant="body1">Strain Details</Typography>
                    }
                    {...a11yProperties(0)}
                  />
                  <Tab
                    sx={{
                      "&:not(:first-of-type)": {
                        marginLeft: "5px",
                      },
                      color: "#002f5e",
                      opacity: 1,
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                      border: "1px #e4e4e4 solid",
                      borderBottomWidth: 0,
                      "&.Mui-selected": {
                        background: "#f4f6f8",
                        border: "none",
                        "& .MuiTab-wrapper": {
                          opacity: 1,
                        },
                      },
                      "& .MuiTab-wrapper": {
                        opacity: 0.7,
                      },
                    }}
                    label={
                      <Typography variant="body1">
                        Phenotypes
                        <Box component="span" sx={{
                          background: (theme) => theme.palette.primary.main,
                          borderRadius: "0.8em",
                          color: "#ffffff",
                          display: "inline-block",
                          fontWeight: 700,
                          fontSize: "0.8rem",
                          marginLeft: "5px",
                          textAlign: "center",
                          width: "1.5em",
                        }}>
                          {phenotypeLength}
                        </Box>
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
            .with(true, () => <StrainAvailableDisplay cartData={cartData} />)
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

export { StrainDetailsCardHeader }
