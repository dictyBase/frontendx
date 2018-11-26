// @flow
import {
  FETCH_GENERAL_DATA_REQUEST,
  FETCH_GENERAL_DATA_FAILURE,
  FETCH_GENERAL_DATA_SUCCESS,
  GENERAL_DATA_NO_REFETCH,
  CHANGE_MAIN_TAB,
} from "./summaryConstants"
import { fetchGoa } from "features/Ontology/goaActions"
import { printError, createErrorObj } from "common/utils/actionHelpers"

/**
 * All of the Redux actions related to the Summary tab
 */

const fetchGeneralDataRequest = () => ({
  type: FETCH_GENERAL_DATA_REQUEST,
  payload: {
    isFetching: true,
  },
})

const fetchGeneralDataSuccess = (data: Array<Object>) => ({
  type: FETCH_GENERAL_DATA_SUCCESS,
  payload: {
    isFetching: false,
    data,
  },
})

const fetchGeneralDataFailure = error => ({
  type: FETCH_GENERAL_DATA_FAILURE,
  payload: {
    isFetching: false,
    error,
  },
})

const noRefetch = () => ({
  type: GENERAL_DATA_NO_REFETCH,
})

export const fetchGeneralData = (url: string) => async (
  dispatch: Function,
  getState: Function,
) => {
  /** This is a hack; need to figure out why SummaryContainer is mounting 3x */
  if (getState().general.data || getState().general.isFetching) {
    return noRefetch()
  }
  try {
    dispatch(fetchGeneralDataRequest())
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
    })
    const json = await res.json()

    // check if res.ok (https://developer.mozilla.org/en-US/docs/Web/API/Response/ok)
    // and that the json doesn't contain an error
    if (res.ok && !json.status) {
      dispatch(fetchGeneralDataSuccess(json))
      await dispatch(fetchGoa(json.data.relationships.goa.links.related))
    } else {
      dispatch(fetchGeneralDataFailure(createErrorObj(json.status, json.title)))
      if (process.env.NODE_ENV !== "production") {
        printError(res, json)
      }
    }
  } catch (error) {
    dispatch(fetchGeneralDataFailure(createErrorObj("Network", error.message)))
    if (process.env.NODE_ENV !== "production") {
      console.error(`Network error: ${error.message}`)
    }
  }
}

export const changeTab = (tab: string) => ({
  type: CHANGE_MAIN_TAB,
  payload: {
    tab,
  },
})
