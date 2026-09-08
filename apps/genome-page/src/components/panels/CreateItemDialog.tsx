import { FunctionComponent, ChangeEventHandler, useState } from "react"
import { UpdateGeneGeneralInfoInput } from "dicty-graphql-schema"
import { isEmpty as SisEmpty } from "fp-ts/string"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { useAuthorizedCreateGeneGeneralInfo } from "common/hooks/useAuthorizedCreateGeneGeneralInfo"

const CreateItemDialog: FunctionComponent<{
  id: string
  label: string
  field: keyof Omit<UpdateGeneGeneralInfoInput, "user">
  open: boolean
  onClose: () => void
}> = ({ id, field, label, open, onClose }) => {
  const [newItem, setNewItem] = useState("")
  const create = useAuthorizedCreateGeneGeneralInfo()

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: { value },
  }) => {
    setNewItem(value)
  }

  const handleSave = () => {
    if (SisEmpty(newItem)) return
    create(id, { [field]: [newItem] })
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h2">{`Create ${label}`}</Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          id="create"
          label={label}
          sx={{ marginTop: "1rem" }}
          value={newItem}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="success"
          onClick={handleSave}
          disabled={SisEmpty(newItem)}>
          Create
        </Button>
        <Button color="inherit" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export { CreateItemDialog }
