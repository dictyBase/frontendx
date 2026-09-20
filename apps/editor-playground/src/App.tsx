import { RouterProvider } from "react-router-dom"
import { router } from "./router"

const App = () => {
  return (
    <div>
      <h1>Lexical Experiments</h1>
      <RouterProvider router={router} />
    </div>
  )
}

export { App }
