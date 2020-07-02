import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import PublicationContainer from "../../features/Publication/PublicationContainer"

/**
 * Component for all of our React Router routes.
 */

export const Routes = (props: any) => (
  <Switch>
    <Route path="/:id" component={PublicationContainer} />
    <Redirect
      from="/"
      to={{
        pathname: "/26088819",
      }}
    />
  </Switch>
)

export default Routes
