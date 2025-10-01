import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/styles"
import { Title, Slide, CatalogLinks, FileLinks } from "@dictybase/ui-dsc"
import { ACCESS } from "@dictybase/auth-mui5"
import { StockCenterInfoWithAuth } from "../components/StockCenterInfoWithAuth"

const useStyles = makeStyles({
  intro: {
    paddingTop: "0px !important",
    paddingBottom: "12px !important",
  },
})
/**
 * Homepage is the main homepage component for DSC.
 */
const ShowHomepage = () => {
  const classes = useStyles()
  return (
    <>
      <Title />
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        spacing={3}>
        <Grid item xs={12} className={classes.intro}>
          <StockCenterInfoWithAuth />
        </Grid>
        <Grid
          container
          direction="row"
          item
          xs={12}
          spacing={4}
          justifyContent="flex-start">
          <Grid item xs={4}>
            <Slide />
          </Grid>
          <Grid container item xs={4} direction="column">
            <CatalogLinks />
          </Grid>
          <Grid container item xs={4} direction="column">
            <FileLinks />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default ShowHomepage
export const access = ACCESS.public
