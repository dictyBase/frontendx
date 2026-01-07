import { Grid } from "@mui/material"
import { defaultFilter, fieldsToVariables } from "@dictybase/hook-dsc"
import { makeStyles } from "tss-react/mui"
import { FilterDropdown } from "./FilterDropdown"
import { SearchBox } from "./SearchBox"
import { AppBarHelp } from "./AppBarHelp"

const useStyles = makeStyles()({
  searchBox: {
    flexBasis: "41.5%",
  },
})

const SearchBar = () => {
  const { classes } = useStyles()
  return (
    <Grid container>
      <Grid item>
        <FilterDropdown
          param={defaultFilter.param}
          value={defaultFilter.value}
        />
      </Grid>
      <Grid item className={classes.searchBox}>
        <SearchBox fields={Object.keys(fieldsToVariables)} />
      </Grid>
      <Grid item>
        <AppBarHelp />
      </Grid>
    </Grid>
  )
}

export { SearchBar }
