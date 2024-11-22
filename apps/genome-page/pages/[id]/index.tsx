import { SummaryContainer } from "components/features/Summary/SummaryContainer"
import { SummaryLoader } from "components/features/Summary/SummaryLoader"
import { GraphQLErrorPage } from "@dictybase/ui-common"
import { useRouter } from "next/router"
import { useGeneSummaryQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"

/**
 * Renders the gene page given a gene id
 */
const GenomePageWrapper = () => {
  const { query } = useRouter()
  const gene = query.id as string
  const result = useGeneSummaryQuery({
    variables: {
      gene,
    },
    fetchPolicy: "cache-and-network",
  })
  return match(result)
    .with(
      {
        data: P.select(P.not(P.nullish)),
      },
      (data) => <SummaryContainer geneSummary={data} />,
    )
    .with({ loading: true }, () => <SummaryLoader />)
    .with({ error: P.select(P.not(undefined)) }, (error) => (
      <GraphQLErrorPage error={error} />
    ))
    .otherwise(() => <> This message should not appear. </>)
}

// eslint-disable-next-line import/no-default-export
export default GenomePageWrapper
