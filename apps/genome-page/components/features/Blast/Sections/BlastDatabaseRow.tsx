import react, { MutableRefObject, useState, useEffect, useRef } from "react"
import useStyles from "styles/geneOrIDSection"
import { Typography, Card, Box, Grid } from "@material-ui/core"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { Observable } from "rxjs"
import { programToDatabaseMock } from "../mocks/relatonalMockData"

interface BlastDatabaseRowProps {
  organismElement: MutableRefObject<HTMLInputElement>
  databaseElement: MutableRefObject<HTMLInputElement>
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
}: BlastDatabaseRowProps) => {
  const classes = useStyles()

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
    if (!sequenceStream) return
    const subscription = sequenceStream.subscribe((content) => {
      setDatabaseOptions(
        programToDatabaseMock["Please Select a Program"][selectOrganismValue],
      )
      setCurrentProgram("Please Select a Program")
    })
    return () => subscription.unsubscribe()
  }, [selectOrganismValue, sequenceStream])

  useEffect(() => {
    if (!programStream) return
    const subscription = programStream.subscribe((content) => {
      setCurrentProgram(content)
      setDatabaseOptions(programToDatabaseMock[content][selectOrganismValue])
    })
    return () => subscription.unsubscribe()
  }, [programStream, selectOrganismValue])

  useEffect(() => {
    if (!organismStream) return
    const subscription = organismStream.subscribe((content) => {
      setDatabaseOptions(programToDatabaseMock[currentProgram][content])
    })
    return () => subscription.unsubscribe()
  }, [organismStream, currentProgram])

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
            <Select
              native
              id="organism-select-id"
              defaultValue="Dictyostelium discoideum"
              onChange={(e: SelectChangeEvent) => {
                setSelectOrganismValue(e.target.value as string)
              }}
              inputProps={{ style: { fontSize: 12, minWidth: 400 } }}
              variant="outlined"
              ref={organismElement}>
              {organismOptions.map((val, index) => (
                <option value={val} key={index}>
                  {val}
                </option>
              ))}
            </Select>
          </Grid>
          {/* Select Database */}
          <Grid item xs={3} md={3}>
            <Typography className={classes.boldText}>
              Select Database
            </Typography>
          </Grid>
          <Grid item xs={9} md={9}>
            <Select
              native
              id="database-select-id"
              defaultValue={"Please Select a Database"}
              inputProps={{ style: { fontSize: 12, minWidth: 400 } }}
              variant="outlined"
              ref={databaseElement}>
              {databaseOptions.map((val, index) => (
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

export default BlastDatabaseRow
