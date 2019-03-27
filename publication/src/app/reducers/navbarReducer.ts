import {
  FETCH_NAVBAR_REQUEST,
  FETCH_NAVBAR_SUCCESS,
  FETCH_NAVBAR_FAILURE,
} from "../../common/constants/types"

const initialState = {}

interface NavbarAction {
  type: string
  payload: {
    links: Array<object>
    error: object
  }
}

const navbarReducer = (state: object = initialState, action: NavbarAction) => {
  switch (action.type) {
    case FETCH_NAVBAR_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case FETCH_NAVBAR_SUCCESS:
      return {
        ...state,
        isFetching: false,
        links: action.payload.links,
      }
    case FETCH_NAVBAR_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}

export default navbarReducer
