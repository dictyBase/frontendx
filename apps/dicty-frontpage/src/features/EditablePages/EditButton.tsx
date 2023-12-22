import { Button } from "@material-ui/core"
import { useNavigate } from "react-router-dom"

const EditButton = () => {
  const navigate = useNavigate()

  return <Button onClick={() => navigate("edit")} />
}

export { EditButton }
