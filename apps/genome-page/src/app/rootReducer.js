import { combineReducers } from 'redux'
import goReducer from '../features/GeneOntology/goReducer'
import tabReducer from '../features/GeneOntology/tabs/tabReducer'

const rootReducer = combineReducers({
    go: goReducer,
    tabs: tabReducer
})

export default rootReducer