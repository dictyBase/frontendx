import useStyles from "styles/geneOrIDSection"
import {
  Typography,
  Card,
  Box,
  MenuItem,
  Checkbox,
  TextField,
  Grid,
} from "@material-ui/core"

const BlastOptionsRow = () => {
  const classes = useStyles()
  return (
    <Grid item xs={12} md={12}>
      <Box className={classes.titleBox}>
        <Typography className={classes.titleBoxText}>Options</Typography>
      </Box>

      <Card variant="outlined" className={classes.card}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {/* E-value */}
          <Grid item xs={3} md={3}>
            <Typography className={classes.boldText}>E-value</Typography>
          </Grid>
          <Grid item xs={9} md={9}>
            <TextField
              size="small"
              select
              defaultValue={5}
              variant="outlined"
              InputProps={{ style: { fontSize: 12, minWidth: 400 } }}>
              <MenuItem value={0}>1000</MenuItem>
              <MenuItem value={1}>500</MenuItem>
              <MenuItem value={2}>100</MenuItem>
              <MenuItem value={3}>10</MenuItem>
              <MenuItem value={4}>1</MenuItem>
              <MenuItem value={5}>0.1</MenuItem>
              <MenuItem value={6}>0.001</MenuItem>
              <MenuItem value={7}>1e-5</MenuItem>
              <MenuItem value={8}>1e-25</MenuItem>
              <MenuItem value={9}>1e-50</MenuItem>
              <MenuItem value={10}>1e-100</MenuItem>
            </TextField>
          </Grid>
          {/* Number of alignments to show */}
          <Grid item xs={3} md={3}>
            <Typography className={classes.boldText}>
              Number of alignments to show
            </Typography>
          </Grid>
          <Grid item xs={9} md={9}>
            <TextField
              size="small"
              select
              defaultValue={2}
              variant="outlined"
              InputProps={{ style: { fontSize: 12, minWidth: 400 } }}>
              <MenuItem value={0}>5</MenuItem>
              <MenuItem value={1}>25</MenuItem>
              <MenuItem value={2}>50</MenuItem>
              <MenuItem value={3}>100</MenuItem>
              <MenuItem value={4}>250</MenuItem>
              <MenuItem value={5}>500</MenuItem>
              <MenuItem value={6}>750</MenuItem>
              <MenuItem value={7}>1000</MenuItem>
            </TextField>
          </Grid>

          {/* Word Size */}
          <Grid item xs={3} md={3}>
            <Typography className={classes.boldText}>Word Size</Typography>
          </Grid>
          <Grid item xs={9} md={9}>
            <TextField
              size="small"
              select
              defaultValue={2}
              variant="outlined"
              InputProps={{ style: { fontSize: 12, minWidth: 400 } }}>
              <MenuItem value={0}>2</MenuItem>
              <MenuItem value={1}>3</MenuItem>
              <MenuItem value={2}>4</MenuItem>
              <MenuItem value={3}>5</MenuItem>
              <MenuItem value={4}>6</MenuItem>
              <MenuItem value={5}>7</MenuItem>
              <MenuItem value={6}>8</MenuItem>
              <MenuItem value={7}>9</MenuItem>
              <MenuItem value={8}>10</MenuItem>
              <MenuItem value={9}>11</MenuItem>
              <MenuItem value={10}>12</MenuItem>
              <MenuItem value={11}>13</MenuItem>
              <MenuItem value={12}>14</MenuItem>
              <MenuItem value={13}>15</MenuItem>
            </TextField>
          </Grid>
          {/* Matrix */}
          <Grid item xs={3} md={3}>
            <Typography className={classes.boldText}>Matrix</Typography>
          </Grid>
          <Grid item xs={9} md={9}>
            <TextField
              size="small"
              select
              defaultValue={2}
              variant="outlined"
              InputProps={{ style: { fontSize: 12, minWidth: 400 } }}>
              <MenuItem value={0}>BLOSUM45</MenuItem>
              <MenuItem value={1}>BLOSUM62</MenuItem>
              <MenuItem value={2}>BLOSUM80</MenuItem>
              <MenuItem value={3}>PAM30</MenuItem>
              <MenuItem value={4}>PAM70</MenuItem>
            </TextField>
          </Grid>

          {/* Gapped alignment */}
          <Grid item xs={3} md={3}>
            <Typography className={classes.boldText}>
              Gapped alignment
            </Typography>
          </Grid>
          <Grid item xs={9} md={9}>
            <Checkbox defaultChecked />
          </Grid>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography className={classes.boldText}>
            DUST filter for BLASTN, SEG filter for all others.
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography className={classes.boldText}>
            {
              "Because of resource limits, when BLASTing against the Chromosomal database with filtering off, the filtering is actually set to 'm D' which turns off filtering for extending hits, but leaves filtering on when building the initial words."
            }
          </Typography>
        </Grid>
      </Card>
    </Grid>
  )
}

export default BlastOptionsRow
