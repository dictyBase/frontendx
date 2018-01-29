import { combineReducers } from 'redux'
import {
    data,
    dataHasErrored,
    dataIsLoading
} from 'features/GeneOntology/goReducer'
import tabReducer from 'common/components/tabs/tabReducer'

const rootReducer = combineReducers({
    tabs: tabReducer,
    data,
    dataHasErrored,
    dataIsLoading
})

export default rootReducer
