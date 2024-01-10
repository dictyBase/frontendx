import { ACCESS } from "auth"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import {
  useStyles,
  Title,
  Heading,
  IntroEditor,
  Slide,
  CatalogLinks,
  FileLinks,
} from "@dictybase/ui-dsc"
import { Link as RouterLink } from "react-router-dom"

/**
 * EditableHomepage is the main homepage component for DSC.
 */
const EditableHomepage = () => {
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
          alignItems="flex-end"
          direction="column">
          <Button
            component={RouterLink}
            to="/home/edit"
            color="primary"
            variant="contained"
            size="large"
            style={{ width: "15%" }}>
            Edit Content
          </Button>
          <IntroEditor />
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
export default EditableHomepage
export const access = ACCESS.private
export const roles = ["content-admin"]
