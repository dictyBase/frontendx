import { Helmet } from "react-helmet"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import {
  Slideshow,
  useStyles,
  EditablePanel,
  EditorHolder,
  HomepageColumn,
} from "@dictybase/ui-dsc"
// import { Availability } from "./Availability"
// import OtherMaterials from "./OtherMaterials"
// import EditablePanel from "./EditablePanel"
// import StandardOperatingProcedures from "./StandardOperatingProcedures"
// import { useAuthStore } from "features/Authentication/AuthStore"
import {
  downloadLinks,
  // infoLinks,
  materialsLinks,
  // miscLinks,
} from "../linkLists"
// import EditorHolder from "./EditorHolder"

const metaDesc =
  "The Dicty Stock Center is a rapidly growing central repository for Dictyostelium discoideum strains and those of related species, plasmids, commonly used food bacteria, and other materials such as antibodies."

/**
 * Homepage is the main homepage component for DSC.
 */

const Homepage = () => {
  const classes = useStyles({})
  return (
    <div>
      <Helmet>
        <title>Dicty Stock Center</title>
        <meta name="description" content={metaDesc} />
      </Helmet>
      <Grid container justifyContent="space-between" spacing={3}>
        <Grid item className={classes.header}>
          <Typography variant="h1">
            Welcome to Dicty Stock Center (DSC)
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.intro}>
          <EditorHolder minHeight="140px">
            <EditablePanel slug="dsc-intro" skeletonCount={5} />
          </EditorHolder>
        </Grid>
        <Grid container item xs={12} spacing={4} justifyContent="flex-start">
          <Grid item xs={4}>
            <Slideshow />
          </Grid>
          <Grid container item xs={4} direction="column">
            <HomepageColumn
              title="Catalogs/Materials"
              entries={materialsLinks}
            />
          </Grid>
          <Grid container item xs={4} direction="column">
            <HomepageColumn title="Downloads" entries={downloadLinks} />
          </Grid>
        </Grid>
      </Grid>
    </div>
    /* <HomepageColumn
          components={[
            <EditorHolder minHeight="300px">
              <EditablePanel slug="dsc-about" skeletonCount={10} />
            </EditorHolder>,
            <LinkList list={miscLinks} bgColor="blue" />,
          ]}
        />
        <HomepageColumn
          components={[
            <LinkList list={infoLinks} bgColor="blue" />,
            <Availability />,
            <OtherMaterials />,
            <StandardOperatingProcedures />,
          ]}
        /> */
  )
}

// eslint-disable-next-line import/no-default-export
export default Homepage
