import { Grid, TextField } from "@material-ui/core"
import { TextFieldProperties } from "../hooks/useTableFormControls"

type TableDialogTextFieldsProperties = {
  textFieldProperties: TextFieldProperties
}

const TableDialogTextFields = ({
  textFieldProperties,
}: TableDialogTextFieldsProperties) => (
  <>
    {textFieldProperties.map((property) => (
      <Grid key={property.label} item>
        <TextField
          fullWidth
          label={property.label}
          value={property.value}
          onChange={property.onChange}
        />
      </Grid>
    ))}
  </>
)

export default TableDialogTextFields
