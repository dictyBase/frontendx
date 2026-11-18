import { Grid } from "@mui/material"
import {
  defaultFilter,
  plasmidGroupFilterOptions,
  searchFields,
} from "@dictybase/hook-dsc"
import { makeStyles } from "tss-react/mui"
import { FilterDropdown } from "./FilterDropdown"
import { SearchBox } from "./SearchBox"
import { AppBarHelp } from "./AppBarHelp"

const useStyles = makeStyles()({
  searchBox: {
    flexBasis: "41.5%",
  },
})

const SearchBarPlasmid = () => {
  const {
    classes: { searchBox },
  } = useStyles()
  return (
    <Grid container>
      <Grid item>
        <FilterDropdown
          options={plasmidGroupFilterOptions}
          param={defaultFilter.param}
          value={defaultFilter.value}
        />
      </Grid>
      <Grid item className={searchBox}>
        <SearchBox fields={searchFields} />
      </Grid>
      <Grid item>
        <AppBarHelp />
      </Grid>
    </Grid>
  )
}

export { SearchBarPlasmid }
