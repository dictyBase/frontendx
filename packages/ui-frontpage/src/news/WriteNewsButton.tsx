import { useNavigate } from "react-router-dom"
import { Fab, Tooltip } from "@material-ui/core"
import CreateIcon from "@material-ui/icons/Create"

const WriteNewsButton = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate("/news/create")
  }
  return (
    <Tooltip title="Write News Article" aria-label="write-news-article">
      <Fab color="primary" onClick={handleClick}>
        <CreateIcon />
      </Fab>
    </Tooltip>
  )
}

export { WriteNewsButton }
