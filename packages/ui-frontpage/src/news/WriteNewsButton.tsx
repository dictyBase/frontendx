import { useNavigate } from "react-router-dom"
import { Fab, Tooltip, makeStyles } from "@material-ui/core"
import { blue } from "@material-ui/core/colors"
import CreateIcon from "@material-ui/icons/Create"

const useStyles = makeStyles((theme) => ({
  root: {
    background: `linear-gradient(to top, ${"#000080"}, ${theme.palette.primary.light})`,
    color: theme.palette.primary.contrastText,
  },
}))

const WriteNewsButton = () => {
  const { root } = useStyles()
  const navigate = useNavigate()
  const handleClick = () => {
    navigate("/news/create")
  }
  return (
    <Tooltip title="Write News Article" aria-label="write-news-article">
      <Fab onClick={handleClick} className={root}>
        <CreateIcon />
      </Fab>
    </Tooltip>
  )
}

export { WriteNewsButton }
