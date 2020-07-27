import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import SummaryContainer from "features/Summary/SummaryContainer"
import OntologyContainer from "features/Ontology/OntologyContainer"
import Login from "features/Authentication/Login"
import OauthCallback from "features/Authentication/OauthCallback"
import AuthLoader from "features/Authentication/AuthLoader"
import Logout from "features/Authentication/Logout"
import PageNotReady from "common/components/PageNotReady"

/**
 * List of routes used with React Router.
 */

// TODO: Consider useRouteMatch instead of identifier

const Routes = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/:provider/callback" component={OauthCallback} />
    <Route path="/load/auth" component={AuthLoader} />
    <Route path="/logout" component={Logout} />
    <Route path="/:id/goannotations" component={OntologyContainer} />
    <Route path="/:id/*" component={PageNotReady} />
    <Route path="/:id" component={SummaryContainer} />
    <Redirect
      from="/"
      to={{
        pathname: "/sadA",
      }}
    />
    <Route path="*" component={PageNotReady} />
  </Switch>
)

export default Routes
