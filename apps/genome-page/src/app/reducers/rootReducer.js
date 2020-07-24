import { combineReducers } from "redux"
import authReducer from "features/Authentication/authReducer"
import footerReducer from "app/reducers/footerReducer"
import navbarReducer from "app/reducers/navbarReducer"

export default (history) =>
  combineReducers({
    auth: authReducer,
    footer: footerReducer,
    navbar: navbarReducer,
  })
