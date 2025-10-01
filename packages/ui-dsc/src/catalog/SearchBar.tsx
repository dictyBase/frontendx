import { Grid } from "@mui/material"
import { defaultFilter, fieldsToVariables } from "@dictybase/hook-dsc"
import { FilterDropdown } from "./FilterDropdown"
import { SearchBox } from "./SearchBox"
import { AppBarHelp } from "./AppBarHelp"


const SearchBar = () => {
  return (
    <Grid container>
      <Grid item>
        <FilterDropdown
          param={defaultFilter.param}
          value={defaultFilter.value}
        />
      </Grid>
      <Grid item sx={{ flexBasis: "41.5%" }}>
        <SearchBox fields={Object.keys(fieldsToVariables)} />
      </Grid>
      <Grid item>
        <AppBarHelp />
      </Grid>
    </Grid>
  )
}

export { SearchBar }
