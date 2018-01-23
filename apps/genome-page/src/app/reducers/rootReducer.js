import { combineReducers } from 'redux'
import {
    data,
    dataHasErrored,
    dataIsLoading
} from 'features/GeneOntology/goReducer'
import tabReducer from 'features/GeneOntology/tabs/tabReducer'

const rootReducer = combineReducers({
    tabs: tabReducer,
    data,
    dataHasErrored,
    dataIsLoading
})

export default rootReducer
