// @flow
import {
  FETCH_GENERAL_DATA_REQUEST,
  FETCH_GENERAL_DATA_FAILURE,
  FETCH_GENERAL_DATA_SUCCESS,
} from "./summaryConstants"

/**
 * All of the Redux reducers related to the GO tab
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
        isFetching: action.payload.isFetching,
      }
    case FETCH_GENERAL_DATA_FAILURE:
      return {
        ...state,
        error: true,
        isFetching: action.payload.isFetching,
      }
    case FETCH_GENERAL_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isFetching: action.payload.isFetching,
      }
    default:
      return state
  }
}

export default summaryReducer
