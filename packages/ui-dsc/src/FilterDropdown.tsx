import { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import { deepPurple } from "@material-ui/core/colors"
import { useConfigureStrainCatalogSearchDropdown } from "@dictybase/hook-dsc"
import { SetURLSearchParameters } from "@dictybase/hook"
import { v4 as uuid4 } from "uuid"

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    background: "white",
    color: deepPurple[500],
    fontWeight: 200,
    borderStyle: "none",
    borderWidth: 2,
    borderRadius: 12,
    boxShadow: "0px 5px 8px -3px rgba(0,0,0,0.14)",
    "&:focus": {
      borderRadius: 12,
      background: "white",
      borderColor: deepPurple[100],
    },
  },
  paper: {
    borderRadius: 12,
    marginTop: 8,
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
    background: "white",
    "& li": {
      fontWeight: 200,
      paddingTop: 12,
      paddingBottom: 12,
    },
    "& li:hover": {
      background: deepPurple[100],
    },
    "& li.Mui-selected": {
      color: "white",
      background: deepPurple[400],
    },
    "& li.Mui-selected:hover": {
      background: deepPurple[500],
    },
  },
})

/**
 * The props for {@link FilterDropdown}
 */
export interface FilterDropdownProperties {
  /** value for filter parameter */
  searchParamFn: SetURLSearchParameters
  value: string
  param: string
}

/**
 * Displays a dropdown menu of the given items. Selecting any particular item
 * will append its filter parameter in the query parameter of browser's url.
 */
export const FilterDropdown = ({
  searchParamFn,
  param,
  value,
}: FilterDropdownProperties) => {
  const classes = useStyles()
  const [filterValue, setFilterValue] = useState<string>(value)
  const items = useConfigureStrainCatalogSearchDropdown()

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    const newValue = event.target.value as string
    setFilterValue(newValue)
    searchParamFn({ [param]: newValue })
  }

  return (
    <div>
      <FormControl variant="outlined">
        <Select
          className={classes.root}
          disableUnderline
          MenuProps={{
            classes: { paper: classes.paper, list: classes.list },
            anchorOrigin: { vertical: "bottom", horizontal: "left" },
          }}
          onChange={handleChange}
          value={filterValue}>
          {items.map((object) => (
            <MenuItem value={object.value} key={uuid4()}>
              {object.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
