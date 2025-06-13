## Questions
- How is the script going to be run?
- Where should the output live? 
- How to handle circular dependencies?

Given entrypoint package.json of an application, output a JSON(?) representation of the dependency tree that includes:
  - All immediate external NPM dependencies
  - Local frontendx packages (`@dictybase/*`) and their subtrees

Algorithm: 
  1. Initialize `DependencyTree`
  2. Get all dependencies of entrypoint `package.json`
    i. Read the entrypoint `package.json`
    ii. Parse into JSON
    iii. 
