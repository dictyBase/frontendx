import { useNavigate } from "react-router-dom"
import { Button } from "@material-ui/core"
import ViewListRoundedIcon from "@material-ui/icons/ViewListRounded"

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
