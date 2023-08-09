import express from "express"
import ViteExpress from "vite-express"
import bodyParser from "body-parser"
import { generateListStrainDataOfLength } from "./src/mocks/listStrainData"

const listStrainData = generateListStrainDataOfLength(25)

const app = express()

app.use(bodyParser.json())

app.get("graphql", (request, response) => {
  response.send("test")
})

const server = app.listen(3003, "0.0.0.0", () =>
  // eslint-disable-next-line no-console
  console.log("Server is listening..."),
)

ViteExpress.bind(app, server)
