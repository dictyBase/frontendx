import React from "react"
import { User } from "dicty-graphql-schema"
import MockSuperuser from "../../common/data/superuser"

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

const developmentState = {
  isAuthenticated: true,
  token:
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjo1NTE2MjM5MDIyfQ.Twt1dSBv6Jha3dqWvyUWI4G_ySJsWTD3av30TDtsnyIBPgXwVM3KtPA_YaDw-iO9pfFWZXc2wFUQ6q5WjNwy14yf7IEf2-r_r78jn9tq8a-vSmlr3ieK-Wjg6Y_U8pa4ZXy2zdrtf7IxA2Jz25Vj-BKtW7z_D00qm6EqSGT46fs9Dh0e1zcuCfOwq-STMLFzIbdcpOzvgtyVfyo-P89qhBWooTBt11xR0HeEr5_gJMThXBLtgzT6t_FYzQj3GadPvUQg3gf3qsPOCYk5TNlTIzJXD6yNtncF1MGSpacKTXJFTi3zf_zzpFkBmftPPEicqJo0CrqGO66JdJby8RZE1w",
  user: MockSuperuser,
  provider: "google",
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
      const newToken = action.payload.token
      return {
        ...state,
        isAuthenticated: true,
        token: newToken,
        user: action.payload.user,
        provider: action.payload.provider,
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
  const [authState, dispatch] = React.useReducer(
    authReducer,
    initialState
    )
    
    const state = import.meta.env.VITE_APP_DEPLOY_ENV === "mock"
      ? developmentState
      : authState

  const contextValue = React.useMemo(
    () => ({ state, dispatch }),
    [state, dispatch],
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
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
