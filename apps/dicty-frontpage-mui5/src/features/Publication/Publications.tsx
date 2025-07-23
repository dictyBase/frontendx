import { match, P } from "ts-pattern"
import { FullPageLoadingDisplay } from "@dictybase/ui-common"
import { PublicationsView } from "./PublicationsView"
import { useFetchPublications } from "../../common/hooks/useFetchPublications"

const Publications = () => {
  const fetchState = useFetchPublications(import.meta.env.VITE_RSS_URL)

  return match(fetchState)
    .with({ loading: true }, () => <FullPageLoadingDisplay />)
    .with({ error: P.not("") }, () => <></>)
    .with({ data: P.array({ title: P.string }) }, ({ data }) => (
      <PublicationsView data={data} />
    ))
    .otherwise(() => <> This message should not appear. </>)
}

export { Publications }
