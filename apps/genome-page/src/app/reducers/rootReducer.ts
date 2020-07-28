import { combineReducers } from "redux"
import { History } from "history"
import authReducer from "features/Authentication/authReducer"

export default (history: History) =>
  combineReducers({
    auth: authReducer,
  })
