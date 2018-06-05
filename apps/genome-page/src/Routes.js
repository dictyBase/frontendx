// @flow
import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom"
import Tabs from "dicty-components-tab"
import GeneOntologyContainer from "features/GeneOntology/GeneOntologyContainer"
import ProteinInformationContainer from "features/ProteinInformation/ProteinInformationContainer"
import Login from "features/Authentication/Login"
import OauthCallback from "features/Authentication/OauthCallback"
import AuthLoader from "features/Authentication/AuthLoader"
import Logout from "features/Authentication/Logout"

const tabs: Array<Object> = [
  {
    title: "Gene Summary",
    element: <div>Gene Summary</div>,
    link: "summary",
  },
  {
    title: "Protein Information",
    element: <ProteinInformationContainer />,
    link: "proteininformation",
  },
  {
    title: "Gene Ontology",
    element: <GeneOntologyContainer />,
    link: "go",
  },
  {
    title: "Orthologs",
    element: <div>Orthologs</div>,
    link: "orthologs",
  },
  {
    title: "Phenotypes",
    element: <div>Phenotypes</div>,
    link: "phenotypes",
  },
  {
    title: "Reference",
    element: <div>Reference</div>,
    link: "reference",
  },
  {
    title: "BLAST",
    element: <div>BLAST</div>,
    link: "blast",
  },
]

// route needs to be updated with non-hardcoded version

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/gene/p2xA" />} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/:provider/callback" component={OauthCallback} />
        <Route exact path="/load/auth" component={AuthLoader} />
        <Route exact path="/logout" component={Logout} />
        <Route
          path="/gene/:id"
          component={props => <Tabs {...props} tabs={tabs} />}
        />
      </Switch>
    </Router>
  )
}

export default Routes
