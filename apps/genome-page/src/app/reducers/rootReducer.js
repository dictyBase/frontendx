import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import summaryReducer from "features/Summary/summaryReducer"
import goaReducer from "features/Ontology/goaReducer"
import proteinReducer from "features/ProteinInformation/proteinReducer"
import authReducer from "features/Authentication/authReducer"
import footerReducer from "app/reducers/footerReducer"
import navbarReducer from "app/reducers/navbarReducer"

export default history =>
  combineReducers({
    router: connectRouter(history),
    general: summaryReducer,
    goa: goaReducer,
    protein: proteinReducer,
    auth: authReducer,
    footer: footerReducer,
    navbar: navbarReducer,
  })
