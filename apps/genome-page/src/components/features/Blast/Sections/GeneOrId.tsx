import {
  Box,
  Card,
  Typography,
  Grid,
  Button,
  MenuItem,
  TextField,
  Select,
} from "@mui/material"
import { RefObject, useState } from "react"

const boldTextStyle = {
  fontSize: "14px",
  fontWeight: "bold",
}

interface GeneOrIdProperties {
  sequenceElement: RefObject<HTMLInputElement>
}

const GeneOrID = ({ sequenceElement }: GeneOrIdProperties) => {
  const [sequenceOptions] = useState<string[]>([
    "Please Select a Sequence Type",
    "Protein",
    "DNA coding sequence",
    "Genomic DNA",
  ])

  return (
    <Grid item xs={6} md={6}>
      <Box
        sx={{
          position: "relative",
          top: 15,
          backgroundColor: "#DFE8F6",
          border: "1px solid",
          borderColor: "#A3BAE9",
          textAlign: "center",
          maxWidth: 200,
          marginLeft: "25px",
        }}>
        <Typography sx={{ color: "#336699", fontSize: "16px" }}>
          Gene or Gene Model ID
        </Typography>
      </Box>
      <Card
        variant="outlined"
        sx={{ padding: "20px", backgroundColor: "#F2F2F2" }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {/* Enter gene or gene model ID */}
          <Grid item xs={4} md={6}>
            <Typography sx={boldTextStyle}>
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
            <Typography sx={boldTextStyle}>Select Sequence</Typography>
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
            <Typography sx={boldTextStyle}>Select Sequence Type</Typography>
          </Grid>
          <Grid item xs={8} md={6}>
            <Select
              native
              id="sequence-select-id"
              defaultValue="Please Select a Sequence Type"
              inputProps={{ style: { fontSize: 12, minWidth: 200 } }}
              variant="outlined"
              ref={sequenceElement}>
              {sequenceOptions.map((value) => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
}

export { GeneOrID }
