# General Questions
- How is the script going to be run?
- Where should the output live? 
- Should there even be a `scripts` package?

# Generating Tree Output
Given entrypoint package.json of an application, output a JSON(?) representation of the dependency tree that includes:
  - All immediate external NPM dependencies
  - Local frontendx packages (`@dictybase/*`) and their subtrees

## Algorithm: 
  1. Get all `app` manifests.
  2. Get all `project` manifests.
  3. Iterate through list of `app` manifests.
    - Initialize `dependencies` list.
    - Look through manifest's `dependencies` field.
    - If dependency is *local*, apply step 3 to its `package.json` manifest
    - If dependency is *remote*, append `DependencyNode` to `dependencies` list
    - Create `DependencyNode` with `dependencies`

## Questions:
- How to test output?
- How to handle circular dependencies?
- Should devDependencies be included?
- Is there a better output format than JSON?

## Code Review

  Your dependency tree generation code looks well-structured and functional! Here are my observations:

  Strengths:
  - Good use of fp-ts for functional programming patterns
  - Clean separation of concerns across modules
  - Type safety with proper TypeScript types
  - Recursive tree generation handles nested dependencies correctly

  Issues to address:

  1. Missing null check in getDependencyTree.ts:18 - you're using ! assertion but should handle the case where localPackages[name] might be undefined
  2. Missing dependencies property in types.ts:4-5 - ProjectManifest assumes all packages have dependencies and devDependencies, but these are optional in real
  package.json files
  3. Hardcoded app name in index.ts:13 - apps["dicty-frontpage"] should be configurable or handle missing apps
  4. Error handling - No error handling for file operations or JSON parsing

# Pruning Redundant Dependencies
