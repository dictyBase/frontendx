// @flow
import {
  FETCH_GENERAL_DATA_REQUEST,
  FETCH_GENERAL_DATA_FAILURE,
  FETCH_GENERAL_DATA_SUCCESS,
  GENERAL_DATA_NO_REFETCH,
  CHANGE_MAIN_TAB,
  FETCH_GENE_NAME_REQUEST,
  FETCH_GENE_NAME_SUCCESS,
  FETCH_GENE_NAME_FAILURE,
} from "./summaryConstants"

/**
 * All of the Redux reducers related to the Summary tab
 */

const initialState = {
  currentTab: "summary",
}

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
    case FETCH_GENERAL_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isFetching: false,
      }
    case FETCH_GENERAL_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      }
    case FETCH_GENE_NAME_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case FETCH_GENE_NAME_SUCCESS:
      return {
        ...state,
        geneName: action.payload.data.data.attributes.geneName,
        isFetching: false,
      }
    case FETCH_GENE_NAME_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      }
    case CHANGE_MAIN_TAB:
      return {
        ...state,
        currentTab: action.payload.tab,
      }
    case GENERAL_DATA_NO_REFETCH:
      return state
    default:
      return state
  }
}

export default summaryReducer
