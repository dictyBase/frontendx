import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../../features/Authentication/AuthStore"

/**
 * PrivateRoute redirects user from route if not authenticated.
 * This uses the same API as <Route/>
 */

/*
  Changes to private routes in react router 6
  https://gist.github.com/mjackson/d54b40a094277b7afdd6b81f51a0393f#route-composition-in-react-router-v6
*/
const PrivateRoute = () => {
  /* Fix this later in the future */
  const {
    state: { isAuthenticated },
  } = useAuthStore()

  if (!isAuthenticated) {
    return (
      <Navigate
        to={{
          pathname: "/login",
        }}
        state={{ error: "You must be logged in to view this page!" }}
      />
    )
  }
  return <Outlet />
}

export default PrivateRoute
