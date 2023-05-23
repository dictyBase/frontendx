import { Button } from "@material-ui/core"
import { useNavigate } from "react-router-dom"

const CreateButton = () => {
  const navigate = useNavigate()

  const onClick = () => {
    navigate("/news/create")
  }

  return <Button onClick={onClick}>Create</Button>
}

export default CreateButton
