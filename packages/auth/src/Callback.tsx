import { useHandleSignInCallback } from "@logto/react"
import { useNavigate } from "react-router-dom"
import { LoadingDisplay } from "./LoadingDisplay"

const Callback = () => {
  const navigate = useNavigate()
  const { isLoading } = useHandleSignInCallback(() => {
    navigate("/")
  })
  return isLoading ? <LoadingDisplay rows={5} /> : <></>
}

export { Callback }
