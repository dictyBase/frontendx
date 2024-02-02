import { match } from "ts-pattern"
import { PublicationsView } from "./PublicationsView"
import { useFetchPublications } from "../../common/hooks/useFetchPublications"

const Publications = () => {
  const fetchState = useFetchPublications(import.meta.env.VITE_RSS_URL)

  return match(fetchState)
    .with({ loading: true }, () => <> Loading </>)
    .when(
      ({ error }) => error.length > 0,
      ({ error }) => <>{error}</>,
    )
    .when(
      ({ data }) => data.length > 0,
      ({ data }) => <PublicationsView data={data} />,
    )
    .otherwise(() => <> This message should not appear. </>)
}

export { Publications }
