// @flow
import {
  FETCH_PROTEIN_DATA_REQUEST,
  FETCH_PROTEIN_DATA_FAILURE,
  FETCH_PROTEIN_DATA_SUCCESS,
} from "./proteinConstants"

/**
 * All of the Redux actions related to the Protein Information tab
 */

export function fetchDataRequest(bool: boolean) {
  return {
    type: FETCH_PROTEIN_DATA_REQUEST,
    payload: {
      isLoading: true,
    },
  }
}

export function fetchDataFailure(bool: boolean) {
  return {
    type: FETCH_PROTEIN_DATA_FAILURE,
    payload: {
      hasErrored: true,
    },
  }
}

export function fetchDataSuccess(data: Array<Object>) {
  return {
    type: FETCH_PROTEIN_DATA_SUCCESS,
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
        dispatch(fetchDataRequest(false))
        if (process.env.NODE_ENV !== "production") {
          console.error(res.statusText)
        }
        throw Error(res.statusText)
      }
    } catch (error) {
      dispatch(fetchDataFailure(true))
      if (process.env.NODE_ENV !== "production") {
        console.error(`Network error: ${error}`)
      }
    }
  }
}
