import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"

type Properties = {
  /** Function called when selecting dropdown option */
  handleChange: (event: SelectChangeEvent<number>) => void
  /** List of values to display in dropdown */
  dropdownValues: Array<number>
  /** Initial value for dropdown */
  inputValue: number
  /** Input label */
  label: string
}

/**
 * OutlinedDropdown provides an outlined dropdown box that displays a
 * list of given values.
 */
const OutlinedDropdown = ({
  handleChange,
  dropdownValues,
  inputValue,
  label,
}: Properties) => (
  <FormControl variant="outlined">
    <InputLabel shrink id={`${label}-select-label`}>
      {label}
    </InputLabel>
    <Select
      labelId={`${label}-select-label`}
      id={`${label}-select`}
      value={inputValue}
      onChange={handleChange}
      label={label}
      margin="dense">
      {dropdownValues.map((option) => (
        <MenuItem key={option} value={option} data-testid={`option-${option}`}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)

export { OutlinedDropdown }
