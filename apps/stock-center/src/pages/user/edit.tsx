import { useLocation } from "react-router-dom"
import { UserInfoResponse } from "@logto/react"
import { Typography } from "@material-ui/core"
import { ACCESS } from "../../types"

const Edit = () => {
  const location = useLocation()
  const user = location.state as UserInfoResponse
  return <Typography variant="h1">Edit {user.name}</Typography>
}

export default Edit
export const access = ACCESS.protected
