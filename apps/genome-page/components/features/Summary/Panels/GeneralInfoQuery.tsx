import { getErrorMessage } from "@dictybase/ui-common"
import { useRouter } from "next/router"
import { useGeneGeneralInformationSummaryQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { Loader } from "components/Loader"
import { ErrorPanel } from "components/panels/ErrorPanel"
import { PanelWrapper } from "components/panels/PanelWrapper"
import { GeneralInfoPanel } from "./GeneralInfoPanel"
import { NoDataPanel } from "./NoDataPanel"

const GeneralInfoQuery = () => {
  const { query } = useRouter()
  const gene = query.id as string
  const result = useGeneGeneralInformationSummaryQuery({
    variables: {
      gene,
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
    errorPolicy: "all",
  })
  return (
    <PanelWrapper title="General Information">
      {match(result)
        .with({ loading: true }, () => <Loader rows={5} />)
        .with(
          {
            data: { geneGeneralInformation: P.select(P.not(P.nullish)) },
          },
          (generalInformation) => (
            <GeneralInfoPanel generalInformation={generalInformation} />
          ),
        )
        .with({ error: P.select(P.not(P.nullish)) }, (error) => (
          <ErrorPanel
            retry={result.refetch}
            details={getErrorMessage(error).message}
          />
        ))
        .with(
          {
            data: P.union({ geneGeneralInformation: P.nullish }, P.nullish),
          },
          () => <NoDataPanel query="Gene Summary" geneId={gene} />,
        )
        .otherwise(() => (
          <> This message should not appear. </>
        ))}
    </PanelWrapper>
  )
}

export { GeneralInfoQuery }
