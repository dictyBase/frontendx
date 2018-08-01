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
      goa: goaResp,
    },
  }
}

// const fetchGoa = (url: string) => {
//   return async (dispatch: Function) => {
//     dispatch(fetchGoaRequest(id))
//     const res = await fetch(url), {
//       headers: { Accept: "application/json" },
//     })
//     if (res.ok) {
//       const json = await res.json()
//       dispatch(fetchGoaSuccess(json))
//     } else {
//       dispatch(fetchGoaFailure(res.statusText))
//     }
//   }
// }
