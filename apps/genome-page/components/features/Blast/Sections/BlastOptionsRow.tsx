import useStyles from "../../../../styles/blastContainerStyles"
import {
  Typography,
  Card,
  Box,
  Select,
  MenuItem,
  FormControl,
  Checkbox,
} from "@material-ui/core"

const BlastOptionsRow = () => {
  const classes = useStyles()
  return (
    <>
      {/* Blast Program */}
      <div className={classes.col}>
        <Box className={classes.titleBox}>
          <Typography className={classes.titleBoxText}>Options</Typography>
        </Box>

        <Box className={classes.contentBox}>
          <Card variant="outlined" className={classes.card}>
            <div className={classes.col}>
              {/* E-value */}
              <div className={classes.row}>
                <Typography className={classes.boldText}>E-value</Typography>
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

              {/* Number of alignments to show */}
              <div className={classes.row}>
                <Typography className={classes.boldText}>
                  Number of alignments to show
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

              {/* Word Size */}
              <div className={classes.row}>
                <Typography className={classes.boldText}>Word Size</Typography>
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

              {/* Matrix */}
              <div className={classes.row}>
                <Typography className={classes.boldText}>Matrix</Typography>
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

              {/* Gapped alignment */}
              <div className={classes.row}>
                <Typography className={classes.boldText}>
                  Gapped alignment
                </Typography>
                <Checkbox defaultChecked />
              </div>
            </div>
          </Card>
        </Box>
      </div>
    </>
  )
}

export default BlastOptionsRow
