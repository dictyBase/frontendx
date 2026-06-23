import { useState } from "react"
import { useParams } from "react-router-dom"
import { useStrainQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { pipe } from "fp-ts/function"
import {
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
  map as Omap,
} from "fp-ts/Option"
import { match as Amatch } from "fp-ts/Array"
import { PageLayout, FullPageLoadingDisplay } from "@dictybase/ui-common"
import { ErrorPageWrapper } from "../ErrorPageWrapper"
import { characterConverter } from "../utils/characterConverter"
import { DetailsHeader } from "./DetailsHeader"
import { EditableStrainDetailsCard } from "./EditableStrainDetailsCard"

/**
 * EditableStrainDetailsContainer is the main component for an individual strain details page.
 * It is responsible for fetching the data and passing it down to more specific components.
 * It is the editable version of the page for content admins to edit strain details.
 */

const EditableStrainDetailsContainer = () => {
  const { id } = useParams()
  const [tabValue, setTabValue] = useState(0)
  const result = useStrainQuery({
    variables: { id: `${id}` },
    errorPolicy: "all",
    fetchPolicy: "cache-and-network",
  })
  return match(result)
    .with({ data: { strain: P.select(P.not(P.nullish)) } }, (strain) => {
      const label = characterConverter(strain.label)
      const metadataContent = `Dicty Stock Center strain details page for ${label}`
      const title = pipe(
        strain.phenotypes,
        OfromNullable,
        Omap(
          Amatch(
            () => `Strain Details for ${label}`,
            () => `Phenotype and Strain Details for ${label}`,
          ),
        ),
        OgetOrElse(() => `Strain Details for ${label}`),
      )
      return (
        <PageLayout metaContent={metadataContent} title={title}>
          <DetailsHeader id={strain.id} name={strain.label} />
          <EditableStrainDetailsCard
            data={strain}
            tabValue={tabValue}
            setTabValue={setTabValue}
          />
        </PageLayout>
      )
    })
    .with({ loading: true }, () => <FullPageLoadingDisplay />)
    .with({ error: P.select(P.not(P.nullish)) }, (error) => (
      <ErrorPageWrapper error={error} />
    ))
    .otherwise(() => <> This message should not appear. </>)
}

export { EditableStrainDetailsContainer }
