import { createBrowserRouter, RouteObject } from "react-router-dom"
import { type SerializedEditorState } from "lexical"
import { DebugEditor, dictyEditorConfig } from "@dictybase/editor"
import { pipe } from "fp-ts/function"
import { map as Rmap } from "fp-ts/Record"
import { EditorPager } from "./EditorPager"

const data = import.meta.glob<{ default: SerializedEditorState }>("/src/data/content/*", {
  eager: true,
})

const pages = pipe(
  data,
  Rmap((a) => a.default),
)

const routeConfig: Array<RouteObject> = [
  { path: "/", element: <DebugEditor editable config={dictyEditorConfig} /> },
  { path: "list", element: <EditorPager contentRecord={pages} /> },
]

const router = createBrowserRouter(routeConfig)

export { router }
