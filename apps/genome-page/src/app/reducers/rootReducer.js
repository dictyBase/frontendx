import { combineReducers } from "redux"
import summaryReducer from "features/Summary/summaryReducer"
import uniprotReducer from "features/Ontology/uniprotReducer"
import goaReducer from "features/Ontology/goaReducer"
import proteinReducer from "features/ProteinInformation/proteinReducer"
import authReducer from "features/Authentication/authReducer"

const rootReducer = combineReducers({
  general: summaryReducer,
  uniprot: uniprotReducer,
  goa: goaReducer,
  protein: proteinReducer,
  auth: authReducer,
})

export default rootReducer
