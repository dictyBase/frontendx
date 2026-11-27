import { isEmpty as SisEmpty } from "fp-ts/string"
import { left as TEleft } from "fp-ts/TaskEither"
import {
  useAuthorizedUpdateStrain,
  StrainUpdateErrorType,
} from "./useAuthorizedUpdateStrain"
import { StrainListEditableField } from "./EditableStrainList"
import { MorphingCreateButton } from "./MorphingCreateButton"

type AuthorizedEmptyStrainListProperties = {
  /** Strain ID */
  id: string
  /** Array field key in UpdateStrainInput */
  field: StrainListEditableField
}

/**
 * Renders a morphing Create button for an initially empty array field on a strain.
 *
 * @param properties - Strain ID and array field key.
 * @returns The rendered AuthorizedEmptyStrainList component.
 */
const AuthorizedEmptyStrainList = ({
  id,
  field,
}: AuthorizedEmptyStrainListProperties) => {
  const update = useAuthorizedUpdateStrain()

  const handleAdd = (value: string) => {
    if (SisEmpty(value)) {
      return TEleft({
        errorType: StrainUpdateErrorType.VALIDATION,
        message: "Value cannot be empty",
      })
    }

    return update(id, { [field]: [value] })
  }

  return <MorphingCreateButton onAdd={handleAdd} />
}

export { AuthorizedEmptyStrainList, type AuthorizedEmptyStrainListProperties }
