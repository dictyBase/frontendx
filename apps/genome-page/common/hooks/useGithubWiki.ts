// group of functions that receives an git url and provides a promise to resolve it to its
// markdown component
import { pipe, flow } from "fp-ts/lib/function"
import * as E from "fp-ts/lib/Either"
import * as TE from "fp-ts/lib/TaskEither"
import { clone } from "isomorphic-git"
import * as S from "fp-ts/string"
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
export function useGithubWiki(props: DirFileProps) {
  const defaultCloneParams = {
    http: http,
    fs: props.browserFS,
    corsProxy: "https://cors.isomorphic-git.org",
  }
  const defaultSep = "/"

  // function that converts the data to a monad that handle promise
  const wrapper = (props: DirFileProps) => TE.of(props)

  // function that runs the clone api and returns a promise, handles both the
  // success and error conditons.
  const executeCloneRepo = ({ dir, url, file }: DirFileProps) =>
    TE.tryCatch(async () => {
      await clone({ dir, url, ...defaultCloneParams })
      return { dir, url, file } as DirFileProps
    }, E.toError)
  // const errLogger = TE.fromIOK(Console.error)
  // const infoLogger = TE.fromIOK(Console.info)

  // function that extract the error message from the Error object
  const errMsgExtract = (err: Error) => err.message

  // function that constructs the markdown file path inside the git repo
  const addPath = ({ dir, file }: DirFileProps) => {
    const pathDelimGroup = pipe(S.Semigroup, intercalate(defaultSep))
    return pathDelimGroup.concat(dir, file)
  }

  // function that read the markdown file from the git repo. Also handles the error.
  const readFileFromRepo = (path: string) =>
    TE.tryCatch(async () => {
      const buffer = await props.browserFS.promises.readFile(path, {
        encoding: "utf8",
      })
      return buffer.toString()
    }, E.toError)

  // construct a pipeline from all the functions
  const payload = flow(
    wrapper,
    TE.chain(executeCloneRepo),
    // TE.chainFirstIOK(infoLogger),
    TE.map(addPath),
    // TE.chainFirstIOK(infoLogger),
    TE.chain(readFileFromRepo),
    // TE.chainFirstIOK(infoLogger),
    TE.mapLeft(errMsgExtract),
  )
  return payload(props)
}
