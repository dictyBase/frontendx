import useStyles from "styles/geneOrIDSection"
import {
  Typography,
  Card,
  Box,
  Grid,
  MenuItem,
  TextField,
} from "@material-ui/core"

const BlastProgramRow = () => {
  const classes = useStyles()
  return (
    <Grid item xs={12} md={12}>
      <Box className={classes.titleBox}>
        <Typography className={classes.titleBoxText}>BLAST Program</Typography>
      </Box>
      <Card variant="outlined" className={classes.card}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={3} md={3}>
            <Typography className={classes.boldText}>Select Program</Typography>
          </Grid>
          <Grid item xs={9} md={9}>
            <TextField
              size="small"
              select
              defaultValue={0}
              variant="outlined"
              InputProps={{ style: { fontSize: 12, minWidth: 400 } }}>
              <MenuItem value={0}>Please Select a Program</MenuItem>
              <MenuItem value={1}>blastn - DNA query to DNA database</MenuItem>
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
            </TextField>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
}

export default BlastProgramRow
