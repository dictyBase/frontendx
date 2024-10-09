import { useState } from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import Box from "@material-ui/core/Box"
import { useStrainQuery } from "dicty-graphql-schema"
import { GraphQLErrorPage } from "@dictybase/ui-frontpage"
import { characterConverter } from "../utils/characterConverter"
import { DetailsHeader } from "./DetailsHeader"
import { DetailsLoader } from "./DetailsLoader"
import { StrainDetailsCard } from "./StrainDetailsCard"

/**
 * StrainDetailsContainer is the main component for an individual strain details page.
 * It is responsible for fetching the data and passing it down to more specific components.
 */
const StrainDetailsContainer = () => {
  const { id } = useParams()
  const [tabValue, setTabValue] = useState(0)
  const { loading, error, data } = useStrainQuery({
    variables: { id: `${id}` },
    errorPolicy: "ignore",
    fetchPolicy: "cache-and-network",
  })

  if (loading) return <DetailsLoader />
  if (error) return <GraphQLErrorPage error={error} />

  const label = characterConverter(data?.strain?.label as string)
  let title = `Strain Details for ${label}`
  if (data?.strain?.phenotypes && data.strain.phenotypes.length > 0) {
    title = `Phenotype and Strain Details for ${label}`
  }

  return (
    <Box textAlign="center">
      <Helmet>
        <title>{title} - Dicty Stock Center</title>
        <meta
          name="description"
          content={`Dicty Stock Center strain details page for ${label}`}
        />
      </Helmet>
      {data?.strain && (
        <>
          <DetailsHeader id={data.strain.id} name={data.strain.label} />
          <StrainDetailsCard
            data={data.strain}
            tabValue={tabValue}
            setTabValue={setTabValue}
          />
        </>
      )}
    </Box>
  )
}

export { StrainDetailsContainer }
