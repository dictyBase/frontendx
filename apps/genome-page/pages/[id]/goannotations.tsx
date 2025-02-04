import { OntologyContainer } from "components/features/Ontology/OntologyContainer"
import { GraphQLErrorPage } from "components/errors/GraphQLErrorPage"
import { Layout } from "components/layout/Layout"
import { OntologyLoader } from "components/features/Ontology/OntologyLoader"
import { useRouter } from "next/router"
import { useGeneOntologyAnnotationQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"

/*
    Renders the Ontology page given a gene id
*/
const OntologyPageWrapper = () => {
  const { query } = useRouter()
  const gene = query.id as string
  const result = useGeneOntologyAnnotationQuery({
    variables: {
      gene,
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
  })

  return (
    <Layout
      gene={gene}
      title={`Phenotypes for ${gene}`}
      description={`Gene phenotypes for ${gene}`}
    >
      {match(result)
        .with(
        .with(
          {
            data: {
              geneOntologyAnnotation: P.select(P.array({ id: P.string })),
            },
          },
          (goas) => <OntologyContainer goas={goas} />,
        )
        .with({ loading: true }, () => <OntologyLoader />)
        .with({ error: P.select(P.not(undefined)) }, (error) => (
          <GraphQLErrorPage error={error} />
        ))
        .otherwise(() => (
          <> This message should not appear. </>
        ))}
    </Layout>
  )
}

// eslint-disable-next-line import/no-default-export
export default OntologyPageWrapper
