import { FETCH_DATA } from './goConstants'

export function dataHasErrored(bool) {
    return {
        type: 'DATA_HAS_ERRORED',
        hasErrored: bool
    }
}

export function dataIsLoading(bool) {
    return {
        type: 'DATA_IS_LOADING',
        isLoading: bool
    }
}

export function fetchDataSuccess(data) {
    return {
        type: 'FETCH_DATA_SUCCESS',
        data
    }
}

export function fetchData(url) {
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
