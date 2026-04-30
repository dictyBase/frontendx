import { Grid } from "@mui/material"
import {
  defaultFilter,
  strainGroupFilterOptions,
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

const SearchBarStrain = () => {
  const { classes } = useStyles()
  return (
    <Grid container>
      <Grid item>
        <FilterDropdown
          options={strainGroupFilterOptions}
          param={defaultFilter.param}
          value={defaultFilter.value}
        />
      </Grid>
      <Grid item className={classes.searchBox}>
        <SearchBox fields={searchFields} />
      </Grid>
      <Grid item>
        <AppBarHelp />
      </Grid>
    </Grid>
  )
}

export { SearchBarStrain }
