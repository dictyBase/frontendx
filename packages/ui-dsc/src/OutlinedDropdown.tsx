import React from "react"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import OutlinedInput from "@mui/material/OutlinedInput"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"

type Properties = {
  /** Function called when selecting dropdown option */
  handleChange: (
    event: React.ChangeEvent<{
      name?: string
      value: unknown
    }>,
  ) => void
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
}: Properties) => {
  const labelReference = React.useRef<HTMLLabelElement>(null)
  const [labelWidth, setLabelWidth] = React.useState(0)

  React.useEffect(() => {
    if (labelReference && labelReference.current) {
      setLabelWidth(labelReference.current.offsetWidth)
    }
  }, [])

  return (
    <FormControl variant="outlined">
      <InputLabel ref={labelReference} shrink id={`${label}-select-label`}>
        {label}
      </InputLabel>
      <Select
        labelId={`${label}-select-label`}
        id={`${label}-select`}
        value={inputValue}
        onChange={handleChange}
        input={
          <OutlinedInput
            notched
            name="quantity"
            id="outlined-input"
            margin="dense"
            labelWidth={labelWidth}
          />
        }>
        {dropdownValues.map((option) => (
          <MenuItem
            key={option}
            value={option}
            data-testid={`option-${option}`}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export { OutlinedDropdown }
