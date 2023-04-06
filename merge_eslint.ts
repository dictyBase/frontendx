/* eslint-disable unicorn/prefer-array-flat-map */
/* eslint-disable no-console */
import fs from "node:fs"
import { join } from "node:path"

const readFilesFromFolder = (folder: string) =>
  fs
    .readdirSync(folder)
    .map((file) => join(folder, file))
    .map((file) => fs.readFileSync(file, "utf8"))
    .map((content) => JSON.parse(content))
    .flat()

const mergeContent = (folder: string) => {
  try {
    fs.writeFileSync(
      "eslint_output.json",
      JSON.stringify(readFilesFromFolder(folder)),
      "utf8",
    )
  } catch (error) {
    console.error(error)
  }
}
mergeContent(process.argv.at(2) as string)
