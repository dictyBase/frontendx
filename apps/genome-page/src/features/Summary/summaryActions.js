// @flow
import { push } from "connected-react-router"
import {
  FETCH_GENERAL_DATA_REQUEST,
  FETCH_GENERAL_DATA_FAILURE,
  FETCH_GENERAL_DATA_SUCCESS,
} from "./summaryConstants"

/**
 * All of the Redux actions related to the Summary tab
 */

const fetchGeneralDataRequest = () => {
  return {
    type: FETCH_GENERAL_DATA_REQUEST,
    payload: {
      isFetching: true,
    },
  }
}

const fetchGeneralDataFailure = error => {
  return {
    type: FETCH_GENERAL_DATA_FAILURE,
    payload: {
      isFetching: false,
      error: error,
    },
  }
}

const fetchGeneralDataSuccess = (data: Array<Object>) => {
  return {
    type: FETCH_GENERAL_DATA_SUCCESS,
    payload: {
      isFetching: false,
      data,
    },
  }
}

export const fetchGeneralData = (url: string) => {
  return async (dispatch: Function) => {
    try {
      dispatch(fetchGeneralDataRequest())
      const res = await fetch(url)
      const json = await res.json()
      if (res.ok) {
        dispatch(fetchGeneralDataSuccess(json))
      } else {
        if (process.env.NODE_ENV !== "production") {
          printError(res, json)
          dispatch(push("/error"))
        }
        dispatch(fetchGeneralDataFailure(res.body))
        dispatch(push("/error"))
      }
    } catch (error) {
      dispatch(fetchGeneralDataFailure(error))
      dispatch(push("/error"))
      if (process.env.NODE_ENV !== "production") {
        console.error(`Network error: ${error.message}`)
      }
    }
  }
}

// helper function to print HTTP errors to console
// responses are structured in JSONAPI format
const printError = (res, json) => {
  console.error("HTTP Error")
  console.error(
    `HTTP Response: ${res.status}
    Title: ${json.errors[0].title}
    Detail: ${json.errors[0].detail}`,
  )
}
