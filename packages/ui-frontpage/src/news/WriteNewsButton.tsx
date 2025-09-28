import { useNavigate } from "react-router-dom"
import { Fab, Tooltip } from "@mui/material"
import CreateIcon from "@mui/icons-material/Create"

const WriteNewsButton = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate("/news/create")
  }
  return (
    <Tooltip title="Write News Article" aria-label="write-news-article">
      <Fab
        onClick={handleClick}
        sx={{
          background: (theme) =>
            `linear-gradient(to top, #000080, ${theme.palette.primary.light})`,
          color: (theme) => theme.palette.primary.contrastText,
        }}>
        <CreateIcon />
      </Fab>
    </Tooltip>
  )
}

export { WriteNewsButton }
