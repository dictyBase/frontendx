import { ChangeEventHandler } from "react"
import {
  Grid,
  Paper,
  TextField,
  Typography,
  IconButton,
  makeStyles,
} from "@material-ui/core"
import { teal } from "@material-ui/core/colors"
import FilterListIcon from "@material-ui/icons/FilterList"
import { GeneGroupSelect, GeneGroups } from "./GeneGroupSelect"

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "1rem",
  },
  surface: {
    backgroundColor: teal[50],
    borderRadius: "1rem",
  },
  textField: {
    backgroundColor: theme.palette.background.paper,
  },
  text: {
    color: teal[900],
    fontWeight: 500,
  },
}))

type RelatedGenesControlsProperties = {
  totalGeneCount: number
  filteredGeneCount: number
  filter: string
  onFilterChange: ChangeEventHandler<HTMLInputElement>
  group: GeneGroups,
  onGroupChange: ChangeEventHandler<{ value: unknown }>
}

const RelatedGenesControls = ({
  totalGeneCount,
  filteredGeneCount,
  filter,
  onFilterChange,
  group,
  onGroupChange,
}: RelatedGenesControlsProperties) => {
  const classes = useStyles()
  return (
    <Paper className={classes.surface}>
      <Grid
        container
        alignItems="center"
        spacing={2}
        className={classes.container}>
        <Grid item>
          <TextField
            value={filter}
            placeholder="Filter Genes"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <IconButton disabled>
                  <FilterListIcon />
                </IconButton>
              ),
            }}
            onChange={onFilterChange}
            className={classes.textField}
          />
        </Grid>
        <Grid item>
          <GeneGroupSelect value={group} onChange={onGroupChange} />
        </Grid>
        <Grid item>
          <Typography className={classes.text}>
            {filteredGeneCount} of {totalGeneCount} Genes
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export { RelatedGenesControls }
