import { NonEmptyArray } from "fp-ts/NonEmptyArray"
import { toJSON } from "./toJSON"
import { toGraphviz } from "./toGraphviz"
import { toMermaid } from "./toMermaid"
import { ProjectNode } from "../ProjectNode"

type Plugin = {
  plugin: (node: ProjectNode) => string
  extension: string
}

type PluginChoice = {
  name: string
  value: Plugin
}

const plugins: NonEmptyArray<PluginChoice> = [
  {
    name: "JSON",
    value: {
      plugin: toJSON,
      extension: "json",
    },
  },
  {
    name: "Mermaid",
    value: {
      plugin: toMermaid,
      extension: "md",
    },
  },
  {
    name: "Graphviz",
    value: {
      plugin: toGraphviz,
      extension: "dot",
    },
  },
]

export { plugins, type Plugin, type PluginChoice }
