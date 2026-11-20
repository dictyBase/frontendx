/* eslint-disable sonarjs/no-duplicate-string */
import { RefObject, useState, useEffect } from "react"
import { Typography, Card, Box, Grid } from "@mui/material"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { Observable } from "rxjs"
import { programToDatabaseMock } from "../mocks/relatonalMockData"

const boldTextStyle = {
  fontSize: "14px",
  fontWeight: "bold",
}

interface BlastDatabaseRowProperties {
  organismElement: RefObject<HTMLInputElement>
  databaseElement: RefObject<HTMLInputElement>
  sequenceStream: Observable<string>
  programStream: Observable<string>
  organismStream: Observable<string>
}

const BlastDatabaseRow = ({
  organismStream,
  programStream,
  sequenceStream,
  organismElement,
  databaseElement,
}: BlastDatabaseRowProperties) => {
  const [currentProgram, setCurrentProgram] = useState<string>(
    "Please Select a Program",
  )

  const [organismOptions] = useState<string[]>([
    "Please Select an Organism",
    "All",
    "Dictyostelium discoideum",
    "Dictyostelium fasciculatum",
    "Dictyostelium purpureum",
    "Polysphondylium pallidum",
  ])

  const [selectOrganismValue, setSelectOrganismValue] = useState(
    "Dictyostelium discoideum",
  )

  const [databaseOptions, setDatabaseOptions] = useState<string[]>(
    programToDatabaseMock["Please Select a Program"][
      "Dictyostelium discoideum"
    ],
  )

  useEffect(() => {
    if (!sequenceStream) return () => {}
    const subscription = sequenceStream.subscribe(() => {
      setDatabaseOptions(
        programToDatabaseMock["Please Select a Program"][selectOrganismValue],
      )
      setCurrentProgram("Please Select a Program")
    })
    return () => subscription.unsubscribe()
  }, [selectOrganismValue, sequenceStream])

  useEffect(() => {
    if (!programStream) return () => {}
    const subscription = programStream.subscribe((content) => {
      setCurrentProgram(content)
      setDatabaseOptions(programToDatabaseMock[content][selectOrganismValue])
    })
    return () => subscription.unsubscribe()
  }, [programStream, selectOrganismValue])

  useEffect(() => {
    if (!organismStream) return () => {}
    const subscription = organismStream.subscribe((content) => {
      setDatabaseOptions(programToDatabaseMock[currentProgram][content])
    })
    return () => subscription.unsubscribe()
  }, [organismStream, currentProgram])

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
          BLAST Database
        </Typography>
      </Box>

      <Card
        variant="outlined"
        sx={{ padding: "20px", backgroundColor: "#F2F2F2" }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={3} md={3}>
            <Typography sx={boldTextStyle}>Select Organism</Typography>
          </Grid>
          <Grid item xs={9} md={9}>
            <Select
              native
              id="organism-select-id"
              defaultValue="Dictyostelium discoideum"
              onChange={(event: SelectChangeEvent) => {
                setSelectOrganismValue(event.target.value as string)
              }}
              inputProps={{ style: { fontSize: 12, minWidth: 400 } }}
              variant="outlined"
              ref={organismElement}>
              {organismOptions.map((value) => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
            </Select>
          </Grid>
          {/* Select Database */}
          <Grid item xs={3} md={3}>
            <Typography sx={boldTextStyle}>Select Database</Typography>
          </Grid>
          <Grid item xs={9} md={9}>
            <Select
              native
              id="database-select-id"
              defaultValue="Please Select a Database"
              inputProps={{ style: { fontSize: 12, minWidth: 400 } }}
              variant="outlined"
              ref={databaseElement}>
              {databaseOptions.map((value) => (
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

export { BlastDatabaseRow }
