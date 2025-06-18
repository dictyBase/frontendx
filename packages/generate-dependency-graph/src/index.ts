import { createCommand } from "commander"

const program = createCommand()

program
  .name("analyze-dependencies")
  .argument("<string>", "Path to app directory to analyze")

