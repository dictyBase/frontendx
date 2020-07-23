// @flow
import {
  FETCH_GOA_REQUEST,
  FETCH_GOA_FAILURE,
  FETCH_GOA_SUCCESS,
  GOA_NO_REFETCH,
  CHANGE_GOA_TAB,
  GOA_TABLE_ORDER,
  GOA_TABLE_SORT_BY,
} from "./goaConstants"
import { printError, createErrorObj } from "common/utils/actionHelpers"

/**
 * All of the Redux actions related to GOA data
 */

const fetchGoaRequest = () => ({
  type: FETCH_GOA_REQUEST,
  payload: {
    isFetching: true,
  },
})

const fetchGoaFailure = (error) => ({
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

const noRefetch = () => ({
  type: GOA_NO_REFETCH,
})

export const fetchGoa = (url: string) => async (
  dispatch: Function,
  getState: Function,
) => {
  if (getState().goa.data) {
    return noRefetch()
  }
  try {
    dispatch(fetchGoaRequest())
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
    })
    const json = await res.json()

    // check if res.ok (https://developer.mozilla.org/en-US/docs/Web/API/Response/ok)
    // and that the json doesn't contain an error
    if (res.ok && !json.status) {
      if (json.data.length === 2) {
        const mergedData = {
          links: json.links,
          data: json.data[0].concat(json.data[1]),
        }
        dispatch(fetchGoaSuccess(mergedData))
      } else {
        const flattenedData = {
          links: json.links,
          data: [].concat.apply([], json.data[0]),
        }
        dispatch(fetchGoaSuccess(flattenedData))
      }
    } else {
      dispatch(fetchGoaFailure(createErrorObj(json.status, json.title)))
      if (process.env.NODE_ENV !== "production") {
        printError(res, json)
      }
    }
  } catch (error) {
    dispatch(fetchGoaFailure(createErrorObj("Network", error.message)))
    if (process.env.NODE_ENV !== "production") {
      console.error(`Network error: ${error.message}`)
    }
  }
}

export const changeTab = (tab: string) => ({
  type: CHANGE_GOA_TAB,
  payload: {
    tab,
  },
})

export const changeTableOrder = (order: string) => ({
  type: GOA_TABLE_ORDER,
  payload: {
    order,
  },
})

export const sortTableBy = (column: string) => ({
  type: GOA_TABLE_SORT_BY,
  payload: {
    column,
  },
})
