import { FunctionComponent } from "react"
import { useAuthStore } from "../../features/Authentication/AuthStore"

type ProtectedRouteProperties = {
  component: FunctionComponent<{ isAuthenticated: boolean }>
}

const ProtectedRoute = ({ component: Component }: ProtectedRouteProperties) => {
  const {
    state: { isAuthenticated },
  } = useAuthStore()
  return <Component isAuthenticated={isAuthenticated} />
}

export default ProtectedRoute
