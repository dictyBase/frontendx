import { Navigate, Outlet } from "react-router-dom"
import { useLogto } from "@logto/react"

const Protected = () => {
  const { isAuthenticated } = useLogto()
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}

export { Protected }
