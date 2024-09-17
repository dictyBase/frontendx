import { Container } from "@material-ui/core"
import { PublicationQueryResult } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { PublicationDisplay } from "./PublicationDisplay"

type PhenotypeReferenceDetailsProperties = {
  result: PublicationQueryResult
}

const PhenotypeReferenceDetails = ({
  result,
}: PhenotypeReferenceDetailsProperties) => (
  <Container>
    {match(result)
      .with({ called: false }, () => (
        <Container> Enter a Publication ID </Container>
      ))
      .with({ error: P.not(undefined) }, () => <Container> error </Container>)
      .with({ loading: true }, () => <Container> loading </Container>)
      .with(
        { data: { publication: P.select({ id: P.string }) } },
        (publication) => <PublicationDisplay publication={publication} />,
      )
      .otherwise(() => (
        <>This message should not appear</>
      ))}
  </Container>
)

export { PhenotypeReferenceDetails }
