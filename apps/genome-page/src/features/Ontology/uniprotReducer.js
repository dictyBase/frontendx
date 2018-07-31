// @flow
import {
  FETCH_UNIPROT_REQUEST,
  FETCH_UNIPROT_SUCCESS,
  FETCH_UNIPROT_FAILURE,
} from "./uniprotConstants"

/**
 * All of the Redux reducers related to Uniprot
 */

const initialState = {}

const uniprotReducer = (
  state: Object = initialState,
  action: { type: string, payload: Object },
) => {
  switch (action.type) {
    case FETCH_UNIPROT_REQUEST:
    case FETCH_UNIPROT_SUCCESS:
    case FETCH_UNIPROT_FAILURE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default uniprotReducer
