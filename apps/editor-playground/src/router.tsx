import { createBrowserRouter, RouteObject } from "react-router-dom"
import { DebugEditor, defaultEditorConfig, dictyEditorConfig } from "@dictybase/editor"

const routeConfig: Array<RouteObject> = [
  { path: "/", element: <DebugEditor editable config={dictyEditorConfig} /> },
]

const router = createBrowserRouter(routeConfig)

export { router }
