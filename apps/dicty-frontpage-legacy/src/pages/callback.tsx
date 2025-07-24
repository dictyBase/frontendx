import { useHandleSignInCallback } from "@logto/react"
import { useNavigate } from "react-router-dom"
import { Loader } from "../common/components/Loader"

const Callback = () => {
  const navigate = useNavigate()
  const { isLoading } = useHandleSignInCallback(() => {
    navigate("/")
  })
  return isLoading ? <Loader /> : <></>
}

// eslint-disable-next-line import/no-default-export
export default Callback
