import useStyles from "styles/geneOrIDSection"
import {
  Typography,
  Card,
  Box,
  TextField,
  MenuItem,
  Grid,
} from "@material-ui/core"

const BlastDatabaseRow = () => {
  const classes = useStyles()
  return (
    <Grid item xs={12} md={12}>
      <Box className={classes.titleBox}>
        <Typography className={classes.titleBoxText}>BLAST Database</Typography>
      </Box>

      <Card variant="outlined" className={classes.card}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={3} md={3}>
            <Typography className={classes.boldText}>
              Select Organism
            </Typography>
          </Grid>
          <Grid item xs={9} md={9}>
            <TextField
              size="small"
              select
              defaultValue={2}
              variant="outlined"
              InputProps={{ style: { fontSize: 12, minWidth: 400 } }}>
              <MenuItem value={0}>Please Select an Organism</MenuItem>
              <MenuItem value={1}>All</MenuItem>
              <MenuItem value={2}>Dictyostellum discoldeum</MenuItem>
              <MenuItem value={3}>Dictyostellum fasciculatum</MenuItem>
              <MenuItem value={4}>Dictyostellum purpureum</MenuItem>
              <MenuItem value={5}>Polysphondylium pallidum</MenuItem>
            </TextField>
          </Grid>
          {/* Select Database */}
          <Grid item xs={3} md={3}>
            <Typography className={classes.boldText}>
              Select Database
            </Typography>
          </Grid>
          <Grid item xs={9} md={9}>
            <TextField
              size="small"
              select
              defaultValue={0}
              variant="outlined"
              InputProps={{ style: { fontSize: 12, minWidth: 400 } }}>
              <MenuItem value={0}>Please Select a Database</MenuItem>
              <MenuItem value={1}>
                D. discoideum Protein sequences - protein
              </MenuItem>
              <MenuItem value={2}>
                D. discoideum Coding sequences - DNA
              </MenuItem>
              <MenuItem value={3}>
                D. discoideum Non-coding sequences - DNA
              </MenuItem>
              <MenuItem value={4}>
                D. discoideum Genomic sequences - DNA
              </MenuItem>
              <MenuItem value={5}>D. discoideum EST sequences - DNA</MenuItem>
              <MenuItem value={6}>
                D. discoideum Chromosomal DNA: 1,2,3,4,5,6,M and floating
                contigs - DNA
              </MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
}

export default BlastDatabaseRow
