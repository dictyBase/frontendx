import { Grid } from "@material-ui/core"
import { defaultFilter, fieldsToVariables } from "@dictybase/hook-dsc"
import { type SetURLSearchParams } from "react-router-dom"
import { FilterDropdown } from "./FilterDropdown"
import { SearchBox } from "./SearchBox"
import { AppBarHelp } from "./AppBarHelp"

type SearchBarProperties = {
  setSearchParameters: SetURLSearchParams
}

const SearchBar = ({ setSearchParameters }: SearchBarProperties) => (
  <Grid container>
    <Grid item>
      <FilterDropdown
        searchParamFn={setSearchParameters}
        param={defaultFilter.param}
        value={defaultFilter.value}
      />
    </Grid>
    <Grid item style={{ flexGrow: 1 }}>
      <SearchBox fields={Object.keys(fieldsToVariables)} />
    </Grid>
    <Grid item>
      <AppBarHelp />
    </Grid>
  </Grid>
)

export { SearchBar }
