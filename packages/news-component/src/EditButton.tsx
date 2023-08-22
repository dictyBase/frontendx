import { IconButton } from "@material-ui/core"
import CreateIcon from "@material-ui/icons/Create"
import { useNavigate } from "react-router-dom"

type EditbuttonProperties = {
  slug: string
}

const EditButton = ({ slug }: EditbuttonProperties) => {
  const navigate = useNavigate()

  const onClick = () => {
    navigate(`/news/${slug}/edit`)
  }

  return (
    <IconButton onClick={onClick}>
      <CreateIcon />
    </IconButton>
  )
}

export { EditButton }
