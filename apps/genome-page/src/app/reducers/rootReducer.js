import { combineReducers } from "redux"
import authReducer from "features/Authentication/authReducer"

export default (history) =>
  combineReducers({
    auth: authReducer,
  })
