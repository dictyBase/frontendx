import { match } from "ts-pattern"
import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  makeStyles,
} from "@material-ui/core"
import { useFormContext } from "react-hook-form"
import { getFormErrorMessage } from "../getFormErrorMessage"

enum Section {
  EMPTY = "",
  INFORMATION = "information",
}

const useStyles = makeStyles({
  formControl: {
    minWidth: "10rem",
  },
})

const renderValue = (section: unknown) =>
  match(section as Section)
    .with(Section.INFORMATION, () => "DSC Information")
    .otherwise(() => "")

const SectionSelect = () => {
  const { formControl } = useStyles()
  const { register, getFieldState } = useFormContext()
  const { invalid, error } = getFieldState("section")
  return (
    <FormControl
      fullWidth
      variant="outlined"
      error={invalid}
      className={formControl}>
      <InputLabel id="section-select-label"> * Section </InputLabel>
      <Select
        id="section-select"
        label="Section"
        labelId="section-select-label"
        defaultValue={Section.EMPTY}
        renderValue={renderValue}
        {...register("section")}>
        <MenuItem value={Section.INFORMATION}>
          {renderValue(Section.INFORMATION)}
        </MenuItem>
      </Select>
      <FormHelperText>{getFormErrorMessage(error)}</FormHelperText>
    </FormControl>
  )
}

export { SectionSelect }
