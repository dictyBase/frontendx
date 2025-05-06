import Typography from "@material-ui/core/Typography"
import { ListPublicationsWithGeneQuery } from "dicty-graphql-schema"
import { pipe } from "fp-ts/function"
import { match as Omatch } from "fp-ts/Option"
import { useAtomValue } from "jotai"
import { ReferencesDataTable } from "./ReferencesDataTable"
import { MentionedGenes } from "./MentionedGenes"
import { selectedPublication } from "./state"

interface ReferencesContainerProperties {
  publications: NonNullable<
    ListPublicationsWithGeneQuery["listPublicationsWithGene"]
  >
}

const ReferencesContainer = ({
  publications,
}: ReferencesContainerProperties) => {
  const publication = useAtomValue(selectedPublication)
  return pipe(
    publication,
    Omatch(
      () => (
        <Typography component="div">
          <ReferencesDataTable publications={publications} />
        </Typography>
      ),
      (p) => <MentionedGenes publication={p} />,
    ),
  )
}

export { ReferencesContainer }
