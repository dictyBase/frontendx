import {
  FETCH_FOOTER_REQUEST,
  FETCH_FOOTER_SUCCESS,
  FETCH_FOOTER_FAILURE,
} from "../../common/constants/types"

const initialState = {}

interface Action {
  type: string
  payload: {
    isFetching: boolean
    links: Array<object>
    error: object
  }
}

const footerReducer = (state: object = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_FOOTER_REQUEST:
      return {
        ...state,
        isFetching: action.payload.isFetching,
      }
    case FETCH_FOOTER_SUCCESS:
      return {
        ...state,
        isFetching: action.payload.isFetching,
        links: action.payload.links,
      }
    case FETCH_FOOTER_FAILURE:
      return {
        ...state,
        isFetching: action.payload.isFetching,
        error: action.payload.error,
      }
    default:
      return state
  }
}

export default footerReducer
