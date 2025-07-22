import { useLocation } from "react-router-dom"
import { UserInfoResponse } from "@logto/react"
import { Typography } from "@material-ui/core"
import { ACCESS } from "@dictybase/auth"

const Edit = () => {
  const location = useLocation()
  const user = location.state as UserInfoResponse
  return <Typography variant="h1">Edit {user.name}</Typography>
}

// eslint-disable-next-line import/no-default-export
export default Edit
export const access = ACCESS.protected
