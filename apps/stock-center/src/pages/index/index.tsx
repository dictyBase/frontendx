import Grid from "@material-ui/core/Grid"
import {
  useStyles,
  Title,
  Heading,
  IntroEditor,
  Slide,
  CatalogLinks,
  FileLinks,
} from "@dictybase/ui-dsc"

/**
 * Homepage is the main homepage component for DSC.
 */
const Homepage = () => {
  const classes = useStyles({})
  return (
    <>
      <Title />
      <Grid container justifyContent="space-between" spacing={3}>
        <Heading />
        <Grid item xs={12} className={classes.intro}>
          <IntroEditor />
        </Grid>
        <Grid container item xs={12} spacing={4} justifyContent="flex-start">
          <Slide />
          <CatalogLinks />
          <FileLinks />
        </Grid>
      </Grid>
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default Homepage
