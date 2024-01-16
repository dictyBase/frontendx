/**
 * This function takes a path and returns the modified path parts.
 * It replaces specific patterns in the path string with desired values.
 */
const pathParts = (path: string) =>
  path
    .replaceAll(/\/src\/pages|index|\.tsx$/g, "")
    .replace(/\[\.{3}.+]/, "*")
    .replaceAll(/\[(\w+)]/, ":$1")

export { pathParts }
