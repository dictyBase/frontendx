import { match } from "ts-pattern"
import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@mui/material"
import { useFormContext } from "react-hook-form"
import { getFormErrorMessage } from "../../common/utils/getFormErrorMessage"

enum Section {
  EMPTY = "",
  EXPLORE = "explore",
  RESEARCH = "research",
  COMMUNITY = "community",
}

const renderValue = (section: unknown) =>
  match(section as Section)
    .with(Section.EXPLORE, () => "Explore")
    .with(Section.RESEARCH, () => "Research")
    .with(Section.COMMUNITY, () => "Community")
    .otherwise(() => "")

const SectionSelect = () => {
  const { register, getFieldState } = useFormContext()
  const { invalid, error } = getFieldState("section")
  return (
    <FormControl
      fullWidth
      variant="outlined"
      error={invalid}
      sx={{ minWidth: "12rem", width: "min-content" }}>
      <InputLabel id="section-select-label"> * Section </InputLabel>
      <Select
        id="section-select"
        label="Section"
        labelId="section-select-label"
        defaultValue={Section.EMPTY}
        renderValue={renderValue}
        {...register("section")}>
        <MenuItem value={Section.EXPLORE}>
          {renderValue(Section.EXPLORE)}
        </MenuItem>
        <MenuItem value={Section.RESEARCH}>
          {renderValue(Section.RESEARCH)}
        </MenuItem>
        <MenuItem value={Section.COMMUNITY}>
          {renderValue(Section.COMMUNITY)}
        </MenuItem>
      </Select>
      <FormHelperText>{getFormErrorMessage(error)}</FormHelperText>
    </FormControl>
  )
}

export { SectionSelect }
