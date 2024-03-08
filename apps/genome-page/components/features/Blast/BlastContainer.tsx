import React, { useRef, MutableRefObject } from "react"
import { Layout } from "components/layout/Layout"
import { GeneQuery } from "dicty-graphql-schema"
import { useRouter } from "next/router"
import { useStyles } from "styles/blastContainerStyles"
import { Paper, Container, Grid } from "@material-ui/core"
import { Observable } from "rxjs"
import { QuerySection } from "./Sections/QuerySection"
import { GeneOrID } from "./Sections/GeneOrId"
import { Or } from "./Sections/Or"
import { BlastProgramRow } from "./Sections/BlastProgramRow"
import { BlastDatabaseRow } from "./Sections/BlastDatabaseRow"
import { BlastButtonsRow } from "./Sections/BlastButtonsRow"
import { BlastOptionsRow } from "./Sections/BlastOptionsRow"
import { useStreamManager } from "./streamManager"

interface BlastContainerProperties {
  gene: GeneQuery
}
const BlastContainer = ({ gene }: BlastContainerProperties) => {
  const classes = useStyles()
  const { query } = useRouter()
  const geneId = query.id as string

  const selectSequenceElement = useRef<HTMLInputElement>(
    null,
  ) as MutableRefObject<HTMLInputElement>
  const selectProgramElement = useRef<HTMLInputElement>(
    null,
  ) as MutableRefObject<HTMLInputElement>

  const selectOrganismElement = useRef<HTMLInputElement>(
    null,
  ) as MutableRefObject<HTMLInputElement>
  const selectDatabaseElement = useRef<HTMLInputElement>(
    null,
  ) as MutableRefObject<HTMLInputElement>

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
    <Layout
      gene={geneId}
      title={`Phenotypes for ${geneId}`}
      description={`Gene phenotypes for ${geneId}`}>
      <Container component={Paper} className={classes.root} maxWidth={false}>
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
    </Layout>
  )
}

export { BlastContainer }
