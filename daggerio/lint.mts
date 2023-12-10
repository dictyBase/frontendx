import { connect, type Client } from "@dagger.io/dagger"
// Creates the dagger client
connect(
  async (client: Client) => {
    // get reference to local project
    const source = client.host().directory("./", { exclude: ["node_modules/"] })

    const nodeContainer = client.container().from("node:18")

    // mount clones repository into Node image
    const runner = nodeContainer
      .withDirectory("/src", source)
      .withWorkdir("/src")
      .withExec(["yarn"])

    // setup linting
    await runner.withExec(["yarn", "lint"]).stdout()
  },
  { LogOutput: process.stderr },
)
