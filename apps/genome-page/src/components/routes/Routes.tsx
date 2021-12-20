import React, { lazy, Suspense } from "react"
import { Route, Routes as ReactRoutes, Navigate } from "react-router-dom"
import useGoogleAnalytics from "common/hooks/useGoogleAnalytics"
import Loader from "common/components/Loader"

/**
 * Lazy loading components for increased performance.
 * See https://reactjs.org/docs/code-splitting.html#code-splitting for code-splitting
 */
const LoginPage = lazy(() => import("features/Authentication/Login"))
const OauthCallbackPage = React.lazy(
  () => import("features/Authentication/OauthCallback"),
)
const AuthLoaderPage = lazy(() => import("features/Authentication/AuthLoader"))
const LogoutPage = lazy(() => import("features/Authentication/Logout"))
const SummaryPage = lazy(() => import("features/Summary/SummaryContainer"))
const OntologyPage = lazy(() => import("features/Ontology/OntologyContainer"))
const PhenotypesPage = lazy(
  () => import("features/Phenotypes/PhenotypesContainer"),
)
const ReferencesPage = lazy(
  () => import("features/References/ReferencesContainer"),
)
const PageNotReady = lazy(() => import("common/components/PageNotReady"))

/**
 * List of routes used with React Router.
 */
const Routes = () => {
  useGoogleAnalytics()

  return (
    <Suspense fallback={<Loader />}>
      <ReactRoutes>
        <Route path="/">
          {/* Since react-router v6 has removed Redirect we have to use Navigate instead. See https://gist.github.com/mjackson/b5748add2795ce7448a366ae8f8ae3bb#not-server-rendering */}
          <Route index element={<Navigate replace to="/sadA" />} />
          <Route path="login" element={<LoginPage />} />
          <Route path=":provider/callback" element={<OauthCallbackPage />} />
          <Route path="load/auth" element={<AuthLoaderPage />} />
          <Route path="logout" element={<LogoutPage />} />
          <Route path=":gene">
            <Route index element={<SummaryPage />} />
            <Route path="goannotations" element={<OntologyPage />} />
            <Route path="phenotypes" element={<PhenotypesPage />} />
            <Route path="references" element={<ReferencesPage />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotReady />} />
      </ReactRoutes>
    </Suspense>
  )
}

export default Routes
