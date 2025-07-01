import { join } from "node:path"
import { expect, test, describe } from "vitest"
import { getManifest, getManifests } from "../getLocalPackages"

describe("getManifest", () => {
  test("Given a project path, it returns an object representation of the `package.json` of a project", () => {
    const projectPath = "./"
    const manifest = getManifest(projectPath)
    expect(manifest.name).toBe("@dictybase/scripts")
  })
})
