import { useState, FunctionComponent } from "react"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { Option, some, none } from "fp-ts/Option"
import AddIcon from "@mui/icons-material/Add"
import Stack from "@mui/material/Stack"
import Chip from "@mui/material/Chip"
import IconButton from "@mui/material/IconButton"
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog"
import { CreateItemDialog } from "./CreateItemDialog"

const EditableContentList: FunctionComponent<{
  infoList: Array<string>
  label: string
}> = ({ infoList, label }) => {
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)
  const [createIsOpen, setCreateIsOpen] = useState(false)
  const [selectedForDeletion, setSelectedForDeletion] =
    useState<Option<string>>(none)

  const handleDelete = (selected: string) => () => {
    setSelectedForDeletion(some(selected))
    setDeleteIsOpen(true)
  }

  const handleCloseDelete = () => {
    setDeleteIsOpen(false)
  }

  const handleCloseCreate = () => {
    setCreateIsOpen(false)
  }

  const handleCreate = () => {
    setCreateIsOpen(true)
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
          Amap((s) => <Chip key={s} label={s} onDelete={handleDelete(s)} />),
        )}
        <IconButton
          size="small"
          onClick={handleCreate}
          sx={{
            backgroundColor: "primary.main",
            color: "primary.contrastText",
          }}>
          <AddIcon />
        </IconButton>
      </Stack>
      <ConfirmDeleteDialog
        open={deleteIsOpen}
        onClose={handleCloseDelete}
        selectedValue={selectedForDeletion}
      />
      <CreateItemDialog
        open={createIsOpen}
        onClose={handleCloseCreate}
        label={label}
      />
    </>
  )
}

export { EditableContentList }
