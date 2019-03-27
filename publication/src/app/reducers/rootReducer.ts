import { combineReducers } from "redux"
import { History } from "history"
import { connectRouter } from "connected-react-router"
import authReducer from "../../features/Authentication/authReducer"
import footerReducer from "./footerReducer"
import navbarReducer from "./navbarReducer"

const rootReducer = (history: History) =>
  combineReducers({
    // @ts-ignore
    auth: authReducer,
    // @ts-ignore
    footer: footerReducer,
    // @ts-ignore
    navbar: navbarReducer,
    // @ts-ignore
    router: connectRouter(history),
  })

export default rootReducer
