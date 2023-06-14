import { useListOrganismsQuery, Organism } from "dicty-graphql-schema"
import GraphQLErrorPage from "../../../common/components/errors/GraphQLErrorPage"
import DownloadsDisplay from "../../../features/Downloads/DownloadsDisplay"
import DownloadsLoader from "../../../features/Downloads/DownloadsLoader"

/**
 * Fetches the data for the downloads page.
 */

const Downloads = () => {
  const { loading, error, data } = useListOrganismsQuery({
    fetchPolicy: "cache-and-network",
  })

  if (loading) return <DownloadsLoader />

  if (error) return <GraphQLErrorPage error={error} />

  const organisms = data?.listOrganisms as Organism[]

  return <DownloadsDisplay data={organisms} />
}

export default Downloads
export const access = "public"
