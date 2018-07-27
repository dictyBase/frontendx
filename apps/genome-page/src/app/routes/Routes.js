// @flow
import React from "react"
import { Route, Switch } from "react-router-dom"
import MainPage from "features/MainPage/MainPage"
import MainTabs from "features/MainTabs/MainTabs"
import GeneSummaryMaster from "features/GeneSummary/GeneSummaryMaster"
import GeneOntologyMaster from "features/GeneOntology/GeneOntologyMaster"
// import ProteinInformationContainer from "features/ProteinInformation/ProteinInformationContainer"
import Login from "features/Authentication/Login"
import OauthCallback from "features/Authentication/OauthCallback"
import AuthLoader from "features/Authentication/AuthLoader"
import Logout from "features/Authentication/Logout"
import PageNotReady from "common/components/PageNotReady"

// id subroutes need to be updated

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/:provider/callback" component={OauthCallback} />
      <Route exact path="/load/auth" component={AuthLoader} />
      <Route exact path="/logout" component={Logout} />
      <Route path="/:id/protein" component={props => <MainTabs />} />
      <Route path="/:id/goa" component={props => <GeneOntologyMaster />} />
      <Route path="/:id/orthologs" component={props => <MainTabs />} />
      <Route path="/:id/phenotypes" component={props => <MainTabs />} />
      <Route path="/:id/references" component={props => <MainTabs />} />
      <Route path="/:id/blast" component={props => <MainTabs />} />
      <Route path="/:id" component={props => <GeneSummaryMaster />} />
      <Route exact path="*" component={PageNotReady} />
    </Switch>
  )
}

export default Routes
