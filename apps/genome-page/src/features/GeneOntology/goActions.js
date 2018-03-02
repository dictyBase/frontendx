// @flow
import {
    DATA_HAS_ERRORED,
    DATA_IS_LOADING,
    FETCH_DATA_SUCCESS
} from "./goConstants"

/**
 * All of the Redux actions related to the GO tab
 */

export function dataHasErrored(bool: boolean) {
    return {
        type: DATA_HAS_ERRORED,
        hasErrored: bool
    }
}

export function dataIsLoading(bool: boolean) {
    return {
        type: DATA_IS_LOADING,
        isLoading: bool
    }
}

export function fetchDataSuccess(data: Array<Object>) {
    return {
        type: FETCH_DATA_SUCCESS,
        data
    }
}

export function fetchData(url: string) {
    return dispatch => {
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw Error(res.statusText)
                }

                dispatch(dataIsLoading(false))

                return res
            })
            .then(res => res.json())
            .then(data => dispatch(fetchDataSuccess(data)))
            .catch(() => dispatch(dataHasErrored(true)))
    }
}
