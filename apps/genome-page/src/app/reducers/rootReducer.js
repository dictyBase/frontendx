import { combineReducers } from "redux"
import goDataReducer from "features/GeneOntology/goReducer"
import proteinDataReducer from "features/ProteinInformation/proteinReducer"
import authReducer from "features/Authentication/authReducer"

const rootReducer = combineReducers({
  goData: goDataReducer,
  proteinData: proteinDataReducer,
  auth: authReducer,
})

export default rootReducer
