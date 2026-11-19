import { Grid } from "@mui/material"
import {
  defaultFilter,
  plasmidGroupFilterOptions,
  searchFields,
} from "@dictybase/hook-dsc"
import { FilterDropdown } from "./FilterDropdown"
import { SearchBox } from "./SearchBox"
import { AppBarHelp } from "./AppBarHelp"

const SearchBarPlasmid = () => (
  <Grid container>
    <Grid item>
      <FilterDropdown
        options={plasmidGroupFilterOptions}
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

export { SearchBarPlasmid }
