import { writeFileSync } from "node:fs"
import { pipe } from "fp-ts/function"
import { createCommand } from "commander"
import { select } from "@inquirer/prompts"
import { analyzeDependencies } from "./analyzeDependencies"
import { findRedundantDependencies } from "./removeRedundantDependencies"
import { Plugin, plugins } from "./plugins"

declare global {
  var localOnly: boolean
}

const program = createCommand()

program
  .command("show")
  .description("ouputs a tree representation of the dependency tree of a project")
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

program
  .command("list-redundant")
  .description("lists redundant dependencies")
  .option("-l, --local-only", "Include only local dependencies", false)
  .argument("<path>", "Path to app directory to analyze")
  .action(async (path) => {
    const output = pipe(path, analyzeDependencies, findRedundantDependencies)
    console.log(output)
  })
program.parse()

