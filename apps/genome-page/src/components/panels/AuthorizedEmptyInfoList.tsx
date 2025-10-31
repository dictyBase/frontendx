import { FunctionComponent, useState } from "react"
import { isEmpty as SisEmpty } from "fp-ts/string"
import Button from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"
import { CreateGeneGeneralInfoInput } from "dicty-graphql-schema"
import { useAuthorizedCreateGeneGeneralInfo } from "common/hooks/useAuthorizedCreateGeneGeneralInfo"
import { CreateItemDialog } from "./CreateItemDialog"
import { MorphingCreateButton } from "./MorphingCreateButton"

const AuthorizedEmptyInfoList: FunctionComponent<{
  id: string
  field: keyof Omit<CreateGeneGeneralInfoInput, "user">
}> = ({ id, field, label }) => {
  const create = useAuthorizedCreateGeneGeneralInfo()

  const handleAdd = async (value: string) => {
    if (SisEmpty(value)) return
    await create(id, { [field]: [value] })
  }

  return <MorphingCreateButton onAdd={handleAdd} />
}

export { AuthorizedEmptyInfoList }
