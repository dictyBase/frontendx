// @flow
import printError from "common/utils/printError"
import {
  FETCH_GOA_REQUEST,
  FETCH_GOA_FAILURE,
  FETCH_GOA_SUCCESS,
} from "./goaConstants"

/**
 * All of the Redux actions related to GOA data
 */

const fetchGoaRequest = () => ({
  type: FETCH_GOA_REQUEST,
  payload: {
    isFetching: true,
  },
})

const fetchGoaFailure = error => ({
  type: FETCH_GOA_FAILURE,
  payload: {
    isFetching: false,
    error,
  },
})

const fetchGoaSuccess = (data: Object) => ({
  type: FETCH_GOA_SUCCESS,
  payload: {
    isFetching: false,
    data,
  },
})

export const fetchGoa = (url: string) => async (
  dispatch: Function,
  getState: Function,
) => {
  if (getState().goa.data) {
    return
  }
  try {
    dispatch(fetchGoaRequest())
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
    })
    const json = await res.json()
    if (res.ok) {
      if (json.status >= 300) {
        dispatch(fetchGoaFailure(json.title))
      }
      dispatch(fetchGoaSuccess(json))
    } else {
      dispatch(fetchGoaFailure(json.title))
      if (process.env.NODE_ENV !== "production") {
        printError(res, json)
      }
    }
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(`Network error: ${error.message}`)
    }
  }
}
