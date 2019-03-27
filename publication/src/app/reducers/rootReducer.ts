import { combineReducers } from "redux"
import { History } from "history"
import { connectRouter } from "connected-react-router"
import authReducer from "../../features/Authentication/authReducer"
import footerReducer from "./footerReducer"
import navbarReducer from "./navbarReducer"

const rootReducer = (history: History) =>
  combineReducers({
    auth: authReducer,
    footer: footerReducer,
    navbar: navbarReducer,
    router: connectRouter(history),
  } as any)

export default rootReducer
