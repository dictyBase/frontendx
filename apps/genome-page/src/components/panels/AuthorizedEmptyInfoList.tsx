import { FunctionComponent } from "react"
import { isEmpty as SisEmpty } from "fp-ts/string"
import { left as TEleft } from "fp-ts/TaskEither"
import { CreateGeneGeneralInfoInput } from "dicty-graphql-schema"
import {
  useAuthorizedCreateGeneGeneralInfo,
  Errors,
} from "common/hooks/useAuthorizedCreateGeneGeneralInfo"
import { MorphingCreateButton } from "./MorphingCreateButton"

const AuthorizedEmptyInfoList: FunctionComponent<{
  id: string
  field: keyof Omit<CreateGeneGeneralInfoInput, "user">
}> = ({ id, field }) => {
  const create = useAuthorizedCreateGeneGeneralInfo()

  const handleAdd = (value: string) => {
    if (SisEmpty(value)) {
      return TEleft({
        errorType: Errors.VALIDATION,
        message: "Value cannot be empty",
      })
    }

    return create(id, { [field]: [value] })
  }

  return <MorphingCreateButton onAdd={handleAdd} />
}

export { AuthorizedEmptyInfoList }
