import React from "react"
import { Route, Switch } from "react-router-dom"
import Publication from "../../features/Publication"
import Login from "../../features/Authentication/Login"
import OauthCallback from "../../features/Authentication/OauthCallback"
import AuthLoader from "../../features/Authentication/AuthLoader"
import Logout from "../../features/Authentication/Logout"

/**
 * Component for all of our React Router routes.
 */

export const Routes = (props: any) => (
  <Switch>
    <Route exact path="/" component={Publication} />
    <Route path="/login" component={Login} />
    <Route path="/:provider/callback" component={OauthCallback} />
    <Route path="/load/auth" component={AuthLoader} />
    <Route path="/logout" component={Logout} />
  </Switch>
)

export default Routes
