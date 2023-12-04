import { connect, type Client } from "@dagger.io/dagger"

/**
 * This program -> Dagger Engine -> Runs Pipelines
 */

// Creates the dagger client
connect(
  // Client refers to the Dagger client,
  async (client: Client) => {
    // get reference to local project
    const source = client.host().directory("..", { exclude: ["node_modules/"] })

    const nodeContainer = client.container().from("node:18")

    // mount clones repository into Node image
    const runner = nodeContainer
      .withDirectory("/src", source)
      .withWorkdir("/src")
      .withExec(["yarn"])

    // run tests
    await runner.withExec(["yarn", "lint:out"]).sync()
  },
  { LogOutput: process.stderr },
)
