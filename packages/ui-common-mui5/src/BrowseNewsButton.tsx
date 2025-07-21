import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded"

const BrowseNewsButton = () => {
  const navigate = useNavigate()

  const handleReturn = () => {
    navigate("/news/show")
  }
  return (
    <Button
      onClick={handleReturn}
      startIcon={<ViewListRoundedIcon color="action" />}>
      Browse News
    </Button>
  )
}

export { BrowseNewsButton }
