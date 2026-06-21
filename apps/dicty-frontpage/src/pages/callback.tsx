import { useHandleSignInCallback } from "@logto/react"
import { useNavigate } from "react-router-dom"
import { FullPageLoadingDisplay } from "@dictybase/ui-common"
import { ACCESS } from "@dictybase/auth-mui5"

const Callback = () => {
  const navigate = useNavigate()
  const { isLoading } = useHandleSignInCallback(() => {
    navigate("/")
  })
  return isLoading ? <FullPageLoadingDisplay /> : <></>
}

// eslint-disable-next-line import/no-default-export
export default Callback
export const access = ACCESS.public
