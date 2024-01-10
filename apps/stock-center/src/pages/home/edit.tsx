import { ACCESS } from "auth"
import Grid from "@material-ui/core/Grid"
import {
  Title,
  Heading,
  IntroEditor,
  Slide,
  CatalogLinks,
  FileLinks,
  useStyles,
} from "@dictybase/ui-dsc"

/**
 * EditHomepage is the main homepage component for DSC.
 */
const EditHomepage = () => {
  const classes = useStyles({})
  return (
    <>
      <Title />
      <Grid container justifyContent="space-between" spacing={3}>
        <Heading />
        <Grid
          container
          item
          xs={12}
          className={classes.intro}
          direction="column">
          <IntroEditor isEditable />
        </Grid>
        <Grid container item xs={12} spacing={4} justifyContent="flex-start">
          <Slide />
          <CatalogLinks isAuthorized />
          <FileLinks />
        </Grid>
      </Grid>
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default EditHomepage
export const access = ACCESS.private
export const roles = ["content-admin"]
