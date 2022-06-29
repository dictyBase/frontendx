import useStyles from "styles/geneOrIDSection"
import { Typography, Card, Box, Grid, Select } from "@material-ui/core"
import { MutableRefObject, useState } from "react"

interface BlastProgramRow {
  programElement: MutableRefObject<HTMLInputElement>
}

const BlastProgramRow = ({ programElement }: BlastProgramRow) => {
  const classes = useStyles()

  const [programOptions] = useState<string[]>([
    "Please Select a Program",
    "blastn - DNA query to DNA database",
    "blastp - Protein query to protein database",
    "blastx - Translated (6 frames) DNA query to protein database",
    "tblastx - Translated (6 frames) DNA query to translated (6 frames) DNA database",
    "tblastn - Protein query to DNA (6 frames) DNA database",
  ])

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
            <Select
              native
              id="program-select-id"
              defaultValue={"Please Select a Program"}
              variant="outlined"
              inputProps={{ style: { fontSize: 12, minWidth: 400 } }}
              ref={programElement}>
              {programOptions.map((val, index) => (
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

export default BlastProgramRow
