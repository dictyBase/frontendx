import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { connectRouter, routerMiddleware } from "connected-react-router"
import { manageStateStorage } from "dicty-components-redux"
import history from "common/utils/routerHistory"
import rootReducer from "app/reducers/rootReducer"
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "common/constants/types"

const authArg = {
  save_action: LOGIN_SUCCESS,
  remove_action: LOGOUT_SUCCESS,
  key: "auth",
  namespace: "auth",
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(
  applyMiddleware(
    routerMiddleware(history),
    thunk,
    manageStateStorage(authArg),
  ),
)

export default function configureStore(initialState: Object) {
  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    enhancer,
  )
  if (process.env.NODE_ENV === "development") {
    if (module.hot) {
      module.hot.accept("app/reducers/rootReducer", () =>
        store.replaceReducer(require("app/reducers/rootReducer").default),
      )
    }
  }
  return store
}
