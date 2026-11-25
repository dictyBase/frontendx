import { useState } from "react"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { CreatableStrainText } from "./CreatableStrainText"
import { CreatingStrainText } from "./CreatingStrainText"
import { StrainTextEditableField } from "./EditingStrainText"

type AuthorizedEmptyStrainTextProperties = {
  /** Strain ID */
  id: string
  /** Strain field key to populate */
  field: StrainTextEditableField
}

/**
 * Toggles an empty single-value strain field between the Create button and inline text editor.
 *
 * @param properties - Strain ID and field key.
 * @returns The rendered AuthorizedEmptyStrainText component.
 */
const AuthorizedEmptyStrainText = ({
  id,
  field,
}: AuthorizedEmptyStrainTextProperties) => {
  const [isCreating, setIsCreating] = useState(false)

  return pipe(
    isCreating,
    Bmatch(
      () => <CreatableStrainText setIsCreating={setIsCreating} />,
      () => (
        <CreatingStrainText
          setIsCreating={setIsCreating}
          id={id}
          field={field}
        />
      ),
    ),
  )
}

export { AuthorizedEmptyStrainText, type AuthorizedEmptyStrainTextProperties }
