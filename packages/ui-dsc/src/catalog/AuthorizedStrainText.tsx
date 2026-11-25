import { useState, ReactNode } from "react"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { EditableStrainText } from "./EditableStrainText"
import { EditingStrainText, StrainTextEditableField } from "./EditingStrainText"

type AuthorizedStrainTextProperties = {
  /** Strain ID */
  id: string
  /** Strain field key to update */
  field: StrainTextEditableField
  /** Current text value of the field */
  text: string
  /** Optional custom ReactNode to display in read mode */
  displayValue?: ReactNode
}

/**
 * Toggles a populated single-value strain field between read mode and inline edit mode.
 *
 * @param properties - Strain ID, field name, current text, and optional custom display node.
 * @returns The rendered AuthorizedStrainText component.
 */
const AuthorizedStrainText = ({
  id,
  field,
  text,
  displayValue,
}: AuthorizedStrainTextProperties) => {
  const [isEditing, setIsEditing] = useState(false)

  return pipe(
    isEditing,
    Bmatch(
      () => (
        <EditableStrainText
          setIsEditing={setIsEditing}
          text={text}
          displayValue={displayValue}
        />
      ),
      () => (
        <EditingStrainText
          setIsEditing={setIsEditing}
          id={id}
          field={field}
          initialText={text}
        />
      ),
    ),
  )
}

export { AuthorizedStrainText, type AuthorizedStrainTextProperties }
