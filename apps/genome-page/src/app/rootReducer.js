import { combineReducers } from 'redux'
import goReducer from '../features/GeneOntology/goReducer'

const rootReducer = combineReducers({
    go: goReducer
})

export default rootReducer