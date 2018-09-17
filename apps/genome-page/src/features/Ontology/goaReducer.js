// @flow
import {
  FETCH_GOA_REQUEST,
  FETCH_GOA_FAILURE,
  FETCH_GOA_SUCCESS,
  GOA_NO_REFETCH,
} from "./goaConstants"

/**
 * Redux reducer for handling GOA data
 */

const initialState = {}

const goaReducer = (
  state: Object = initialState,
  action: { type: string, payload: Object },
) => {
  switch (action.type) {
    case FETCH_GOA_REQUEST:
    case FETCH_GOA_SUCCESS:
    case FETCH_GOA_FAILURE:
      return { ...state, ...action.payload }
    case GOA_NO_REFETCH:
      return state
    default:
      return state
  }
}

export default goaReducer
