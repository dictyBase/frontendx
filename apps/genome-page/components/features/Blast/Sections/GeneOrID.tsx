import useStyles from "styles/geneOrIDSection"
import {
  Box,
  Card,
  Typography,
  Grid,
  Button,
  MenuItem,
  TextField,
  Select,
} from "@material-ui/core"
import { MutableRefObject, useState } from "react"

interface GeneOrIdProps {
  sequenceElement: MutableRefObject<HTMLInputElement>
}

const GeneOrID = ({ sequenceElement }: GeneOrIdProps) => {
  const classes = useStyles()

  const [sequenceOptions] = useState<string[]>([
    "Please Select a Sequence Type",
    "Protein",
    "DNA coding sequence",
    "Genomic DNA",
  ])

  return (
    <Grid item xs={6} md={6}>
      <Box className={classes.titleBox}>
        <Typography className={classes.titleBoxText}>
          Gene or Gene Model ID
        </Typography>
      </Box>
      <Card variant="outlined" className={classes.card}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {/* Enter gene or gene model ID */}
          <Grid item xs={4} md={6}>
            <Typography className={classes.boldText}>
              Enter gene or gene model ID
            </Typography>
          </Grid>
          <Grid item xs={8} md={6}>
            <TextField
              value="DDB_G0288611"
              placeholder="DDB_G0275689"
              variant="outlined"
              size="small"
              InputProps={{ style: { fontSize: 12 } }}
            />
            <Button variant="contained" size="small">
              Search
            </Button>
          </Grid>
          {/* Select Sequence */}
          <Grid item xs={4} md={6}>
            <Typography className={classes.boldText}>
              Select Sequence
            </Typography>
          </Grid>
          <Grid item xs={8} md={6}>
            <TextField
              size="small"
              select
              defaultValue={0}
              variant="outlined"
              InputProps={{ style: { fontSize: 12, minWidth: 200 } }}>
              <MenuItem value={0}>DDB0191090 - Curated Gene Model</MenuItem>
            </TextField>
          </Grid>
          {/* Select Sequence Type */}
          <Grid item xs={4} md={6}>
            <Typography className={classes.boldText}>
              Select Sequence Type
            </Typography>
          </Grid>
          <Grid item xs={8} md={6}>
            <Select
              native
              id="sequence-select-id"
              defaultValue={"Please Select a Sequence Type"}
              inputProps={{ style: { fontSize: 12, minWidth: 200 } }}
              variant="outlined"
              ref={sequenceElement}>
              {sequenceOptions.map((val, index) => (
                <option value={val} key={index}>
                  {val}
                </option>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
}

export default GeneOrID
