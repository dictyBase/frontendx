import React from "react"
import { Route, Routes as ReactRoutes, Navigate } from "react-router-dom"
import SummaryContainer from "features/Summary/SummaryContainer"
import OntologyContainer from "features/Ontology/OntologyContainer"
import Login from "features/Authentication/Login"
import OauthCallback from "features/Authentication/OauthCallback"
import AuthLoader from "features/Authentication/AuthLoader"
import Logout from "features/Authentication/Logout"
import PageNotReady from "common/components/PageNotReady"
import useGoogleAnalytics from "common/hooks/useGoogleAnalytics"

/**
 * List of routes used with React Router.
 */

// TODO: Consider useRouteMatch instead of identifier

const Routes = () => {
  useGoogleAnalytics()

  return (
    <ReactRoutes>
      <Route path="/login" element={<Login />} />
      <Route path="/:provider/callback" element={<OauthCallback />} />
      <Route path="/load/auth" element={<AuthLoader />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/:gene/goannotations" element={<OntologyContainer />} />
      <Route path="/:gene/*" element={<PageNotReady />} />
      <Route path="/:gene" element={<SummaryContainer />} />
      {/* Since react-router v6 has removed Redirect we have to use Navigate instead. See https://gist.github.com/mjackson/b5748add2795ce7448a366ae8f8ae3bb#not-server-rendering */}
      <Route path="/" element={<Navigate replace to="/sadA" />} />
      <Route path="*" element={<PageNotReady />} />
    </ReactRoutes>
  )
}

export default Routes
