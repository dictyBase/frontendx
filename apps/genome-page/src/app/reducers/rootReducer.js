import { combineReducers } from "redux"
import goDataReducer from "features/GeneOntology/goReducer"
import tabReducer from "common/components/tabs/tabReducer"

const rootReducer = combineReducers({
  tabs: tabReducer,
  goData: goDataReducer,
})

export default rootReducer
