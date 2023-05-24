import { Button } from "@material-ui/core"
import { useNavigate } from "react-router-dom"
import useCreateButtonStyles from "./useCreateButtonStyles"

type CreateButtonProperties = {
  show?: boolean
}

const CreateButton = ({ show = true }: CreateButtonProperties) => {
  const { root } = useCreateButtonStyles({ show })
  const navigate = useNavigate()

  const onClick = () => {
    navigate("/news/create")
  }

  return (
    <Button
      className={root || ""}
      disabled={!show}
      variant="contained"
      color="primary"
      onClick={onClick}>
      Create
    </Button>
  )
}

export default CreateButton
