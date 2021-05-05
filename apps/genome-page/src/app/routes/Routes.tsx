import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
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
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/:provider/callback" component={OauthCallback} />
      <Route path="/load/auth" component={AuthLoader} />
      <Route path="/logout" component={Logout} />
      <Route path="/:gene/goannotations" component={OntologyContainer} />
      <Route path="/:gene/*" component={PageNotReady} />
      <Route path="/:gene" component={SummaryContainer} />
      <Redirect
        from="/"
        to={{
          pathname: "/sadA",
        }}
      />
      <Route path="*" component={PageNotReady} />
    </Switch>
  )
}

export default Routes
