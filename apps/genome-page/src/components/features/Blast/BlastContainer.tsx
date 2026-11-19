import React, { useRef, RefObject } from "react"
import { Paper, Container, Grid } from "@mui/material"
import { Observable } from "rxjs"
import { QuerySection } from "./Sections/QuerySection"
import { GeneOrID } from "./Sections/GeneOrId"
import { Or } from "./Sections/Or"
import { BlastProgramRow } from "./Sections/BlastProgramRow"
import { BlastDatabaseRow } from "./Sections/BlastDatabaseRow"
import { BlastButtonsRow } from "./Sections/BlastButtonsRow"
import { BlastOptionsRow } from "./Sections/BlastOptionsRow"
import { useStreamManager } from "./streamManager"

const BlastContainer = () => {
  const selectSequenceElement = useRef<HTMLInputElement>(
    null,
  ) as RefObject<HTMLInputElement>
  const selectProgramElement = useRef<HTMLInputElement>(
    null,
  ) as RefObject<HTMLInputElement>

  const selectOrganismElement = useRef<HTMLInputElement>(
    null,
  ) as RefObject<HTMLInputElement>
  const selectDatabaseElement = useRef<HTMLInputElement>(
    null,
  ) as RefObject<HTMLInputElement>

  const organismStream = useStreamManager({
    element: selectOrganismElement,
  }) as Observable<string>

  const programStream = useStreamManager({
    element: selectProgramElement,
  }) as Observable<string>

  const sequenceStream = useStreamManager({
    element: selectSequenceElement,
  }) as Observable<string>

  return (
    <Container
      component={Paper}
      sx={{ width: "100%", overflowX: "auto" }}
      maxWidth={false}>
      <Grid container spacing={2}>
        <QuerySection />
        <Or />
        <GeneOrID sequenceElement={selectSequenceElement} />
        <BlastProgramRow
          programElement={selectProgramElement}
          sequenceStream={sequenceStream}
        />
        <BlastDatabaseRow
          organismStream={organismStream}
          sequenceStream={sequenceStream}
          programStream={programStream}
          organismElement={selectOrganismElement}
          databaseElement={selectDatabaseElement}
        />
        <BlastButtonsRow />
        <BlastOptionsRow />
      </Grid>
    </Container>
  )
}

export { BlastContainer }
