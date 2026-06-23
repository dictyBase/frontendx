import { useParams } from "react-router-dom"
import { match, P } from "ts-pattern"
import { PageLayout, FullPageLoadingDisplay } from "@dictybase/ui-common"
import { usePlasmidQuery, PlasmidQuery } from "dicty-graphql-schema"
import { ErrorPageWrapper } from "../ErrorPageWrapper"
import { characterConverter } from "../utils/characterConverter"
import { DetailsHeader } from "./DetailsHeader"
import { PlasmidDetailsCard } from "./PlasmidDetailsCard"
import { CatalogItemDetailsLayout } from "./CatalogItemDetailsLayout"

type PlasmidDetailsProperties = {
  plasmid: NonNullable<PlasmidQuery["plasmid"]>
}

const PlasmidDetails = ({ plasmid }: PlasmidDetailsProperties) => {
  const label = characterConverter(plasmid.name)
  const title = `Plasmid Details for ${label}`

  return (
    <CatalogItemDetailsLayout title={title} metaContent={label}>
      <DetailsHeader id={plasmid.id} name={plasmid.name} />
      <PlasmidDetailsCard plasmid={plasmid} />
    </CatalogItemDetailsLayout>
  )
}

/**
 * PlasmidDetailsContainer is the main component for an individual plasmid details page.
 * It is responsible for fetching the data and passing it down to more specific components.
 */
const PlasmidDetailsContainer = () => {
  const { id } = useParams()
  const result = usePlasmidQuery({
    variables: { id: `${id}` },
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
  })
  return match(result)
    .with({ data: { plasmid: P.select(P.not(P.nullish)) } }, (plasmid) => (
      <PlasmidDetails plasmid={plasmid} />
    ))
    .with({ loading: true }, () => <FullPageLoadingDisplay />)
    .with({ error: P.select(P.not(undefined)) }, (error) => (
      <ErrorPageWrapper error={error} />
    ))
    .otherwise(() => <> This message should not appear. </>)
}

export { PlasmidDetailsContainer, PlasmidDetails }
