import { ErrorPageWrapper } from "components/errors/ErrorPageWrapper"
import { OntologyContainer } from "components/features/Ontology/OntologyContainer"
import { Layout, TabValues } from "components/layout/Layout"
import { NoDataDisplay } from "components/NoDataDisplay"
import { Loader } from "components/Loader"
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
      tabValue={TabValues.GOANNOTATIONS}
      gene={gene}
      title={`GO Annotations for ${gene}`}
      description={`Gene Ontology Annotations for ${gene}`}>
      {match(result)
        .with(
          {
            data: {
              geneOntologyAnnotation: P.union(P.nullish, []),
            },
          },
          () => <NoDataDisplay query="Go Annotations" geneId={gene} />,
        )
        .with(
          {
            data: {
              geneOntologyAnnotation: P.select(P.array({ id: P.string })),
            },
          },
          (goas) => <OntologyContainer goas={goas} />,
        )
        .with({ loading: true }, () => <Loader />)
        .with({ error: P.select(P.not(P.nullish)) }, (error) => (
          <ErrorPageWrapper error={error} />
        ))
        .otherwise(() => (
          <> This message should not appear. </>
        ))}
    </Layout>
  )
}

// eslint-disable-next-line import/no-default-export
export default OntologyPageWrapper
