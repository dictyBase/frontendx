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

const QueryOrGeneRow = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.row}>
        {/* Query Sequence */}
        <div className={classes.col}>
          <Box className={classes.titleBox}>
            <Typography className={classes.titleBoxText}>
              Query Sequence
            </Typography>
          </Box>
          <Box className={classes.contentBox}>
            <Card variant="outlined" className={classes.card}>
              <Typography className={classes.boldText}>
                Enter query sequence in FASTA format
              </Typography>
              <textarea
                rows={10}
                placeholder="Type or paste a query or sequence here..."
                className={classes.textArea}
              />
            </Card>
          </Box>
        </div>
        {/* Or */}
        <Typography className={classes.titleBoxText}>Or</Typography>
        {/* Gene or Gene Model ID */}
        <div className={classes.col}>
          <Box className={classes.titleBox}>
            <Typography className={classes.titleBoxText}>
              Gene or Gene Model ID
            </Typography>
          </Box>

          <Box className={classes.contentBox}>
            <Card variant="outlined" className={classes.card}>
              {/* Enter gene or gene model ID */}
              <div
                className={classes.row}
                style={{ justifyContent: "center", alignItems: "center" }}>
                <Typography className={classes.boldText}>
                  Enter gene or gene model ID
                </Typography>
                <div className={classes.col} style={{ marginLeft: 10 }}>
                  <Typography className={classes.text}>
                    (e.g.: DDB_G0275689, DDB0214814)
                  </Typography>
                  <div className={classes.row}>
                    <TextField value="DDB_G0288611" />
                    <Button variant="contained" size="small">
                      Search
                    </Button>
                  </div>
                </div>
              </div>
              {/* Select Sequence */}
              <div className={classes.row}>
                <Typography className={classes.boldText}>
                  Select Sequence
                </Typography>
                <FormControl fullWidth>
                  <Select defaultValue={0}>
                    <MenuItem value={0}>
                      DDB0191090 - Curated Gene Model
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className={classes.row}>
                <Typography className={classes.boldText}>
                  Select Sequence Type
                </Typography>
                <FormControl fullWidth>
                  <Select defaultValue={0}>
                    <MenuItem value={0}>Please Select a Sequence Type</MenuItem>
                    <MenuItem value={1}>Protein</MenuItem>
                    <MenuItem value={2}>DNA coding sequence</MenuItem>
                    <MenuItem value={3}>Genomic DNA</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Card>
          </Box>
        </div>
      </div>
    </>
  )
}

export default QueryOrGeneRow
