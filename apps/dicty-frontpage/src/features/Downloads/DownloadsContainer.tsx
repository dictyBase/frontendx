import { match, P } from "ts-pattern"
import { useListOrganismsQuery } from "dicty-graphql-schema"
import { DownloadsDisplay, DownloadsLoader } from "@dictybase/ui-frontpage"
import { ErrorPageWrapper } from "../../common/components/errors/ErrorPageWrapper"

/**
 * Fetches the data for the downloads page.
 */
const DownloadsContainer = () => {
  const result = useListOrganismsQuery({
    fetchPolicy: "cache-and-network",
  })

  return match(result)
    .with(
      { data: { listOrganisms: P.select(P.not(P.nullish)) } },
      (organisms) => <DownloadsDisplay data={organisms} />,
    )
    .with({ error: P.select(P.not(P.nullish)) }, (error) => (
      <ErrorPageWrapper error={error} />
    ))
    .with({ loading: true }, () => <DownloadsLoader />)
    .otherwise(() => "This message should not appear.")
}

export { DownloadsContainer }
