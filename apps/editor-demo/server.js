import express from "express"
import fs from "node:fs"
import path from "node:path"
import url from "node:url"
import ViteExpress from "vite-express"
import bodyParser from "body-parser"
import { randomUUID } from "node:crypto"

const app = express()

app.use(bodyParser.json())

app.post("/save", async (request, response) => {
  const jsonData = JSON.stringify(request.body)
  const filePath = path.join(
    path.dirname(url.fileURLToPath(import.meta.url)),
    "json",
    `${randomUUID()}.json`,
  )

  fs.writeFile(filePath, jsonData, (error) => {
    if (error) {
      return response.status(500).send("Error saving data.")
    }
    return response.status(200).send("Data saved successfully.")
  })
})

const server = app.listen(3005, "0.0.0.0", () =>
  // eslint-disable-next-line no-console
  console.log("Server is listening..."),
)

ViteExpress.bind(app, server)
