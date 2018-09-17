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

type Props = {
  /** React Router's match object */
  match: Object,
}

const Routes = (props: Props) => (
  <Switch>
    <Route exact path="/" component={MainPage} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/:provider/callback" component={OauthCallback} />
    <Route exact path="/load/auth" component={AuthLoader} />
    <Route exact path="/logout" component={Logout} />
    <Route path="/:id/protein" component={props => <SummaryContainer />} />
    <Route
      path="/:id/goannotations"
      render={({ match }) => (
        // $FlowFixMe
        <OntologyContainer match={match} {...this.props} />
      )}
    />
    <Route path="/:id/orthologs" component={props => <SummaryContainer />} />
    <Route path="/:id/phenotypes" component={props => <SummaryContainer />} />
    <Route path="/:id/references" component={props => <SummaryContainer />} />
    <Route path="/:id/blast" component={props => <SummaryContainer />} />
    <Route exact path="/:id/*" component={PageNotReady} />
    <Route
      path="/:id"
      render={({ match }) => <SummaryContainer match={match} />}
    />
    <Route exact path="*" component={PageNotReady} />
  </Switch>
)

export default Routes
