import { Digraph, Node as GVNode, Edge, toDot } from 'ts-graphviz'
import { ProjectNode } from "../ProjectNode"

// Traverse tree and create nodes
function traverse(graph: Digraph, node: ProjectNode, nodeMap: Map<ProjectNode, GVNode>) {
  if (!nodeMap.has(node)) {
    const graphNode = new GVNode(`node_${nodeMap.size}`, {
      label: node.name,
      shape: 'box'
    })
    graph.addNode(graphNode)
    nodeMap.set(node, graphNode)
  }

  // Create edges for children
  node.children.forEach(child => {
    traverse(graph, child, nodeMap)
    const parentNode = nodeMap.get(node)!
    const childNode = nodeMap.get(child)!
    graph.addEdge(new Edge([parentNode, childNode]))
  })
}

function toGraphviz(rootNode: ProjectNode): string {
  const graph = new Digraph('dependency-graph')
  const nodeMap = new Map<ProjectNode, GVNode>()

  traverse(graph, rootNode, nodeMap)

  return toDot(graph)
}

export { toGraphviz }
