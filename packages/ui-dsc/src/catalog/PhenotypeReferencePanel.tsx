import { Grid } from "@material-ui/core"
import { PhenotypeReferenceField } from "./PhenotypeReferenceField"
import { PhenotypeReferenceDetails } from "./PhenotypeReferenceDetails"

const PhenotypeReferencePanel = () => (
  <Grid container direction="column" spacing={2}>
    <Grid item>
      <PhenotypeReferenceField />
    </Grid>
    <Grid item>
      <PhenotypeReferenceDetails />
    </Grid>
  </Grid>
)

export { PhenotypeReferencePanel }
