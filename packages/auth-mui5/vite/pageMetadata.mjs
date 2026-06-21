import { promises as fs } from "node:fs"
import { join, relative, resolve, sep } from "node:path"

const VIRTUAL_ID = "virtual:dictybase/page-metadata"
const RESOLVED_VIRTUAL_ID = `\0${VIRTUAL_ID}`

const ACCESS_REGEX =
  /export\s+const\s+access\s*(?::[^=]+)?=\s*(ACCESS\.[A-Za-z_]+)/m
const ROLES_REGEX =
  /export\s+const\s+roles\s*(?::[^=]+)?=\s*(\[[^\]]*\]|undefined)/m

/**
 * @typedef {Object} PageMetadataPluginOptions
 * @property {string} [pagesDir] Page directory to scan, relative to the Vite
 *   project root. Defaults to `src/pages`.
 */

/**
 * Vite plugin that exposes the `access` and `roles` metadata declared by each
 * file under the configured pages directory through a virtual module:
 *
 *   import { pagesMetadata } from "virtual:dictybase/page-metadata"
 *
 * Routing code can read the metadata synchronously without statically
 * importing the page module, which lets Vite/Rollup keep the heavy component
 * code in its own dynamic-import chunk and load it on demand.
 *
 * Page files are scanned for the conventions used across dictybase apps:
 *
 *   export const access = ACCESS.protected
 *   export const roles = ["content-admin"]
 *
 * Both exports are optional; missing values are emitted as `undefined`.
 *
 * @param {PageMetadataPluginOptions} [options]
 * @returns {import("vite").Plugin}
 */
export const pageMetadataPlugin = ({ pagesDir = "src/pages" } = {}) => {
  let projectRoot = process.cwd()
  let pagesRoot = resolve(projectRoot, pagesDir)
  return {
    name: "dictybase:page-metadata",
    configResolved(resolved) {
      projectRoot = resolved.root
      pagesRoot = resolve(projectRoot, pagesDir)
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_VIRTUAL_ID
      return null
    },
    async load(id) {
      if (id !== RESOLVED_VIRTUAL_ID) return null
      const files = await collectPageFiles(pagesRoot)
      const entries = await Promise.all(
        files.map(async (absolutePath) => {
          const content = await fs.readFile(absolutePath, "utf8")
          const access = extractAccess(content)
          const roles = extractRoles(content)
          const key = toGlobKey(projectRoot, absolutePath)
          return `  ${JSON.stringify(key)}: { access: ${access}, roles: ${roles} }`
        }),
      )
      return [
        `import { ACCESS } from "@dictybase/auth-mui5"`,
        `export const pagesMetadata = {`,
        entries.join(",\n"),
        `}`,
        ``,
      ].join("\n")
    },
  }
}

const collectPageFiles = async (root) => {
  try {
    const entries = await fs.readdir(root, { withFileTypes: true })
    const nested = await Promise.all(
      entries.map(async (entry) => {
        const full = join(root, entry.name)
        if (entry.isDirectory()) return collectPageFiles(full)
        if (entry.isFile() && entry.name.endsWith(".tsx")) return [full]
        return []
      }),
    )
    return nested.flat()
  } catch {
    return []
  }
}

const toGlobKey = (projectRoot, absolutePath) => {
  const fromRoot = relative(projectRoot, absolutePath)
  return `/${fromRoot.split(sep).join("/")}`
}

const extractAccess = (content) => {
  const match = content.match(ACCESS_REGEX)
  return match ? match[1] : "undefined"
}

const extractRoles = (content) => {
  const match = content.match(ROLES_REGEX)
  return match ? match[1] : "undefined"
}
