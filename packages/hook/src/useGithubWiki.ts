import { pipe, flow } from "fp-ts/lib/function"
import * as E from "fp-ts/lib/Either"
import * as TE from "fp-ts/lib/TaskEither"
import * as Console from "fp-ts/Console"
import { clone } from "isomorphic-git"
import * as S from "fp-ts/string"
import { intercalate } from "fp-ts/Semigroup"
import http from "isomorphic-git/http/web"
import FS from "@isomorphic-git/lightning-fs"

export interface DirFileProps {
  dir: string
  file: string
  url: string
}

export function useFunky() {
  const input = (name: string) => E.right(name)
  const padMore = (name: string) => `${name}-${name}`
  return flow(input, E.map(padMore))
}

export function useGithubWiki() {
  const browserFS = new FS("github-wiki")
  const defaultCloneParams = {
    http: http,
    fs: browserFS,
    corsProxy: "https://cors.isomorphic-git.org",
  }
  const defaultSep = "/"
  const wrapper = (props: DirFileProps) => TE.of(props)
  const executeCloneRepo = ({ dir, url, file }: DirFileProps) =>
    TE.tryCatch(async () => {
      await clone({ dir, url, ...defaultCloneParams })
      return { dir, url, file } as DirFileProps
    }, E.toError)
  // const errLogger = TE.fromIOK(Console.error)
  const infoLogger = TE.fromIOK(Console.info)
  const errMsgExtract = (err: Error) => err.message
  const addPath = ({ dir, file }: DirFileProps) => {
    const pathDelimGroup = pipe(S.Semigroup, intercalate(defaultSep))
    return pathDelimGroup.concat(dir, file)
  }
  const readFileFromRepo = (path: string) =>
    TE.tryCatch(async () => {
      const buffer = await browserFS.promises.readFile(path, {
        encoding: "utf8",
      })
      return buffer.toString()
    }, E.toError)

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
  return payload
}
