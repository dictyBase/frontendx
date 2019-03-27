// @flow
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_ROLE_REQUEST,
  FETCH_ROLE_SUCCESS,
  FETCH_ROLE_FAILURE,
  FETCH_NON_AUTH_ROLE_REQUEST,
  FETCH_NON_AUTH_ROLE_SUCCESS,
  FETCH_NON_AUTH_ROLE_FAILURE,
  FETCH_PERMISSION_REQUEST,
  FETCH_PERMISSION_SUCCESS,
  FETCH_PERMISSION_FAILURE,
} from "../../common/constants/types"

interface Action {
  type: string
  payload: {
    provider: string
    token: string
    user: object
    error: object
    json: {
      data: Array<object>
    }
    isFetching: boolean
    roles: {
      data: Array<object>
    }
    permissions: {
      data: Array<object>
    }
  }
}

interface AuthState {
  user: object
  fetchedUserData: object
}

const initialState: AuthState = {
  user: {},
  fetchedUserData: {},
}

const authReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        provider: action.payload.provider,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: action.payload.token ? true : false,
        token: action.payload.token,
        user: action.payload.user,
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        error: action.payload.error,
        provider: null,
      }
    case LOGOUT_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        provider: null,
        user: null,
        token: null,
      }
    case FETCH_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetchedUserData: action.payload.json,
      }
    case FETCH_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      }
    case FETCH_ROLE_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case FETCH_ROLE_SUCCESS:
      return {
        ...state,
        isFetching: action.payload.isFetching,
        user: {
          ...state.user,
          // merge roles into one array, regardless if they are one or many
          roles: [].concat(<any>action.payload.json.data),
        },
      }
    case FETCH_ROLE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      }
    case FETCH_NON_AUTH_ROLE_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case FETCH_NON_AUTH_ROLE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetchedUserData: {
          ...state.fetchedUserData,
          // merge roles into one array, regardless if they are one or many
          roles: [].concat(<any>action.payload.roles.data),
        },
      }
    case FETCH_NON_AUTH_ROLE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      }
    case FETCH_PERMISSION_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case FETCH_PERMISSION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: {
          ...state.user,
          // merge permissions into one array, regardless if they are one or many
          permissions: [].concat(<any>action.payload.permissions.data),
        },
      }
    case FETCH_PERMISSION_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}
export default authReducer
