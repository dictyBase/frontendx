import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

const ExitEditingButton = () => {
  const navigate = useNavigate()

  const handleClick = async () => {
    // handle error / success state
    navigate("../editable", { relative: "path" })
  }

  return (
    <Button variant="contained" onClick={handleClick}>
      Exit
    </Button>
  )
}

export { ExitEditingButton }
