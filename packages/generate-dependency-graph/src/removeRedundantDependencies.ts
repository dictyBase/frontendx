import { ProjectNode } from "./ProjectNode"

/**
 * Removes redundant dependencies from a dependency tree.
 * 
 * A dependency D is redundant if:
 * - Its parent project has a child that also has dependency D.
 * 
 * @param root The root node of the dependency tree
 * @returns The tree with redundant dependencies removed
 */
function removeRedundantDependencies(root: ProjectNode): ProjectNode {
  const traverse = (node: ProjectNode) => {
    const redundantDependencies: ProjectNode[] = []
    
    // Check each direct dependency of this node
    for (const dependency of node.children) {
      // Get all dependencies that this node's children have
      const childrenDependencies = new Set<string>()
      
      for (const child of node.children) {
        if (child !== dependency) {
          // Get all descendant dependencies of this child
          const descendantDeps = child.getAllDescendantDependencies()
          descendantDeps.forEach(dep => childrenDependencies.add(dep))
        }
      }
      
      // If any child has this dependency, it's redundant at this level
      if (childrenDependencies.has(dependency.name)) {
        redundantDependencies.push(dependency)
      }
    }
    
    // Remove redundant dependencies
    for (const redundant of redundantDependencies) {
      node.removeChild(redundant)
    }
    
    // Recursively process remaining children
    for (const child of node.children) {
      traverse(child)
    }
  }
  
  traverse(root)
  return root
}

/**
 * Finds all redundant dependencies in a tree without removing them.
 * Useful for analysis and reporting.
 * 
 * @param root The root node of the dependency tree
 * @returns Array of objects describing redundant dependencies
 */
function findRedundantDependencies(root: ProjectNode): Array<{
  dependency: string
  redundantAt: string
  availableThrough: string[]
}> {
  const redundancies: Array<{
    dependency: string
    redundantAt: string
    availableThrough: string[]
  }> = []
  
  const traverse = (node: ProjectNode) => {
    // Check each direct dependency of this node
    for (const dependency of node.children) {
      const availableThrough: string[] = []
      
      // Check if any child of this node also has this dependency
      for (const child of node.children) {
        if (child !== dependency) {
          const descendantDeps = child.getAllDescendantDependencies()
          if (descendantDeps.has(dependency.name)) {
            availableThrough.push(child.name)
          }
        }
      }
      
      if (availableThrough.length > 0) {
        redundancies.push({
          dependency: dependency.name,
          redundantAt: node.name,
          availableThrough
        })
      }
    }
    
    // Recursively process children
    for (const child of node.children) {
      traverse(child)
    }
  }
  
  traverse(root)
  return redundancies
}

export { removeRedundantDependencies, findRedundantDependencies }