import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import PublicationContainer from "features/Publication/PublicationContainer"
import Login from "features/Authentication/Login"
import OauthCallback from "features/Authentication/OauthCallback"
import AuthLoader from "features/Authentication/AuthLoader"
import Logout from "features/Authentication/Logout"

/**
 * Component for all of our React Router routes.
 */

export const Routes = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/:provider/callback" component={OauthCallback} />
    <Route path="/load/auth" component={AuthLoader} />
    <Route path="/logout" component={Logout} />
    <Route exact path="/:id" component={PublicationContainer} />
    <Redirect
      from="/"
      to={{
        pathname: "/26088819",
      }}
    />
  </Switch>
)

export default Routes
