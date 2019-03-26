import React from "react"
import { Route, Switch } from "react-router-dom"
import Publication from "../../features/Publication"

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Publication} />
  </Switch>
)

export default Routes
