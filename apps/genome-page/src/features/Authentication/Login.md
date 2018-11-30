```js
const Provider = require("react-redux").Provider
const createStore = require("redux").createStore
const reducers = require("../../app/reducers/rootReducer").default

let store = createStore(reducers)
;<Provider store={store}>
  <Login location={{}} />
</Provider>
```
