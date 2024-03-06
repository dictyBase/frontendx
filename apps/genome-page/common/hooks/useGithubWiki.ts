// group of functions that receives an git url and provides a promise to resolve it to its
// markdown component
import { pipe, flow } from "fp-ts/lib/function"
import { toError } from "fp-ts/lib/Either"
import { of, tryCatch, chain, map, mapLeft } from "fp-ts/lib/TaskEither"
import { clone } from "isomorphic-git"
import { Semigroup } from "fp-ts/string"
import { intercalate } from "fp-ts/Semigroup"
import http from "isomorphic-git/http/web"
import FS from "@isomorphic-git/lightning-fs"

export interface DirFileProps {
  dir: string
  file: string
  url: string
  browserFS: FS
}

// The main wrapper function or hook
export function cloneGithubWiki(properties: DirFileProps) {
  const defaultCloneParameters = {
    http,
    fs: properties.browserFS,
    corsProxy: "https://cors.isomorphic-git.org",
  }
  const defaultSeparator = "/"

  // function that converts the data to a monad that handle promise
  const wrapper = (properties_: DirFileProps) => of(properties_)

  // function that runs the clone api and returns a promise, handles both the
  // success and error conditons.
  const executeCloneRepo = ({ dir, url, file }: DirFileProps) =>
    tryCatch(async () => {
      await clone({ dir, url, ...defaultCloneParameters })
      return { dir, url, file } as DirFileProps
    }, toError)
  // const errLogger = TE.fromIOK(Console.error)
  // const infoLogger = TE.fromIOK(Console.info)

  // function that extract the error message from the Error object
  const errorMessageExtract = (error: Error) => error.message

  // function that constructs the markdown file path inside the git repo
  const addPath = ({ dir, file }: DirFileProps) => {
    const pathDelimGroup = pipe(Semigroup, intercalate(defaultSeparator))
    return pathDelimGroup.concat(dir, file)
  }

  // function that read the markdown file from the git repo. Also handles the error.
  const readFileFromRepo = (path: string) =>
    tryCatch(async () => {
      const buffer = await properties.browserFS.promises.readFile(path, {
        encoding: "utf8",
      })
      return buffer.toString()
    }, toError)

  // construct a pipeline from all the functions
  const payload = flow(
    wrapper,
    chain(executeCloneRepo),
    // TE.chainFirstIOK(infoLogger),
    map(addPath),
    // TE.chainFirstIOK(infoLogger),
    chain(readFileFromRepo),
    // TE.chainFirstIOK(infoLogger),
    mapLeft(errorMessageExtract),
  )
  return payload(properties)
}
