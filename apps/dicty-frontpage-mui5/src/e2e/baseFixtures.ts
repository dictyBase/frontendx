import { promises, writeFileSync } from "node:fs"
import { join } from "node:path"
import { randomBytes } from "node:crypto"
import { test as baseTest } from "@playwright/test"

const istanbulCLIOutput = join(process.cwd(), ".nyc_output")

export function generateUUID(): string {
  return randomBytes(16).toString("hex")
}

export const test = baseTest.extend({
  context: async ({ context }, use) => {
    await context.addInitScript(() =>
      window.addEventListener("beforeunload", () =>
        (window as any).collectIstanbulCoverage(
          JSON.stringify((window as any).__coverage__),
        ),
      ),
    )
    await promises.mkdir(istanbulCLIOutput, { recursive: true })
    await context.exposeFunction(
      "collectIstanbulCoverage",
      (coverageJSON: string) => {
        if (coverageJSON)
          writeFileSync(
            join(
              istanbulCLIOutput,
              `playwright_coverage_${generateUUID()}.json`,
            ),
            coverageJSON,
          )
      },
    )
    await use(context)
    // eslint-disable-next-line no-restricted-syntax
    for (const page of context.pages()) {
      // eslint-disable-next-line no-await-in-loop
      await page.evaluate(() =>
        (window as any).collectIstanbulCoverage(
          JSON.stringify((window as any).__coverage__),
        ),
      )
    }
  },
})

export const { expect } = test
