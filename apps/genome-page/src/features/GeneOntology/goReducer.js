// @flow
import {
    DATA_HAS_ERRORED,
    DATA_IS_LOADING,
    FETCH_DATA_SUCCESS
} from "./goConstants"

/**
 * All of the Redux reducers related to the GO tab
 */

const initialState = {
    data: []
}

export function dataHasErrored(
    state: boolean = false,
    action: { type: string, hasErrored: boolean }
) {
    switch (action.type) {
        case DATA_HAS_ERRORED:
            return action.hasErrored

        default:
            return state
    }
}

export function dataIsLoading(
    state: boolean = false,
    action: { type: string, isLoading: boolean }
) {
    switch (action.type) {
        case DATA_IS_LOADING:
            return action.isLoading

        default:
            return state
    }
}

export function data(
    state: Object = initialState,
    action: { type: string, data: Array<Object> }
) {
    switch (action.type) {
        case FETCH_DATA_SUCCESS:
            return action.data

        default:
            return state
    }
}
