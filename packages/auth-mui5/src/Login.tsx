import { useLogto } from "@logto/react"
import { Navigate } from "react-router-dom"

const Login = () => {
  const { isAuthenticated } = useLogto()
  return isAuthenticated ? <Navigate to="/" /> : <Navigate to="/callback" />
}

export { Login }
