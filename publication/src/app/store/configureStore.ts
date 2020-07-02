import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import thunk from "redux-thunk"
import { routerMiddleware } from "connected-react-router"
import history from "../../common/utils/routerHistory"
import createRootReducer from "../reducers/rootReducer"

const enhancer = composeWithDevTools(
  applyMiddleware(routerMiddleware(history), thunk),
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
