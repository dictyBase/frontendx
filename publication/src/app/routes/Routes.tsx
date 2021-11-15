import React from "react"
import { Navigate, Route, Routes as ReactRoutes } from "react-router-dom"
import PublicationContainer from "features/Publication/PublicationContainer"
import Login from "features/Authentication/Login"
import OauthCallback from "features/Authentication/OauthCallback"
import AuthLoader from "features/Authentication/AuthLoader"
import Logout from "features/Authentication/Logout"
import useGoogleAnalytics from "common/hooks/useGoogleAnalytics"

/**
 * Component for all of our React Router routes.
 */

export const Routes = () => {
  useGoogleAnalytics()

  return (
    <ReactRoutes>
      <Route path="/">
        <Route index element={<Navigate replace to="/26088819" />} />
        <Route path="login" element={<Login />} />
        <Route path=":provider/callback" element={<OauthCallback />} />
        <Route path="load/auth" element={<AuthLoader />} />
        <Route path="logout" element={<Logout />} />
        <Route path=":id" element={<PublicationContainer />} />
      </Route>
    </ReactRoutes>
  )
}

export default Routes
