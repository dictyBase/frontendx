import { ReferencesContainer } from "components/features/References/ReferencesContainer"
import { GraphQLErrorPage } from "components/errors/GraphQLErrorPage"
import { ReferencesLoader } from "components/features/References/ReferencesLoader"
import { useRouter } from "next/router"
import { useListPublicationsWithGeneQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"

/*
    Renders References given a gene id
*/
const ReferencesPageWrapper = () => {
  const { query } = useRouter()
  const gene = query.id as string
  const result = useListPublicationsWithGeneQuery({
    variables: {
      gene,
    },
  })
  return match(result)
    .with({ loading: true }, () => <ReferencesLoader />)
    .with({ error: P.select(P.not(undefined)) }, (error) => (
      <GraphQLErrorPage error={error} />
    ))
    .with(
      {
        data: {
          listPublicationsWithGene: P.select(P.array({ id: P.string })),
        },
      },
      (publications) => <ReferencesContainer publications={publications} />,
    )
    .otherwise(() => <> This message should not appear. </>)
}

// eslint-disable-next-line import/no-default-export
export default ReferencesPageWrapper
