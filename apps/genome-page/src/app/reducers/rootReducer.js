import { combineReducers } from "redux"
import summaryReducer from "features/Summary/summaryReducer"
import goaReducer from "features/GeneOntology/goaReducer"
import proteinReducer from "features/ProteinInformation/proteinReducer"
import authReducer from "features/Authentication/authReducer"

const rootReducer = combineReducers({
  general: summaryReducer,
  goa: goaReducer,
  protein: proteinReducer,
  auth: authReducer,
})

export default rootReducer
