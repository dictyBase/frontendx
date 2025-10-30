import { useState, FunctionComponent } from "react"
import { pipe } from "fp-ts/function"
import { isEmpty as SisEmpty } from "fp-ts/string"
import { map as Amap } from "fp-ts/Array"
import { Option, some, none } from "fp-ts/Option"
import Stack from "@mui/material/Stack"
import Chip from "@mui/material/Chip"
import Grow from "@mui/material/Grow"
import { UpdateGeneGeneralInfoInput } from "dicty-graphql-schema"
import { useAuthorizedUpdateGeneGeneralInfo } from "common/hooks/useAuthorizedUpdateGeneGeneralInfo"
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog"
import { MorphingButton } from "./MorphingButton"

const EditableContentList: FunctionComponent<{
  id: string
  field: keyof Omit<UpdateGeneGeneralInfoInput, "user">
  infoList: Array<string>
  label: string
}> = ({ id, field, infoList, label }) => {
  const update = useAuthorizedUpdateGeneGeneralInfo()

  const [deleteIsOpen, setDeleteIsOpen] = useState(false)
  const [selectedForDeletion, setSelectedForDeletion] =
    useState<Option<string>>(none)

  const handleOpenDelete = (selected: string) => () => {
    setSelectedForDeletion(some(selected))
    setDeleteIsOpen(true)
  }

  const handleCloseDelete = () => {
    setDeleteIsOpen(false)
  }

  const handleAdd = async (value: string) => {
    if (SisEmpty(value)) return
    await update(id, { [field]: [...infoList, value] })
  }

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
          Amap((s) => (
            <Grow key={s} in timeout={300}>
              <Chip label={s} onDelete={handleOpenDelete(s)} />
            </Grow>
          )),
        )}
        <MorphingButton onAdd={handleAdd} />
      </Stack>
      <ConfirmDeleteDialog
        open={deleteIsOpen}
        onClose={handleCloseDelete}
        selectedValue={selectedForDeletion}
      />
    </>
  )
}

export { EditableContentList }
