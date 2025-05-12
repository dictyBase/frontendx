import { ChangeEventHandler } from "react"
import {
  Box,
  Paper,
  TextField,
  IconButton,
  makeStyles,
} from "@material-ui/core"
import { teal } from "@material-ui/core/colors"
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "1rem",
    backgroundColor: teal[50],
  },
  textField: {
    backgroundColor: theme.palette.background.paper
  }
}))

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
              <IconButton disabled>
                <FilterListIcon />
              </IconButton>
            ),
          }}
          onChange={onChange}
          className={classes.textField}
        />
      </Box>
    </Paper>
  )
}

export { RelatedGenesControls }
