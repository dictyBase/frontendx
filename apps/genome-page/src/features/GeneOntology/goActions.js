// @flow
import {
  DATA_HAS_ERRORED,
  DATA_IS_LOADING,
  FETCH_DATA_SUCCESS,
} from "./goConstants"

/**
 * All of the Redux actions related to the GO tab
 */

export function dataHasErrored(bool: boolean) {
  return {
    type: DATA_HAS_ERRORED,
    payload: {
      hasErrored: bool,
    },
  }
}

export function dataIsLoading(bool: boolean) {
  return {
    type: DATA_IS_LOADING,
    payload: {
      isLoading: bool,
    },
  }
}

export function fetchDataSuccess(data: Array<Object>) {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: {
      data,
    },
  }
}

export function fetchData(url: string) {
  return async (dispatch: Function) => {
    try {
      const res = await fetch(url)
      const data = await res.json()
      if (res.ok) {
        dispatch(fetchDataSuccess(data))
      } else {
        dispatch(dataIsLoading(false))
        if (process.env.NODE_ENV !== "production") {
          console.error(res.statusText)
        }
        throw Error(res.statusText)
      }
    } catch (error) {
      dispatch(dataHasErrored(true))
      if (process.env.NODE_ENV !== "production") {
        console.error(`Network error: ${error}`)
      }
    }
  }
}
