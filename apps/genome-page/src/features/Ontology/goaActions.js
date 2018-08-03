// @flow
import {
  FETCH_GOA_REQUEST,
  FETCH_GOA_FAILURE,
  FETCH_GOA_SUCCESS,
} from "./goaConstants"
import printError from "common/utils/printError"

/**
 * All of the Redux actions related to GOA data
 */

const fetchGoaRequest = () => {
  return {
    type: FETCH_GOA_REQUEST,
    payload: {
      isFetching: true,
    },
  }
}

const fetchGoaFailure = error => {
  return {
    type: FETCH_GOA_FAILURE,
    payload: {
      isFetching: false,
      error: error,
    },
  }
}

const fetchGoaSuccess = (data: Object) => {
  return {
    type: FETCH_GOA_SUCCESS,
    payload: {
      isFetching: false,
      data,
    },
  }
}

export const fetchGoa = (url: string) => {
  return async (dispatch: Function) => {
    try {
      dispatch(fetchGoaRequest())
      const res = await fetch(url, {
        headers: { Accept: "application/json" },
      })
      const json = await res.json()
      if (res.ok) {
        dispatch(fetchGoaSuccess(json))
      } else {
        if (process.env.NODE_ENV !== "production") {
          printError(res, json)
        }
        dispatch(fetchGoaFailure(res.body))
      }
    } catch (error) {
      dispatch(fetchGoaFailure(error.message))
      if (process.env.NODE_ENV !== "production") {
        console.error(`Network error: ${error.message}`)
      }
    }
  }
}
