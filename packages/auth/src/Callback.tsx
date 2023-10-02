import { useHandleSignInCallback } from "@logto/react"
import { LoadingDisplay } from "./LoadingDisplay"
import { useNavigate } from "react-router-dom"

const Callback = () => {
  const navigate = useNavigate()
  const { isLoading } = useHandleSignInCallback(() => {
    navigate("/")
  })
  return isLoading ? <LoadingDisplay rows={5} /> : <></>
}

export { Callback }
