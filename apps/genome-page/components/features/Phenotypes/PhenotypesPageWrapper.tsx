import { flow, pipe } from "fp-ts/function"
import {
  fromNullable as OfromNullable,
  map as Omap,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { exists as Aexists, isNonEmpty as AisNonEmpty } from "fp-ts/Array"
import { ErrorPageWrapper } from "components/errors/ErrorPageWrapper"
import { PhenotypesContainer } from "components/features/Phenotypes/PhenotypesContainer"
import { Loader } from "components/Loader"
import { Layout, TabValues } from "components/layout/Layout"
import { NoDataDisplay } from "components/NoDataDisplay"
import {
  useListStrainsWithGeneQuery,
  ListStrainsWithGeneQuery,
} from "dicty-graphql-schema"
import { useRouter } from "next/router"
import { match, P } from "ts-pattern"

const loadingConditions = { loading: true }
const successConditions = {
  data: {
    listStrainsWithGene: P.select(P.not(P.nullish)),
  },
}
const emptyDataConditions = {
  data: {
    listStrainsWithGene: P.union(
      [],
      P.array({ phenotypes: [] }),
      P.nullish,
      P.array({ phenotypes: P.nullish }),
    ),
  },
}
const errorConditions = { error: P.select(P.not(P.nullish)) }

const hasPhenotype = flow(
  OfromNullable<ListStrainsWithGeneQuery["listStrainsWithGene"]>,
  Omap(
    Aexists(({ phenotypes }) =>
      pipe(
        phenotypes,
        OfromNullable,
        Omap(AisNonEmpty),
        OgetOrElse(() => false),
      ),
    ),
  ),
  OgetOrElse(() => false),
)
/*
    Renders the Phenotypes page given a gene id
*/
const PhenotypesPageWrapper = () => {
  const { query } = useRouter()
  const gene = query.id as string
  const result = useListStrainsWithGeneQuery({
    variables: {
      gene,
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
    errorPolicy: "all",
  })
  return (
    <Layout
      tabValue={TabValues.PHENOTYPES}
      gene={gene}
      title={`Phenotypes for ${gene}`}
      description={`Gene phenotypes for ${gene}`}>
      {match(result)
        .with(loadingConditions, () => <Loader />)
        .with(
          successConditions,
          ({ data: { listStrainsWithGene } }) =>
            hasPhenotype(listStrainsWithGene),
          (strains) => <PhenotypesContainer strains={strains} />,
        )
        .with(emptyDataConditions, () => (
          <NoDataDisplay query="Phenotypes" geneId={gene} />
        ))
        .with(errorConditions, (error) => <ErrorPageWrapper error={error} />)
        .otherwise(() => (
          <> This message should not appear. </>
        ))}
    </Layout>
  )
}

export { PhenotypesPageWrapper }
