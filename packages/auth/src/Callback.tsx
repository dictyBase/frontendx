import { useHandleSignInCallback } from "@logto/react"
import { useNavigate } from "react-router-dom"
import { LoadingDisplay } from "./LoadingDisplay"

/**
 * Callback component
 *
 * This component is responsible for handling the callback after a successful sign-in.
 * It renders a loading display until the sign-in process is completed.
 */
const Callback = () => {
  const navigate = useNavigate()
  const { isLoading } = useHandleSignInCallback(() => {
    navigate("/")
  })
  return isLoading ? <LoadingDisplay rows={5} /> : <></>
}

export { Callback }
