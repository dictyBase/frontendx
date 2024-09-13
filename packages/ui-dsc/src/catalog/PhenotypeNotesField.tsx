import { TextField } from "@material-ui/core"

const PhenotypeNotesField = () => (
  <TextField
    fullWidth
    multiline
    variant="outlined"
    id="phenotype-notes"
    label="Notes"
    minRows={4}
    maxRows={4}
  />
)

export { PhenotypeNotesField }
