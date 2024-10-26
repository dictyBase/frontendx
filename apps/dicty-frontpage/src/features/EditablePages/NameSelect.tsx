import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  makeStyles,
} from "@material-ui/core"
import { useFormContext } from "react-hook-form"

const useStyles = makeStyles({
  select: {
    minWidth: "9rem",
  },
})

const nameSets = {
  explore: [],
  research: [],
  community: [],
  information: [],
}

const NameSelect = () => {
  const { select } = useStyles()
  const { register, getFieldState } = useFormContext()
  return (
    <FormControl variant="outlined">
      <InputLabel id="name-select-label"> Section </InputLabel>
      <Select
        id="name-select"
        labelId="name-select-label"
        label="Section"
        autoWidth
        defaultValue=""
        className={select}
        {...register("name")}>
        <MenuItem value={Section.EXPLORE}>{Section.EXPLORE}</MenuItem>
        <MenuItem value={Section.RESEARCH}>{Section.RESEARCH}</MenuItem>
        <MenuItem value={Section.COMMUNITY}>{Section.COMMUNITY}</MenuItem>
        <MenuItem value={Section.INFORMATION}>{Section.INFORMATION}</MenuItem>
      </Select>
    </FormControl>
  )
}

export { NameSelect }
