import { createBrowserRouter, RouteObject} from "react-router-dom"
import { Editor, defaultEditorConfig, flexLayoutEditorConfig } from "@dictybase/editor"

const routeConfig: Array<RouteObject> = [
  { path: "default", element: <Editor config={defaultEditorConfig}/>},
  { path: "flex", element: <Editor config={flexLayoutEditorConfig}/>}
]

const router = createBrowserRouter(routeConfig)

export { router }
