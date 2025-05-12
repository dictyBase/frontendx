import { ChangeEventHandler } from "react"
import { Select, MenuItem, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  select: {
    backgroundColor: theme.palette.background.paper,
  },
}))

enum GeneGroups {
  ALL,
  NAMED,
  UNNAMED,
}

type GeneGroupSelectProperties = {
  value: GeneGroups
  onChange: ChangeEventHandler<{ value: unknown }>
}

const GeneGroupSelect = ({ value, onChange }: GeneGroupSelectProperties) => {
  const classes = useStyles()
  return (
    <Select
      value={value}
      onChange={onChange}
      variant="outlined"
      className={classes.select}>
      <MenuItem value={GeneGroups.ALL}> All Gene Types </MenuItem>
      <MenuItem value={GeneGroups.NAMED}> Named Genes </MenuItem>
      <MenuItem value={GeneGroups.UNNAMED}> Unnamed Genes </MenuItem>
    </Select>
  )
}
export { GeneGroupSelect, GeneGroups }
