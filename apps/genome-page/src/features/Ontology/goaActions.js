// @flow
import {
  FETCH_GOA_REQUEST,
  FETCH_GOA_FAILURE,
  FETCH_GOA_SUCCESS,
} from "./goaConstants"
import { geneId2Uniprot } from "./uniprotActions"
import { normalizeGoa } from "./goaUtils"

/**
 * All of the Redux actions related to GOA data
 */

const makeGoaURL = id => {
  const base = "https://www.ebi.ac.uk/QuickGO/services/annotation/search?"
  const query = "includeFields=goName&limit=100&geneProductId="
  return `${base}${query}${id}`
}

const fetchGoaRequest = (id: string) => {
  return {
    type: FETCH_GOA_REQUEST,
    payload: {
      isFetching: true,
      id,
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

const fetchGoaSuccess = goaResp => {
  return {
    type: FETCH_GOA_SUCCESS,
    payload: {
      isFetching: false,
      goa: normalizeGoa(goaResp),
    },
  }
}

const fetchGoa = (id: string) => {
  return async (dispatch: Function) => {
    dispatch(fetchGoaRequest(id))
    const res = await fetch(makeGoaURL(id), {
      headers: { Accept: "application/json" },
    })
    if (res.ok) {
      const json = await res.json()
      dispatch(fetchGoaSuccess(json))
    } else {
      dispatch(fetchGoaFailure(res.statusText))
    }
  }
}

export const gene2Goa = (id: string) => {
  return async (dispatch: Function, getState: Function) => {
    try {
      await dispatch(geneId2Uniprot(id))
      const { uniprot } = getState()
      if (uniprot.uniprotId) {
        await dispatch(fetchGoa(uniprot.uniprotId))
      }
    } catch (error) {
      dispatch(fetchGoaFailure(error.message))
    }
  }
}
