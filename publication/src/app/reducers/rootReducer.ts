import { combineReducers } from "redux"
import authReducer from "../../features/Authentication/authReducer"
import footerReducer from "./footerReducer"
import navbarReducer from "./navbarReducer"

const rootReducer = combineReducers({
  auth: authReducer,
  footer: footerReducer,
  navbar: navbarReducer,
})

export default rootReducer
