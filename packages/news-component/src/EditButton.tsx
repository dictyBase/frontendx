import { Button } from "@material-ui/core"
import { useNavigate } from "react-router-dom"

type EditbuttonProperties = {
  slug: string
}

const Editbutton = ({ slug }: EditbuttonProperties) => {
  const navigate = useNavigate()

  const onClick = () => {
    navigate(`/news/${slug}/edit`)
  }

  return (
    <Button variant="contained" onClick={onClick}>
      Edit
    </Button>
  )
}

export default Editbutton
