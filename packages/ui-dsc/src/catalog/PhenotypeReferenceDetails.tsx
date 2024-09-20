import { useFormContext } from "react-hook-form"
import { usePublicationQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { PhenotypeReferenceDetailsDisplay } from "./PhenotypeReferenceDetailsDisplay"
import { PhenotypeReferenceDetailsEmpty } from "./PhenotypeReferenceDetailsEmpty"
import { PhenotypeReferenceDetailsError } from "./PhenotypeReferenceDetailsError"
import { PhenotypeReferenceDetailsLoading } from "./PhenotypeReferenceDetailsLoading"

const PhenotypeReferenceDetails = () => {
  const { watch } = useFormContext()
  const publicationInput = watch("publication")
  const isEmptyInput = publicationInput.length === 0
  const result = usePublicationQuery({
    skip: isEmptyInput,
    variables: { id: publicationInput },
  })

  if (isEmptyInput) return <PhenotypeReferenceDetailsEmpty />
  return match(result)
    .with({ error: P.not(undefined) }, () => (
      <PhenotypeReferenceDetailsError publicationId={publicationInput} />
    ))
    .with({ loading: true }, () => <PhenotypeReferenceDetailsLoading />)
    .with(
      { data: { publication: P.select({ id: P.string }) } },
      (publication) => (
        <PhenotypeReferenceDetailsDisplay publication={publication} />
      ),
    )
    .otherwise(() => <>This message should not appear</>)
}

export { PhenotypeReferenceDetails }
