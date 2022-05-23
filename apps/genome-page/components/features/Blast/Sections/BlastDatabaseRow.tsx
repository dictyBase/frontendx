import useStyles from "../../../../styles/blastContainerStyles"
import {
  Typography,
  Card,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core"

const BlastDatabaseRow = () => {
  const classes = useStyles()
  return (
    <>
      {/* Blast Program */}
      <div className={classes.col}>
        <Box className={classes.titleBox}>
          <Typography className={classes.titleBoxText}>
            BLAST Database
          </Typography>
        </Box>

        <Box className={classes.contentBox}>
          <Card variant="outlined" className={classes.card}>
            <div className={classes.col}>
              {/* Select Organism */}
              <div className={classes.row}>
                <Typography className={classes.boldText}>
                  Select Organism
                </Typography>
                <FormControl fullWidth>
                  <Select defaultValue={2}>
                    <MenuItem value={0}>Please Select an Organism</MenuItem>
                    <MenuItem value={1}>All</MenuItem>
                    <MenuItem value={2}>Dictyostellum discoldeum</MenuItem>
                    <MenuItem value={3}>Dictyostellum fasciculatum</MenuItem>
                    <MenuItem value={4}>Dictyostellum purpureum</MenuItem>
                    <MenuItem value={5}>Dictyostellum pallidum</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {/* Select Database */}
              <div className={classes.row}>
                <Typography className={classes.boldText}>
                  Select Database
                </Typography>
                <FormControl fullWidth>
                  <Select defaultValue={2}>
                    <MenuItem value={0}>Please Select an Organism</MenuItem>
                    <MenuItem value={1}>All</MenuItem>
                    <MenuItem value={2}>Dictyostellum discoldeum</MenuItem>
                    <MenuItem value={3}>Dictyostellum fasciculatum</MenuItem>
                    <MenuItem value={4}>Dictyostellum purpureum</MenuItem>
                    <MenuItem value={5}>Dictyostellum pallidum</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </Card>
        </Box>
      </div>
    </>
  )
}

export default BlastDatabaseRow
