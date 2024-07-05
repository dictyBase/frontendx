import { Button, makeStyles } from "@material-ui/core"
import { useNavigate } from "react-router-dom"
import { useAuthorizedDeleteContent } from "../hooks/useAuthorizedDeleteContent"

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
}))
type DeleteButtonProperties = {
  id: string
}

const DeleteButton = ({ id }: DeleteButtonProperties) => {
  const { button } = useStyles()
  const navigate = useNavigate()
  const authorizedDeleteContent = useAuthorizedDeleteContent(id)

  const handleDelete = async () => {
    // handle error / success state
    await authorizedDeleteContent()
    navigate("/news/editable", { relative: "path" })
  }

  return (
    <Button className={button} variant="contained" onClick={handleDelete}>
      Delete
    </Button>
  )
}

export { DeleteButton }
