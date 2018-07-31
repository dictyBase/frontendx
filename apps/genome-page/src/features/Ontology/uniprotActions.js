// @flow
import {
  FETCH_UNIPROT_REQUEST,
  FETCH_UNIPROT_SUCCESS,
  FETCH_UNIPROT_FAILURE,
} from "./uniprotConstants"

/**
 * All of the Redux actions related to Uniprot ID fetching
 */

const makeUniprotURL = (id: string) => {
  return `https://www.uniprot.org/uniprot?query=gene:${id}&columns=id&format=list`
}

const fetchUniprotRequest = (id: string) => {
  return {
    type: FETCH_UNIPROT_REQUEST,
    payload: {
      isFetching: true,
      id,
    },
  }
}

const fetchUniprotFailure = error => {
  return {
    type: FETCH_UNIPROT_FAILURE,
    payload: {
      isFetching: false,
      error: error,
    },
  }
}

const fetchUniprotSuccess = (id: string, uniprotId: string) => {
  return {
    type: FETCH_UNIPROT_SUCCESS,
    payload: {
      isFetching: false,
      id,
      uniprotId,
    },
  }
}

export const geneId2Uniprot = (id: string) => {
  return async (dispatch: Function) => {
    dispatch(fetchUniprotRequest(id))
    const res = await fetch(makeUniprotURL(id))
    console.log(res)
    if (res.ok) {
      if (res.headers.get("content-length") > 0) {
        const uniprotId = await res.text()
        dispatch(fetchUniprotSuccess(id, uniprotId.trim()))
      } else {
        dispatch(fetchUniprotFailure(`no uniprot id for ${id}`))
      }
    } else {
      dispatch(fetchUniprotFailure(res.statusText))
    }
  }
}
