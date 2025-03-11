import { test, expect } from "vitest"
import { pathParts } from "../pathParts"

const testFileNames = [
  ["/src/pages/about.tsx", "/about"],
  ["/src/pages/news/create.tsx", "/news/create"], // multiple segments
  ["/src/pages/news/index.tsx", "/news"], // index segment
  ["/src/pages/news/[slug].tsx", "/news/:slug"], // route parameter
  ["/src/pages/[section]/[name]/index.tsx", "/:section/:name"], // multiple route parameters
]

test.each(testFileNames)("converts %s to %s", (input, output) => {
  expect(pathParts(input)).toEqual(output)
})
