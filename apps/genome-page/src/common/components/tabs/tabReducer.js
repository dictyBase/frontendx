// @flow
import { createReducer } from 'common/utils/reducerUtils'
import { TAB_SELECTED } from './tabConstants'

const initialState = {
    currentTab: 'All GO'
}

export function selectTab(state: Object, payload: Object) {
    return {
        currentTab: payload.tabName
    }
}

export default createReducer(initialState, {
    [TAB_SELECTED]: selectTab
})
