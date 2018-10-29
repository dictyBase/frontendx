// @flow
import {
  FETCH_GOA_REQUEST,
  FETCH_GOA_FAILURE,
  FETCH_GOA_SUCCESS,
  GOA_NO_REFETCH,
  CHANGE_GOA_TAB,
  GOA_TABLE_ORDER,
  GOA_TABLE_SORT_BY,
} from "./goaConstants"

/**
 * Redux reducer for handling GOA data
 */

const initialState = {
  currentTab: "all",
  tableOrder: "asc",
  tableSortBy: "qualifier",
}

const goaReducer = (
  state: Object = initialState,
  action: { type: string, payload: Object },
) => {
  switch (action.type) {
    case FETCH_GOA_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case FETCH_GOA_SUCCESS:
      return {
        ...state,
        data: action.payload.data.data[0],
        isFetching: false,
      }
    case FETCH_GOA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      }
    case GOA_NO_REFETCH:
      return state
    case CHANGE_GOA_TAB:
      return {
        ...state,
        currentTab: action.payload.tab,
      }
    case GOA_TABLE_ORDER:
      return {
        ...state,
        tableOrder: action.payload.order,
      }
    case GOA_TABLE_SORT_BY:
      return {
        ...state,
        tableSortBy: action.payload.column,
      }
    default:
      return state
  }
}

export default goaReducer
