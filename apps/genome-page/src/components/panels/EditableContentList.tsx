import { FunctionComponent } from "react"
import { pipe } from "fp-ts/function"
import { isEmpty as SisEmpty, Eq as SEq } from "fp-ts/string"
import { map as Amap, filter as Afilter, elem as Aelem } from "fp-ts/Array"
import { left as TEleft } from "fp-ts/TaskEither"
import Stack from "@mui/material/Stack"
import { UpdateGeneGeneralInfoInput } from "dicty-graphql-schema"
import {
  Errors,
  useAuthorizedUpdateGeneGeneralInfo,
} from "common/hooks/useAuthorizedUpdateGeneGeneralInfo"
import { MorphingButton } from "./MorphingButton"
import { DeletableChip } from "./DeletableChip"

const EditableContentList: FunctionComponent<{
  id: string
  field: keyof Omit<UpdateGeneGeneralInfoInput, "user">
  infoList: Array<string>
}> = ({ id, field, infoList }) => {
  const update = useAuthorizedUpdateGeneGeneralInfo()

  const handleAdd = (value: string) => {
    if (SisEmpty(value)) {
      return TEleft({
        errorType: Errors.VALIDATION,
        message: "Value cannot be empty",
      })
    }

    if (pipe(infoList, Aelem(SEq)(value))) {
      return TEleft({
        errorType: Errors.VALIDATION,
        message: "Value already exists",
      })
    }

    return update(id, { [field]: [...infoList, value] })
  }

  const handleDelete = (value: string) =>
    pipe(
      infoList,
      Afilter((item) => item !== value),
      (filteredList) => update(id, { [field]: filteredList }),
    )

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap"
        spacing={1}
        rowGap={1}>
        {pipe(
          infoList,
          Amap((s) => <DeletableChip label={s} handleDelete={handleDelete} />),
        )}
        <MorphingButton onAdd={handleAdd} />
      </Stack>
    </>
  )
}

export { EditableContentList }
