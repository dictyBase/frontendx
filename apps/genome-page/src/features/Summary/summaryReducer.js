// @flow
import {
  FETCH_GENERAL_DATA_REQUEST,
  FETCH_GENERAL_DATA_FAILURE,
  FETCH_GENERAL_DATA_SUCCESS,
} from "./summaryConstants"

/**
 * All of the Redux reducers related to the Summary tab
 */

const initialState = {}

const summaryReducer = (
  state: Object = initialState,
  action: { type: string, payload: Object },
) => {
  switch (action.type) {
    case FETCH_GENERAL_DATA_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case FETCH_GENERAL_DATA_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isFetching: false,
      }
    case FETCH_GENERAL_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isFetching: false,
      }
    default:
      return state
  }
}

export default summaryReducer
