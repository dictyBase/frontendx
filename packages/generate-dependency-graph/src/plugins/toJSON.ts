import { ProjectNode } from "../ProjectNode"

const toJSON = (tree: ProjectNode): string => {
  return JSON.stringify(tree, ["name", "version", "children"], 2)
}

export { toJSON }
