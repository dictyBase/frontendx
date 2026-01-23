import { FunctionComponent, useState } from "react"
import Button from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"
import { CreateGeneGeneralInfoInput } from "dicty-graphql-schema"
import { CreateItemDialog } from "./CreateItemDialog"

const AuthorizedEmptyInfoList: FunctionComponent<{
  id: string
  field: keyof Omit<CreateGeneGeneralInfoInput, "user">
  label: string
}> = ({ id, field, label }) => {
  const [createIsOpen, setCreateIsOpen] = useState(false)
  const handleOpenCreate = () => {
    setCreateIsOpen(true)
  }

  const handleCloseCreate = () => {
    setCreateIsOpen(false)
  }
  return (
    <>
      <Button
        startIcon={<AddIcon />}
        onClick={handleOpenCreate}
        sx={{
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          borderRadius: "9999px",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}>
        Create
      </Button>
      <CreateItemDialog
        id={id}
        field={field}
        label={label}
        open={createIsOpen}
        onClose={handleCloseCreate}
      />
    </>
  )
}

export { AuthorizedEmptyInfoList }
