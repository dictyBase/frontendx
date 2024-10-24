import { useNavigate } from "react-router-dom"
import { Button } from "@material-ui/core"
import ViewListRoundedIcon from "@material-ui/icons/ViewListRounded"

const BrowseEditableNewsButton = () => {
  const navigate = useNavigate()

  const handleReturn = () => {
    navigate("/news/editable")
  }
  return (
    <Button
      onClick={handleReturn}
      startIcon={<ViewListRoundedIcon color="action" />}>
      Browse News
    </Button>
  )
}

export { BrowseEditableNewsButton }
