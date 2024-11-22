import { PhenotypesContainer } from "components/features/Phenotypes/PhenotypesContainer"
import { PhenotypesLoader } from "components/features/Phenotypes/PhenotypesLoader"
import { GraphQLErrorPage } from "@dictybase/ui-common"
import { useListStrainsWithGeneQuery } from "dicty-graphql-schema"
import { useRouter } from "next/router"
import { match, P } from "ts-pattern"
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
  })

  return match(result)
    .with(
      {
        data: {
          listStrainsWithGene: P.select(P.array({ id: P.string })),
        },
      },
      (strains) => <PhenotypesContainer strains={strains} />,
    )
    .with({ loading: true }, () => <PhenotypesLoader />)
    .with({ error: P.select(P.not(undefined)) }, (error) => (
      <GraphQLErrorPage error={error} />
    ))
    .otherwise(() => <> This message should not appear. </>)
}

// eslint-disable-next-line import/no-default-export
export default PhenotypesPageWrapper
