import { pipe } from "fp-ts/function"
import { replace as Sreplace } from "fp-ts/string"
import { map as Amap, filter as Afilter } from "fp-ts/Array"
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { test as base } from "@playwright/test"

/**
 * Code coverage provides information about whether, and optionally how often certain
 * parts of an application have been executed. It’s commonly used to determine how thoroughly
 * a test suite exercises a particular codebase.
 *
 * - https://v8.dev/blog/javascript-code-coverage
 */

/**
 *  - Playwright does not have configuration or option to generate test coverage output.
 *  - But it has an API to generate coverage arrays in memory.
 *    - It is only supported in chromium-based browsers (https://playwright.dev/docs/api/class-coverage)
 *
 */

const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    const coverageDirectory = "./coverage/tmp"
    const sourceDirectory = "./src"
    await page.coverage.startJSCoverage()
    await use(page)
    const coverage = await page.coverage.stopJSCoverage()
    const sourceCoverage = pipe(
      coverage,
      Amap((entry) => ({
        ...entry,
        url: entry.url.replace(
          /http:\/\/(.+\.)?localhost:\d+/,
          path.resolve("."),
        ),
      })),
      Afilter((entry) => entry.url.startsWith(path.resolve(sourceDirectory))),
    )
    try {
      await mkdir(coverageDirectory, { recursive: true })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
    const fileName = pipe(testInfo.title, Sreplace(/\s+/g, "-"))
    await writeFile(
      path.join(coverageDirectory, `${fileName}.json`),
      JSON.stringify({ result: sourceCoverage }),
    )
  },
})

export { test }
export { expect } from "@playwright/test"
