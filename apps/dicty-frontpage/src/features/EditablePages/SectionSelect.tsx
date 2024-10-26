import { match } from "ts-pattern"
import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  makeStyles,
} from "@material-ui/core"
import { useFormContext } from "react-hook-form"

enum Section {
  EMPTY = "",
  EXPLORE = "explore",
  RESEARCH = "research",
  COMMUNITY = "community",
  INFORMATION = "information",
}

const useStyles = makeStyles({
  formControl: {
    minWidth: "10rem",
  },
})

const renderValue = (section: unknown) =>
  match(section as Section)
    .with(Section.EXPLORE, () => "Explore")
    .with(Section.RESEARCH, () => "Research")
    .with(Section.COMMUNITY, () => "Community")
    .with(Section.INFORMATION, () => "DSC Information")
    .otherwise(() => "")

const SectionSelect = () => {
  const { formControl } = useStyles()
  const { register, getFieldState } = useFormContext()
  const { invalid } = getFieldState("section")
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
        <MenuItem value={Section.INFORMATION}>
          {renderValue(Section.INFORMATION)}
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export { SectionSelect }
