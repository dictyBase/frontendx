import { useLogto } from "@logto/react"
import { Navigate } from "react-router-dom"

const SignIn = () => {
  const { isAuthenticated } = useLogto()
  return isAuthenticated ? <Navigate to="/" /> : <Navigate to="/callback" />
}

export default SignIn
