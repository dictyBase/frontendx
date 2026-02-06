import { match } from "ts-pattern"
import {
  LatestPapersView,
  LatestPapersLoader,
  LatestPapersError,
} from "@dictybase/ui-frontpage"
import { useFetchPublications } from "../../common/hooks/useFetchPublications"

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
      ({ refetch }) => <LatestPapersError refetch={refetch} />,
    )
    .otherwise(() => <> This message should not appear. </>)
}

export { LatestPapers }
