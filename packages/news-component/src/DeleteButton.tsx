import { Button } from "@material-ui/core"
import { useNavigate } from "react-router-dom"
import { useDeleteContentMutation } from "dicty-graphql-schema"

type DeleteButtonProperties = {
  id: string
}

const DeleteButton = ({ id }: DeleteButtonProperties) => {
  const [deleteContent] = useDeleteContentMutation()
  const navigate = useNavigate()

  const onClick = () => {
    deleteContent({
      variables: {
        id,
      },
    })
    navigate("/news")
  }

  return (
    <Button variant="contained" onClick={onClick}>
      Delete
    </Button>
  )
}

export default DeleteButton
