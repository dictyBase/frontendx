import { useNavigate } from "react-router-dom"
import { Fab } from "@material-ui/core"
import CreateIcon from "@material-ui/icons/Create"

const WriteNewsButton = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate("/news/create")
  }
  return (
    <Fab color="primary" onClick={handleClick}>
      <CreateIcon />
    </Fab>
  )
}

export { WriteNewsButton }
