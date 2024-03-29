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

export interface DirectoryFileProperties {
  dir: string
  file: string
  url: string
  browserFS: FS
}

// The main wrapper function or hook
export function cloneGithubWiki(properties: DirectoryFileProperties) {
  const defaultCloneParameters = {
    http,
    fs: properties.browserFS,
    corsProxy: "https://cors.isomorphic-git.org",
  }
  const defaultSeparator = "/"

  // function that converts the data to a monad that handle promise
  const wrapper = (properties_: DirectoryFileProperties) => of(properties_)

  // function that runs the clone api and returns a promise, handles both the
  // success and error conditons.
  const executeCloneRepo = ({ dir, url, file }: DirectoryFileProperties) =>
    tryCatch(async () => {
      await clone({ dir, url, ...defaultCloneParameters })
      return { dir, url, file } as DirectoryFileProperties
    }, toError)
  // const errLogger = TE.fromIOK(Console.error)
  // const infoLogger = TE.fromIOK(Console.info)

  // function that constructs the markdown file path inside the git repo
  const addPath = ({ dir, file }: DirectoryFileProperties) => {
    const pathDelimGroup = pipe(Semigroup, intercalate(defaultSeparator))
    // eslint-disable-next-line unicorn/prefer-spread -- this .concat is not Array.concat
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

  // function that extract the error message from the Error object
  // eslint-disable-next-line unicorn/consistent-function-scoping -- It's nice to keep this function here because these functions are defined in the order they are used in the flow below.
  const errorMessageExtract = (error: Error) => error.message

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
