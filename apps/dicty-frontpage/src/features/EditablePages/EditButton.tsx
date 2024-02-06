import { Button } from "@material-ui/core"
import { useNavigate } from "react-router-dom"

const EditButton = () => {
  const navigate = useNavigate()

  return (
    <Button
      variant="contained"
      onClick={() => navigate("../edit", { relative: "path" })}>
      Edit
    </Button>
  )
}

export { EditButton }
