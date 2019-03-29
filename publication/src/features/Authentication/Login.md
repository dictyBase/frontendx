```js
const Provider = require("react-redux").Provider
const configureStore = require("../../app/store/configureStore").default
const reducers = require("../../app/reducers/rootReducer").default

;<Provider store={configureStore({})}>
  <Login location={{}} />
</Provider>
```
