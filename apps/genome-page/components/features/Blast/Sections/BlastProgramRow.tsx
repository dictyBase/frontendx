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

const BlastProgramRow = () => {
  const classes = useStyles()
  return (
    <>
      {/* Blast Program */}
      <div className={classes.col}>
        <Box className={classes.titleBox}>
          <Typography className={classes.titleBoxText}>
            BLAST Program
          </Typography>
        </Box>

        <Box className={classes.contentBox}>
          <Card variant="outlined" className={classes.card}>
            <div className={classes.row}>
              <Typography className={classes.boldText}>
                Select Program
              </Typography>
              <FormControl fullWidth>
                <Select defaultValue={0}>
                  <MenuItem value={0}>Please Select a Program</MenuItem>
                  <MenuItem value={1}>
                    blastn - DNA query to DNA database
                  </MenuItem>
                  <MenuItem value={2}>
                    blastp - Protein query to protein database
                  </MenuItem>
                  <MenuItem value={3}>
                    blastx - Translated (6 frames) DNA query to protein databse
                  </MenuItem>
                  <MenuItem value={4}>
                    tblastx - Translated (6 frames) DNA query to translated (6
                    frames) DNA database
                  </MenuItem>
                  <MenuItem value={5}>
                    tblastn - Protein query to DNA (6 frames) DNA database
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </Card>
        </Box>
      </div>
    </>
  )
}

export default BlastProgramRow
