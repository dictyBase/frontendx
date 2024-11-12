import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import { match, P } from "ts-pattern"
import Box from "@material-ui/core/Box"
import { usePlasmidQuery, PlasmidQuery } from "dicty-graphql-schema"
import { GraphQLErrorPage } from "@dictybase/ui-frontpage"
import { characterConverter } from "../utils/characterConverter"
import { DetailsHeader } from "./DetailsHeader"
import { DetailsLoader } from "./DetailsLoader"
import { PlasmidDetailsCard } from "./PlasmidDetailsCard"

type PlasmidDetailsProperties = {
  plasmid: NonNullable<PlasmidQuery["plasmid"]>
}

const PlasmidDetails = ({ plasmid }: PlasmidDetailsProperties) => {
  const label = characterConverter(plasmid.name)
  const title = `Plasmid Details for ${label}`

  return (
    <Box textAlign="center">
      <Helmet>
        <title>{title} - Dicty Stock Center</title>
        <meta
          name="description"
          content={`Dicty Stock Center plasmid details page for ${label}`}
        />
      </Helmet>
      <DetailsHeader id={plasmid.id} name={plasmid.name} />
      <PlasmidDetailsCard plasmid={plasmid} />
    </Box>
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
  })

  return match(result)
    .with({ data: { plasmid: P.select(P.not(P.nullish)) } }, (plasmid) => (
      <PlasmidDetails plasmid={plasmid} />
    ))
    .with({ loading: true }, () => <DetailsLoader />)
    .with({ error: P.select(P.not(undefined)) }, (error) => (
      <GraphQLErrorPage error={error} />
    ))
    .otherwise(() => <> This message should not appear. </>)
}

export { PlasmidDetailsContainer, PlasmidDetails }
