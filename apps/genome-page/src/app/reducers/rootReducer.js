import { combineReducers } from "redux"
import goaReducer from "features/GeneOntology/goaReducer"
import proteinReducer from "features/ProteinInformation/proteinReducer"
import authReducer from "features/Authentication/authReducer"

const rootReducer = combineReducers({
  goa: goaReducer,
  protein: proteinReducer,
  auth: authReducer,
})

export default rootReducer
