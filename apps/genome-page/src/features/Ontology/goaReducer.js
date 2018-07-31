// @flow
import {
  FETCH_UNIPROT_REQUEST,
  FETCH_UNIPROT_SUCCESS,
  FETCH_UNIPROT_FAILURE,
  FETCH_GOA_REQUEST,
  FETCH_GOA_FAILURE,
  FETCH_GOA_SUCCESS,
} from "./goaConstants"

/**
 * All of the Redux reducers related to GOA data
 */

const initialState = {}

const goaReducer = (
  state: Object = initialState,
  action: { type: string, payload: Object },
) => {
  switch (action.type) {
    case FETCH_UNIPROT_REQUEST:
    case FETCH_UNIPROT_SUCCESS:
    case FETCH_UNIPROT_FAILURE:
    case FETCH_GOA_REQUEST:
    case FETCH_GOA_SUCCESS:
    case FETCH_GOA_FAILURE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default goaReducer
