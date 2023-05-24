import { Button } from "@material-ui/core"
import { useNavigate } from "react-router-dom"

const CancelButton = () => {
  const navigate = useNavigate()

  const onClick = () => {
    navigate("/news")
  }

  return (
    <Button variant="contained" onClick={onClick}>
      Cancel
    </Button>
  )
}

export default CancelButton
