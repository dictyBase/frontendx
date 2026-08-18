import { createBrowserRouter, RouteObject } from "react-router-dom"
import { DebugEditor, defaultEditorConfig, dictyEditorConfig } from "@dictybase/editor"

const routeConfig: Array<RouteObject> = [
  { path: "default", element: <DebugEditor editable config={defaultEditorConfig} /> },
  { path: "flex", element: <DebugEditor editable config={dictyEditorConfig} /> },
]

const router = createBrowserRouter(routeConfig)

export { router }
