import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import thunk from "redux-thunk"
import { routerMiddleware } from "connected-react-router"
import { manageStateStorage } from "dicty-components-redux"
import history from "../../common/utils/routerHistory"
import createRootReducer from "../reducers/rootReducer"
import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  FETCH_ROLE_SUCCESS,
  FETCH_PERMISSION_SUCCESS,
} from "../../common/constants/types"

const authArg = {
  save_action: LOGIN_SUCCESS,
  remove_action: LOGOUT_SUCCESS,
  key: "auth",
  namespace: "auth",
}

const roleArg = {
  save_action: FETCH_ROLE_SUCCESS,
  remove_action: LOGOUT_SUCCESS,
  key: "auth",
  namespace: "auth",
}
const permArg = {
  save_action: FETCH_PERMISSION_SUCCESS,
  remove_action: LOGOUT_SUCCESS,
  key: "auth",
  namespace: "auth",
}

const enhancer = composeWithDevTools(
  applyMiddleware(
    routerMiddleware(history),
    thunk,
    manageStateStorage(authArg),
    manageStateStorage(roleArg),
    manageStateStorage(permArg),
  ),
)

export default function configureStore(initialState: any) {
  const store = createStore(createRootReducer(history), initialState, enhancer)
  if (process.env.NODE_ENV === "development") {
    if (module["hot"]) {
      module["hot"].accept("../reducers/rootReducer", () =>
        store.replaceReducer(require("../reducers/rootReducer").default),
      )
    }
  }
  return store
}
