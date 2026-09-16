import { createBrowserRouter, RouteObject } from "react-router-dom"
import { type SerializedEditorState } from "lexical"
import { DebugEditor, dictyEditorConfig, flexLayoutState } from "@dictybase/editor"
import { pipe } from "fp-ts/function"
import { Ord as SOrd } from "fp-ts/string"
import { collect as Rcollect, map as Rmap } from "fp-ts/Record"
import { EditorPager } from "./EditorPager"
import { getOrElse as OgetOrElse } from "fp-ts/Option"
import { fromArray as RNEAfromArray, of as RNEAof } from "fp-ts/ReadonlyNonEmptyArray"

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
