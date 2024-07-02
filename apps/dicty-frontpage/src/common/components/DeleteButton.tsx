import { Button } from "@material-ui/core"
import { useNavigate } from "react-router-dom"
import { useAuthorizedDeleteContent } from "../hooks/useAuthorizedDeleteContent"

type DeleteButtonProperties = {
  id: string
}

const DeleteButton = ({ id }: DeleteButtonProperties) => {
  const navigate = useNavigate()
  const authorizedDeleteContent = useAuthorizedDeleteContent(id)

  const handleDelete = async () => {
    // handle error / success state
    await authorizedDeleteContent()
    navigate("/news/editable", { relative: "path" })
  }

  return <Button onClick={handleDelete}> Delete </Button>
}

export { DeleteButton }
