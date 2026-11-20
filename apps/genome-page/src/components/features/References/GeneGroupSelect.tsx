import { Select, MenuItem, SelectChangeEvent } from "@mui/material"

enum GeneGroups {
  ALL,
  NAMED,
  UNNAMED,
}

type GeneGroupSelectProperties = {
  value: GeneGroups
  onChange: (event: SelectChangeEvent<GeneGroups>) => void
}

const GeneGroupSelect = ({ value, onChange }: GeneGroupSelectProperties) => (
  <Select
    value={value}
    onChange={onChange}
    variant="outlined"
    sx={{ backgroundColor: "background.paper" }}>
    <MenuItem value={GeneGroups.ALL}> All Gene Types </MenuItem>
    <MenuItem value={GeneGroups.NAMED}> Named Genes </MenuItem>
    <MenuItem value={GeneGroups.UNNAMED}> Unnamed Genes </MenuItem>
  </Select>
)
export { GeneGroupSelect, GeneGroups }
