import {
  FETCH_FOOTER_REQUEST,
  FETCH_FOOTER_SUCCESS,
  FETCH_FOOTER_FAILURE,
} from "../../common/constants/types"

const initialState = {}

interface Action {
  type: string
  payload: {
    links: Array<object>
    error: object
  }
}

const footerReducer = (state: Object = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_FOOTER_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case FETCH_FOOTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        links: action.payload.links,
      }
    case FETCH_FOOTER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}

export default footerReducer
