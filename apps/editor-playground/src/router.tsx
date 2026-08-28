import { createBrowserRouter, RouteObject } from "react-router-dom"
import { type SerializedEditorState } from "lexical"
import { DebugEditor, dictyEditorConfig, flexLayoutState } from "@dictybase/editor"
import { pipe } from "fp-ts/function"
import { Ord as SOrd } from "fp-ts/string"
import { collect as Rcollect } from "fp-ts/Record"
import { EditorPager } from "./EditorPager"
import { getOrElse as OgetOrElse } from "fp-ts/Option"
import { fromArray as RNEAfromArray, of as RNEAof } from "fp-ts/ReadonlyNonEmptyArray"

const data = import.meta.glob<{ default: SerializedEditorState }>("/src/data/output/*", {
  eager: true,
})

const pages = pipe(
  data,
  Rcollect(SOrd)((_, a) => a.default),
  RNEAfromArray,
  OgetOrElse(() => RNEAof(flexLayoutState as SerializedEditorState)),
)

const routeConfig: Array<RouteObject> = [
  { path: "/", element: <DebugEditor editable config={dictyEditorConfig} /> },
  { path: "list", element: <EditorPager contentList={pages} /> },
]

const router = createBrowserRouter(routeConfig)

export { router }
