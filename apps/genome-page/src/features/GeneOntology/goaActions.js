// @flow
import {
  FETCH_GOA_DATA_REQUEST,
  FETCH_GOA_DATA_FAILURE,
  FETCH_GOA_DATA_SUCCESS,
} from "./goaConstants"

/**
 * All of the Redux actions related to the GO tab
 */

export function fetchGoaDataRequest(bool: boolean) {
  return {
    type: FETCH_GOA_DATA_REQUEST,
    payload: {
      isLoading: true,
    },
  }
}

export function fetchGoaDataFailure(bool: boolean) {
  return {
    type: FETCH_GOA_DATA_FAILURE,
    payload: {
      hasErrored: true,
    },
  }
}

export function fetchGoaDataSuccess(data: Array<Object>) {
  return {
    type: FETCH_GOA_DATA_SUCCESS,
    payload: {
      data,
    },
  }
}

export function fetchGoaData(url: string) {
  return async (dispatch: Function) => {
    try {
      const res = await fetch(url)
      const data = await res.json()
      if (res.ok) {
        dispatch(fetchGoaDataSuccess(data))
      } else {
        dispatch(fetchGoaDataRequest(false))
        if (process.env.NODE_ENV !== "production") {
          console.error(res.statusText)
        }
        throw Error(res.statusText)
      }
    } catch (error) {
      dispatch(fetchGoaDataFailure(true))
      if (process.env.NODE_ENV !== "production") {
        console.error(`Network error: ${error}`)
      }
    }
  }
}
