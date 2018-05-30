// @flow
import {
  FETCH_PROTEIN_DATA_REQUEST,
  FETCH_PROTEIN_DATA_FAILURE,
  FETCH_PROTEIN_DATA_SUCCESS,
} from "./proteinConstants"

/**
 * All of the Redux reducers related to the Protein Information tab
 */

const initialState = {
  data: [],
}

const proteinDataReducer = (
  state: Object = initialState,
  action: { type: string, payload: Object },
) => {
  switch (action.type) {
    case FETCH_PROTEIN_DATA_REQUEST:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      }
    case FETCH_PROTEIN_DATA_FAILURE:
      return {
        ...state,
        hasErrored: true,
      }
    case FETCH_PROTEIN_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
      }
    default:
      return state
  }
}

export default proteinDataReducer
