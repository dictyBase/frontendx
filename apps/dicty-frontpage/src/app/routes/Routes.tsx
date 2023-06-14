import { Fragment } from "react"
import { Route, Routes as ReactRoutes } from "react-router-dom"
import Front from "../../features/Frontpage/Front"
import PageNotReady from "../../common/components/PageNotReady"
import useGoogleAnalytics from "../../common/hooks/useGoogleAnalytics"
import PrivateRoute from "./PrivateRoute"
import ProtectedRoute from "./ProtectedRoute"
import { routes } from "."
import { ACCESS } from "./types"

const Routes = () => {
  useGoogleAnalytics()
  return (
    <ReactRoutes>
      <Route path="/">
        <Route index element={<Front />} />
        {routes.map(({ path, component: Component = Fragment, access }) => {
          let element = <Component />

          if (access === ACCESS.protected)
            element = <ProtectedRoute component={Component} />

          if (access === ACCESS.private)
            element = (
              <PrivateRoute>
                <Component />
              </PrivateRoute>
            )

          return <Route key={path} path={path} element={element} />
        })}
      </Route>
      <Route path="*" element={<PageNotReady />} />
    </ReactRoutes>
  )
}

export default Routes
