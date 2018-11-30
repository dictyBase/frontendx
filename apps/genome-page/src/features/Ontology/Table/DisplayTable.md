```js
const Provider = require("react-redux").Provider
const createStore = require("redux").createStore
const reducers = require("../../../app/reducers/rootReducer").default
const data = require("../mockData").data

let store = createStore(reducers)
;<Provider store={store}>
  <DisplayTable goaData={data} />
</Provider>
```
