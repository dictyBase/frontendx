// @flow
import {
  FETCH_GOA_DATA_REQUEST,
  FETCH_GOA_DATA_FAILURE,
  FETCH_GOA_DATA_SUCCESS,
} from "./goaConstants"

/**
 * All of the Redux reducers related to the GO tab
 */

const initialState = {
  data: [],
}

const goaReducer = (
  state: Object = initialState,
  action: { type: string, payload: Object },
) => {
  switch (action.type) {
    case FETCH_GOA_DATA_REQUEST:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      }
    case FETCH_GOA_DATA_FAILURE:
      return {
        ...state,
        hasErrored: true,
      }
    case FETCH_GOA_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
      }
    default:
      return state
  }
}

export default goaReducer
