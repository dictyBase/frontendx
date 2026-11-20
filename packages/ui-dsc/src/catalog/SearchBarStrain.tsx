import { Grid } from "@mui/material"
import {
  defaultFilter,
  strainGroupFilterOptions,
  searchFields,
} from "@dictybase/hook-dsc"
import { FilterDropdown } from "./FilterDropdown"
import { SearchBox } from "./SearchBox"
import { AppBarHelp } from "./AppBarHelp"

const SearchBarStrain = () => (
  <Grid container>
    <Grid item>
      <FilterDropdown
        options={strainGroupFilterOptions}
        param={defaultFilter.param}
        value={defaultFilter.value}
      />
    </Grid>
    <Grid item sx={{ flexBasis: "41.5%" }}>
      <SearchBox fields={searchFields} />
    </Grid>
    <Grid item>
      <AppBarHelp />
    </Grid>
  </Grid>
)

export { SearchBarStrain }
