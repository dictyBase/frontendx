// @flow
import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
} from "./goConstants"

/**
 * All of the Redux reducers related to the GO tab
 */

const initialState = {
  data: [],
}

const goDataReducer = (
  state: Object = initialState,
  action: { type: string, payload: Object },
) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      }
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        hasErrored: true,
      }
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
      }
    default:
      return state
  }
}

export default goDataReducer
