import { Grid } from "@material-ui/core"
import {
  defaultFilter,
  variablesFromStrainParameters,
} from "@dictybase/hook-dsc"
import { makeStyles } from "@material-ui/core/styles"
import { FilterDropdown } from "./FilterDropdown"
import { SearchBox } from "./SearchBox"
import { AppBarHelp } from "./AppBarHelp"

const plasmidGroupFilterOptions = [
  {
    label: "Regular",
    value: "regular",
  },
  {
    label: "Golden Braid",
    value: "goldenbraid",
  },
]

const plasmidSearchFields = ["descriptor", "summary"]

const useStyles = makeStyles({
  searchBox: {
    flexBasis: "41.5%",
  },
})

const SearchBarPlasmid = () => {
  const { searchBox } = useStyles()
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
        <SearchBox fields={plasmidSearchFields} />
      </Grid>
      <Grid item>
        <AppBarHelp />
      </Grid>
    </Grid>
  )
}

export { SearchBarPlasmid }
