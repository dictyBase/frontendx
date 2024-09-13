import { PhenotypeInputPanel, PhenotypesLoader } from "@dictybase/ui-dsc"
import { Grid } from "@material-ui/core"

const AddPhenotypePage = () => (
  <Grid spacing={3} container>
    <Grid sm={3} xl={3} item>
      <PhenotypeInputPanel />
    </Grid>
    <Grid sm={9} xl={9} item>
      <PhenotypesLoader strainId="test" />
    </Grid>
  </Grid>
)

// eslint-disable-next-line import/no-default-export
export default AddPhenotypePage
