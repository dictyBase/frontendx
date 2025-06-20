import { writeFileSync } from "node:fs"
import { pipe } from "fp-ts/function"
import { createCommand } from "commander"
import { select } from "@inquirer/prompts"
import { analyzeDependencies } from "./analyzeDependencies"
import { Plugin, plugins } from "./plugins"

declare global {
  var localOnly: boolean
}

const program = createCommand()

program
  .option("-l, --local-only", "Include only local dependencies", false)
  .argument("<path>", "Path to app directory to analyze")
  .action(async (path, options) => {
    globalThis.localOnly = options.localOnly
    const chosen = await select<Plugin>({
      message: "Choose a plugin",
      choices: plugins,
    })
    const filePath = `${path}/dependency-graph.${chosen.extension}`
    const output = pipe(path, analyzeDependencies, chosen.plugin)
    writeFileSync(filePath, output)
  })

program.parse()

