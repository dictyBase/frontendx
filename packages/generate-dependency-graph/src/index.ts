import { writeFileSync } from "node:fs"
import { pipe } from "fp-ts/function"
import { createCommand } from "commander"
import { select } from "@inquirer/prompts"
import { analyzeDependencies } from "./analyzeDependencies"
import { Plugin, plugins } from "./plugins"

const program = createCommand()

program
  .argument("<path>", "Path to app directory to analyze")
  .action(async (path) => {
    const chosenPlugin = await select<Plugin>({
      message: "Choose a plugin",
      choices: plugins,
    })
    const filePath = `${path}/dependency-graph.${chosenPlugin.extension}`
    const output = pipe(path, analyzeDependencies, chosenPlugin.plugin)
    writeFileSync(filePath, output)
  })

program.parse()
