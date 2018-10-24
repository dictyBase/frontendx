// @flow
/* eslint-disable */
import React from "react"
import { Route, Switch } from "react-router-dom"
import MainPage from "features/MainPage/MainPage"
import SummaryContainer from "features/Summary/SummaryContainer"
import OntologyContainer from "features/Ontology/OntologyContainer"
// import ProteinInformationContainer from "features/ProteinInformation/ProteinInformationContainer"
import Login from "features/Authentication/Login"
import OauthCallback from "features/Authentication/OauthCallback"
import AuthLoader from "features/Authentication/AuthLoader"
import Logout from "features/Authentication/Logout"
import PageNotReady from "common/components/PageNotReady"

// Switch is used to only render the first Route that matches the current location
const Routes = () => (
  <Switch>
    <Route exact path="/" component={MainPage} />
    <Route path="/login" component={Login} />
    <Route path="/:provider/callback" component={OauthCallback} />
    <Route path="/load/auth" component={AuthLoader} />
    <Route path="/logout" component={Logout} />
    <Route
      path="/:id([A-Z]{3}_G[0-9]{4,})/goannotations"
      render={() => <OntologyContainer identifier={true} />}
    />
    <Route
      path="/:id/goannotations"
      render={() => <OntologyContainer identifier={false} />}
    />
    {/* <Route path="/:id/protein" component={SummaryContainer} />
    <Route path="/:id/orthologs" component={SummaryContainer} />
    <Route path="/:id/phenotypes" component={SummaryContainer} />
    <Route path="/:id/references" component={SummaryContainer} />
    <Route path="/:id/blast" component={SummaryContainer} /> */}
    <Route path="/:id/*" component={PageNotReady} />

    {/* if route matches gene ID, set identifier as true */}
    <Route
      exact
      path="/:id([A-Z]{3}_G[0-9]{4,})"
      render={() => <SummaryContainer identifier={true} />}
    />
    <Route
      exact
      path="/:id"
      render={() => <SummaryContainer identifier={false} />}
    />
    <Route path="*" component={PageNotReady} />
  </Switch>
)

export default Routes
