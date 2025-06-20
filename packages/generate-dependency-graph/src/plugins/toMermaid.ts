import { ProjectNode } from "../ProjectNode"
import { pipe } from "fp-ts/function"
import { Monoid as SMonoid } from "fp-ts/string"
import {
  map as Amap,
  getMonoid,
  concat as Aconcat,
  intercalate as Aintercalate,
} from "fp-ts/Array"

type MermaidGraph = {
  nodes: Array<MermaidNode>
  edges: Array<MermaidEdge>
}

type MermaidNode = {
  id: string
  label: string
}

type MermaidEdge = {
  to: MermaidNode
  from: MermaidNode
}

const toNodeString = (node: MermaidNode) => `${node.id}[${node.label}]`
const toEdgeString = ({ to, from }: MermaidEdge) => `${from.id} ----> ${to.id}`

// Traverse tree and create nodes
const traverse = (
  accumulator: MermaidGraph,
  project: ProjectNode,
  nodeMap: Map<ProjectNode, MermaidNode>,
) => {
  if (!nodeMap.has(project)) {
    const graphNode = {
      id: `node_${nodeMap.size}`,
      label: `"${project.name}:${project.version}"`,
    }
    accumulator.nodes.push(graphNode)
    nodeMap.set(project, graphNode)
  }

  // Create edges for children
  project.children.forEach((child) => {
    traverse(accumulator, child, nodeMap)
    const parentNode = nodeMap.get(project)!
    const childNode = nodeMap.get(child)!
    accumulator.edges.push({ from: parentNode, to: childNode })
  })
}

const toMermaid = (rootNode: ProjectNode): string => {
  const mermaidGraph = {
    nodes: [],
    edges: [],
  }
  const nodeMap = new Map<ProjectNode, MermaidNode>()
  traverse(mermaidGraph, rootNode, nodeMap)

  const nodes = pipe(mermaidGraph.nodes, Amap(toNodeString))
  const edges = pipe(mermaidGraph.edges, Amap(toEdgeString))
  const AMonoid = getMonoid<string>()
  const mermaidStart = ["```mermaid", "flowchart TD"]
  const mermaidEnd = ["```"]
  const mermaidMain = AMonoid.concat(nodes, edges)

  return pipe(
    mermaidStart,
    Aconcat(mermaidMain),
    Aconcat(mermaidEnd),
    Aintercalate(SMonoid)("\n"),
  )
}

export { toMermaid }
