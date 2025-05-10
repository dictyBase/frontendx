import { ChangeEventHandler } from "react"
import {
  Box,
  Paper,
  TextField,
  IconButton,
  makeStyles,
} from "@material-ui/core"
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles({
  container: {
    padding: "1rem",
  },
})

type RelatedGenesControlsProperties = {
 filter: string
 onChange: ChangeEventHandler<HTMLInputElement>
}

const RelatedGenesControls = ({ filter, onChange }: RelatedGenesControlsProperties) => {
  const classes = useStyles()
  return (
    <Paper>
      <Box className={classes.container}>
        <TextField
          value={filter}
          placeholder="Filter Genes"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <IconButton>
                <FilterListIcon />
              </IconButton>
            ),
          }}
          onChange={onChange}
        />
      </Box>
    </Paper>
  )
}

export { RelatedGenesControls }
