import react, { MutableRefObject, useState, useEffect } from "react"
import useStyles from "styles/geneOrIDSection"
import {
  Typography,
  Card,
  Box,
  FormControl,
  Select,
  Grid,
} from "@material-ui/core"
import { Observable } from "rxjs"
import programToDatabaseMock from "../mocks/relatonalMockData"

interface BlastDatabaseRowProps {
  organismElement: MutableRefObject<HTMLInputElement>
  databaseElement: MutableRefObject<HTMLInputElement>
  programStream: Observable<string>
  sequenceStream: Observable<string>
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
  const [organismOptions] = useState<string[]>([
    "Please Select an Organism",
    "All",
    "Dictyostellum discoldeum",
    "Dictyostellum fasciculatum",
    "Dictyostellum purpureum",
    "Polysphondylium pallidum",
  ])

  const [databaseOptions, setDatabaseOptions] = useState<string[]>(
    programToDatabaseMock["Please Select a Program"],
  )

  useEffect(() => {
    if (!programStream) return
    const subscription = programStream.subscribe((content) =>
      setDatabaseOptions(programToDatabaseMock[content]),
    )
    return () => subscription.unsubscribe()
  }, [programStream])

  useEffect(() => {
    if (!organismStream) return
    const subscription = organismStream.subscribe((content) => {
      setDatabaseOptions(["Test", ...content])
    })
    return () => subscription.unsubscribe()
  }, [organismStream])

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
            <FormControl>
              <Select
                native
                id="organism-select-id"
                defaultValue={"Dictyostellum discoldeum"}
                inputProps={{ style: { fontSize: 12, minWidth: 400 } }}
                variant="outlined"
                ref={organismElement}>
                {organismOptions.map((val, index) => (
                  <option value={val} key={index}>
                    {val}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Select Database */}
          <Grid item xs={3} md={3}>
            <Typography className={classes.boldText}>
              Select Database
            </Typography>
          </Grid>
          <Grid item xs={9} md={9}>
            <FormControl>
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
            </FormControl>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
}

export default BlastDatabaseRow
