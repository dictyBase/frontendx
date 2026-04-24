import { match } from "ts-pattern"
import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@mui/material"
import { makeStyles } from "tss-react/mui"
import { useFormContext } from "react-hook-form"
import { getFormErrorMessage } from "../../common/utils/getFormErrorMessage"

enum Section {
  EMPTY = "",
  EXPLORE = "explore",
  RESEARCH = "research",
  COMMUNITY = "community",
}

const useStyles = makeStyles()({
  formControl: {
    minWidth: "10rem",
  },
})

const renderValue = (section: unknown) =>
  match(section as Section)
    .with(Section.EXPLORE, () => "Explore")
    .with(Section.RESEARCH, () => "Research")
    .with(Section.COMMUNITY, () => "Community")
    .otherwise(() => "")

const SectionSelect = () => {
  const {
    classes: { formControl },
  } = useStyles()
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
