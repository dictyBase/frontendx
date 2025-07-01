import { ProjectNode } from "../ProjectNode"
import { removeRedundantDependencies, findRedundantDependencies } from "../removeRedundantDependencies"

// Test case based on the example in the requirements
function testRedundantDependencyRemoval() {
  // Create the tree structure from the example:
  // A -> B -> C
  //      B -> ts-pattern
  //      C -> ts-pattern
  
  const nodeA = new ProjectNode({ name: "A", version: "1.0.0" })
  const nodeB = new ProjectNode({ name: "B", version: "1.0.0", parent: nodeA })
  const nodeC = new ProjectNode({ name: "C", version: "1.0.0", parent: nodeB })
  const tsPatternAtB = new ProjectNode({ name: "ts-pattern", version: "5.0.0", parent: nodeB })
  const tsPatternAtC = new ProjectNode({ name: "ts-pattern", version: "5.0.0", parent: nodeC })
  
  nodeA.addChild(nodeB)
  nodeB.addChild(nodeC)
  nodeB.addChild(tsPatternAtB)
  nodeC.addChild(tsPatternAtC)
  
  console.log("Original tree structure:")
  console.log(`${nodeA.name}`)
  console.log(`├── ${nodeB.name}`)
  console.log(`│   ├── ${nodeC.name}`)
  console.log(`│   │   └── ${tsPatternAtC.name}`)
  console.log(`│   └── ${tsPatternAtB.name}`)
  
  // Find redundant dependencies before removal
  const redundancies = findRedundantDependencies(nodeA)
  console.log("\nFound redundancies:")
  redundancies.forEach(r => {
    console.log(`- ${r.dependency} at ${r.redundantAt} (available through: ${r.availableThrough.join(", ")})`)
  })
  
  // Remove redundant dependencies
  const cleanedTree = removeRedundantDependencies(nodeA)
  
  console.log("\nCleaned tree structure:")
  console.log(`${cleanedTree.name}`)
  console.log(`├── ${cleanedTree.children[0].name}`)
  console.log(`│   └── ${cleanedTree.children[0].children[0].name}`)
  console.log(`│       └── ${cleanedTree.children[0].children[0].children[0].name}`)
  
  // Verify the result
  const hasRedundantTsPattern = nodeB.children.some(child => child.name === "ts-pattern")
  const hasValidTsPattern = nodeC.children.some(child => child.name === "ts-pattern")
  
  console.log(`\nTest results:`)
  console.log(`- B should not have ts-pattern: ${!hasRedundantTsPattern ? "PASS" : "FAIL"}`)
  console.log(`- C should still have ts-pattern: ${hasValidTsPattern ? "PASS" : "FAIL"}`)
  
  return !hasRedundantTsPattern && hasValidTsPattern
}

// Run the test
if (require.main === module) {
  console.log("Testing redundant dependency removal...")
  const success = testRedundantDependencyRemoval()
  console.log(`\nOverall test result: ${success ? "PASS" : "FAIL"}`)
  process.exit(success ? 0 : 1)
}

export { testRedundantDependencyRemoval }
