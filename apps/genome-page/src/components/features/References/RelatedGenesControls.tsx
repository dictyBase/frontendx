import { ChangeEventHandler } from "react"
import {
  Grid,
  Paper,
  TextField,
  Typography,
  IconButton,
  SelectChangeEvent,
} from "@mui/material"
import { teal } from "@mui/material/colors"
import FilterListIcon from "@mui/icons-material/FilterList"
import { GeneGroupSelect, GeneGroups } from "./GeneGroupSelect"

type RelatedGenesControlsProperties = {
  totalGeneCount: number
  filteredGeneCount: number
  filter: string
  onFilterChange: ChangeEventHandler<HTMLInputElement>
  group: GeneGroups
  onGroupChange: (event: SelectChangeEvent<GeneGroups>) => void
}

const RelatedGenesControls = ({
  totalGeneCount,
  filteredGeneCount,
  filter,
  onFilterChange,
  group,
  onGroupChange,
}: RelatedGenesControlsProperties) => (
  <Paper sx={{ backgroundColor: teal[50], borderRadius: "1rem" }}>
    <Grid container alignItems="center" spacing={2} sx={{ padding: "1rem" }}>
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
          sx={{ backgroundColor: "background.paper" }}
        />
      </Grid>
      <Grid item>
        <GeneGroupSelect value={group} onChange={onGroupChange} />
      </Grid>
      <Grid item>
        <Typography sx={{ color: teal[900], fontWeight: 500 }}>
          {filteredGeneCount} of {totalGeneCount} Genes
        </Typography>
      </Grid>
    </Grid>
  </Paper>
)

export { RelatedGenesControls }
