import { useHandleSignInCallback } from "@logto/react"
import { LoadingDisplay } from "@dictybase/ui-dsc"
import { useNavigate } from "react-router-dom"
import { ACCESS } from "@dictybase/auth-mui5"

const Callback = () => {
  const navigate = useNavigate()
  const { isLoading } = useHandleSignInCallback(() => {
    navigate("/")
  })
  return isLoading ? <LoadingDisplay rows={5} /> : <></>
}

// eslint-disable-next-line import/no-default-export
export default Callback
export const access = ACCESS.public
