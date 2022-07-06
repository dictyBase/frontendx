import useStyles from "styles/geneOrIDSection"
import { Typography, Card, Box, Grid } from "@material-ui/core"
import { MutableRefObject, useEffect, useState } from "react"
import { Observable } from "rxjs"
import { programOptionsMock } from "../mocks/relatonalMockData"
import Select, { SelectChangeEvent } from "@mui/material/Select"

interface BlastProgramRow {
  programElement: MutableRefObject<HTMLInputElement>
  sequenceStream: Observable<string>
}

const BlastProgramRow = ({
  programElement,
  sequenceStream,
}: BlastProgramRow) => {
  const classes = useStyles()

  const [programOptions, setProgramOptions] = useState<string[]>(
    programOptionsMock["Please Select a Sequence Type"],
  )

  const [option, setOption] = useState<string>("Please Select a Program")

  useEffect(() => {
    if (!sequenceStream) return
    const subscription = sequenceStream.subscribe((content) => {
      setProgramOptions(programOptionsMock[content])
    })
    return () => subscription.unsubscribe()
  }, [sequenceStream])

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
              variant="outlined"
              defaultValue={"Please Select a Program"}
              inputProps={{ style: { fontSize: 12, minWidth: 400 } }}
              value={option}
              onChange={(e: SelectChangeEvent) => {
                setOption(e.target.value as string)
              }}
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
