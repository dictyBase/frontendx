import { Grid } from "@material-ui/core"
import { defaultFilter, fieldsToVariables } from "@dictybase/hook-dsc"
import { makeStyles } from "@material-ui/core/styles"
import { FilterDropdown } from "./FilterDropdown"
import { SearchBox } from "./SearchBox"
import { AppBarHelp } from "./AppBarHelp"

const plasmidFilterOptions = [
  {
    label: "Regular",
    value: "regular",
  },
  {
    label: "Golden Braid",
    value: "goldenbraid",
  },
]

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
          options={plasmidFilterOptions}
          param={defaultFilter.param}
          value={defaultFilter.value}
        />
      </Grid>
      <Grid item className={searchBox}>
        <SearchBox fields={Object.keys(fieldsToVariables)} />
      </Grid>
      <Grid item>
        <AppBarHelp />
      </Grid>
    </Grid>
  )
}

export { SearchBarPlasmid }
