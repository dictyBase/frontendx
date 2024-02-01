import { match } from "ts-pattern"
import { useFetchPublications } from "../../common/hooks/useFetchPublications"
import { LatestPapersView, LatestPapersLoader } from "./LatestPapersView"

const RSS_URL =
  "https://pubmed.ncbi.nlm.nih.gov/rss/search/1xSjLNP-2lGAmjK0hZKzE4pxRxyAAh7BAEFNc5kyVReacTxspv/?limit=15&utm_campaign=pubmed-2&fc=20231211102630"

const LatestPapers = () => {
  const fetchState = useFetchPublications(RSS_URL)

  return match(fetchState)
    .with({ loading: true }, () => <LatestPapersLoader />)
    .when(
      ({ error }) => error.length > 0,
      ({ error }) => <>{error}</>,
    )
    .when(
      ({ data }) => data.length > 0,
      ({ data }) => <LatestPapersView data={data} />,
    )
    .otherwise(() => <> This message should not appear. </>)
}

export { LatestPapers }
