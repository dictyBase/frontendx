import { match } from "ts-pattern"
import { useFetchPublications } from "../../common/hooks/useFetchPublications"
import {
  LatestPapersView,
  LatestPapersLoader,
  LatestPapersError,
} from "./LatestPapersView"

const LatestPapers = () => {
  const fetchState = useFetchPublications(import.meta.env.VITE_RSS_URL)
  return match(fetchState)
    .with({ loading: true }, () => <LatestPapersLoader />)
    .when(
      ({ data }) => data.length > 0,
      ({ data }) => <LatestPapersView data={data} />,
    )
    .when(
      ({ error }) => error.length > 0,
      ({ error }) => <LatestPapersError error={error} />,
    )
    .otherwise(() => <> This message should not appear. </>)
}

export { LatestPapers }
