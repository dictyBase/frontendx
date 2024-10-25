import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { InputLabel, Select, MenuItem, FormControl, makeStyles } from "@material-ui/core"
import { useFormContext } from "react-hook-form"

enum Section {
  EMPTY = "",
  EXPLORE = "Explore",
  RESEARCH = "Research",
  COMMUNITY = "Community",
  INFORMATION = "DSC Information",
}

type SectionSelectProperties = {
  setSection: Dispatch<SetStateAction<Section>>
}

const useStyles = makeStyles({
  select: {
    minWidth: "9rem",
  },
})

const SectionSelect = ({ setSection }: SectionSelectProperties) => {
  const { select } = useStyles()
  const { register } = useFormContext()
  return (
    <FormControl variant="outlined">
      <InputLabel id="section-select-label"> Section </InputLabel>
      <Select
        id="section-select"
        label="Section"
        autoWidth
        className={select}
        {...register("section")}>
        <MenuItem value={Section.EXPLORE}>{Section.EXPLORE}</MenuItem>
        <MenuItem value={Section.RESEARCH}>{Section.RESEARCH}</MenuItem>
        <MenuItem value={Section.COMMUNITY}>{Section.COMMUNITY}</MenuItem>
        <MenuItem value={Section.INFORMATION}>{Section.INFORMATION}</MenuItem>
      </Select>
    </FormControl>
  )
}

export { SectionSelect }
