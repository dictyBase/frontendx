import React, { useMemo } from "react"
import { User } from "dicty-graphql-schema"

enum ActionType {
  LOGIN = "LOGIN",
  LOGIN_ERROR = "LOGIN_ERROR",
  LOGOUT = "LOGOUT",
  UPDATE_TOKEN = "UPDATE_TOKEN",
}

type AuthState = {
  isAuthenticated: boolean
  token: string
  user: User
  provider: string
  error: any
}

type AuthPayload = {
  token: string
  user: User
  provider: string
}

type ErrorPayload = {
  error: any
}

const initialState = {
  isAuthenticated: false,
  token: "",
  user: {} as User,
  provider: "",
  error: undefined,
}

type Action =
  | {
      type: ActionType.LOGIN
      payload: AuthPayload
    }
  | {
      type: ActionType.LOGIN_ERROR
      payload: ErrorPayload
    }
  | { type: ActionType.LOGOUT }
  | {
      type: ActionType.UPDATE_TOKEN
      payload: AuthPayload
    }

type AuthStateContextProperties = {
  state: AuthState
  dispatch: React.Dispatch<Action>
}

const AuthContext = React.createContext({} as AuthStateContextProperties)

const authReducer = (state: AuthState, action: Action) => {
  switch (action.type) {
    case ActionType.LOGIN: {
      const { token, user, provider } = action.payload
      return {
        ...state,
        isAuthenticated: token !== "",
        token,
        user,
        provider,
        error: undefined,
      }
    }
    case ActionType.LOGIN_ERROR:
      return {
        ...state,
        error: action.payload.error,
      }

    case ActionType.LOGOUT:
      return initialState
    case ActionType.UPDATE_TOKEN: {
      const { token, user, provider } = action.payload
      return {
        ...state,
        isAuthenticated: true,
        token,
        user,
        provider,
        error: undefined,
      }
    }
    default:
      return state
  }
}

/**
 * AuthProvider contains global state used for the shopping auth.
 */
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(authReducer, initialState)
  const authContextValue = useMemo(
    () => ({ state, dispatch }),
    [state, dispatch],
  )

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * useAuthStore is a hook to easily connect to AuthContext.
 */
const useAuthStore = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("useAuthStore must be used within a AuthProvider")
  }
  return context
}

export { AuthContext, authReducer, AuthProvider, useAuthStore, ActionType }
