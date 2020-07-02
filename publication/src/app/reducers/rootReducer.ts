import { combineReducers } from "redux"
import { History } from "history"
import { connectRouter } from "connected-react-router"
import footerReducer from "./footerReducer"
import navbarReducer from "./navbarReducer"

const rootReducer = (history: History) =>
  combineReducers({
    footer: footerReducer,
    navbar: navbarReducer,
    router: connectRouter(history),
  } as any)

export default rootReducer
