import { createBrowserHistory } from "history"

const history = createBrowserHistory({
  basename: import.meta.env.VITE_APP_BASENAME,
})

export default history
