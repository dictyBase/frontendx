import { combineReducers } from "redux"
import goDataReducer from "features/GeneOntology/goReducer"
import tabReducer from "common/components/tabs/tabReducer"
import proteinDataReducer from "features/ProteinInformation/proteinReducer"
import authReducer from "features/Authentication/authReducer"

const rootReducer = combineReducers({
  tabs: tabReducer,
  goData: goDataReducer,
  proteinData: proteinDataReducer,
  auth: authReducer,
})

export default rootReducer
