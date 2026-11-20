import { Typography, Card, Box, Grid } from "@mui/material"
import { RefObject, useEffect, useState } from "react"
import { Observable } from "rxjs"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { programOptionsMock } from "../mocks/relatonalMockData"

interface BlastProgramRowProperties {
  programElement: RefObject<HTMLInputElement>
  sequenceStream: Observable<string>
}

const BlastProgramRow = ({
  programElement,
  sequenceStream,
}: BlastProgramRowProperties) => {
  const [programOptions, setProgramOptions] = useState<string[]>(
    programOptionsMock["Please Select a Sequence Type"],
  )

  const [option, setOption] = useState<string>("Please Select a Program")

  useEffect(() => {
    if (!sequenceStream) return () => {}
    const subscription = sequenceStream.subscribe((content) => {
      setProgramOptions(programOptionsMock[content])
    })
    return () => subscription.unsubscribe()
  }, [sequenceStream])

  return (
    <Grid item xs={12} md={12}>
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
          BLAST Program
        </Typography>
      </Box>
      <Card
        variant="outlined"
        sx={{ padding: "20px", backgroundColor: "#F2F2F2" }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={3} md={3}>
            <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
              Select Program
            </Typography>
          </Grid>
          <Grid item xs={9} md={9}>
            <Select
              native
              id="program-select-id"
              variant="outlined"
              defaultValue="Please Select a Program"
              inputProps={{ style: { fontSize: 12, minWidth: 400 } }}
              value={option}
              onChange={(event: SelectChangeEvent) => {
                setOption(event.target.value as string)
              }}
              ref={programElement}>
              {programOptions.map((value) => (
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

export { BlastProgramRow }
