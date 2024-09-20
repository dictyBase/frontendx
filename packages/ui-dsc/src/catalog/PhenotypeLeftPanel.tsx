import { Grid } from "@material-ui/core"
import { PhenotypeAutocomplete } from "./PhenotypeAutocomplete"
import { EnvironmentAutocomplete } from "./EnvironmentAutocomplete"
import { AssayAutocomplete } from "./AssayAutocomplete"
import { PhenotypeNotesField } from "./PhenotypeNotesField"

const PhenotypeLeftPanel = () => {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <PhenotypeAutocomplete />
      </Grid>
      <Grid item>
        <EnvironmentAutocomplete />
      </Grid>
      <Grid item>
        <AssayAutocomplete />
      </Grid>
      <Grid item>
        <PhenotypeNotesField />
      </Grid>
    </Grid>
  )
}

export { PhenotypeLeftPanel }
