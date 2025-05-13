import { useRouter } from "next/router"
import { useGeneGeneralInformationSummaryQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { NoDataDisplay } from "components/NoDataDisplay"
import { Loader } from "components/Loader"
import { GraphQLErrorPage } from "components/errors/GraphQLErrorPage"
import { GeneralInfoPanel } from "./GeneralInfoPanel"

const GeneralInfoQuery = () => {
  const { query } = useRouter()
  const gene = query.id as string
  console.log(gene)
  const result = useGeneGeneralInformationSummaryQuery({
    variables: {
      gene,
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
  })
  console.log(result)
  return match(result)
    .with({ loading: true }, () => <Loader />)
    .with(
      {
        data: P.select(P.not(P.nullish)),
      },
      ({ geneGeneralInformation }) => <GeneralInfoPanel generalInformation={geneGeneralInformation} />,
    )
    .with(
      {
        data: P.nullish,
      },
      () => <NoDataDisplay query="Gene Summary" geneId={gene} />,
    )
    .with({ error: P.select(P.not(undefined)) }, (error) => (
      <GraphQLErrorPage error={error} />
    ))
    .otherwise(() => <> This message should not appear. </>)
}

export { GeneralInfoQuery }
