// @flow
// import { push } from "connected-react-router"
import printError from "common/utils/printError"
import {
  FETCH_GENERAL_DATA_REQUEST,
  FETCH_GENERAL_DATA_FAILURE,
  FETCH_GENERAL_DATA_SUCCESS,
} from "./summaryConstants"

/**
 * All of the Redux actions related to the Summary tab
 */

const fetchGeneralDataRequest = () => ({
  type: FETCH_GENERAL_DATA_REQUEST,
  payload: {
    isFetching: true,
  },
})

const fetchGeneralDataFailure = error => ({
  type: FETCH_GENERAL_DATA_FAILURE,
  payload: {
    isFetching: false,
    error,
  },
})

const fetchGeneralDataSuccess = (data: Array<Object>) => ({
  type: FETCH_GENERAL_DATA_SUCCESS,
  payload: {
    isFetching: false,
    data,
  },
})

export const fetchGeneralData = (url: string) => async (
  dispatch: Function,
  getState: Function,
) => {
  if (getState().general.data) {
    return
  }
  try {
    dispatch(fetchGeneralDataRequest())
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
    })
    const json = await res.json()
    if (res.ok) {
      if (json.status >= 300) {
        dispatch(fetchGeneralDataFailure(json.title))
      }
      dispatch(fetchGeneralDataSuccess(json))
    } else {
      dispatch(fetchGeneralDataFailure(json.title))
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
