import { IconButton } from "@material-ui/core"
import Add from "@material-ui/icons/Add"
import { useNavigate } from "react-router-dom"

const CreateButton = () => {
  const navigate = useNavigate()

  const onClick = () => {
    navigate("/news/create")
  }

  return (
    <IconButton onClick={onClick}>
      <Add />
    </IconButton>
  )
}

export { CreateButton }
