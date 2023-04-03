import { pipe, flow } from "fp-ts/lib/function"
import { right, map as Emap, toError } from "fp-ts/Either"
import {
  chain as TEchain,
  map as TEmap,
  mapLeft as TEmapleft,
  tryCatch,
  of as TEof,
} from "fp-ts/TaskEither"
import { clone } from "isomorphic-git"
import { Semigroup } from "fp-ts/string"
import { intercalate } from "fp-ts/Semigroup"
import http from "isomorphic-git/http/web"
import FS from "@isomorphic-git/lightning-fs"

export interface DirectoryFileProperties {
  dir: string
  file: string
  url: string
}

const browserFS = new FS("github-wiki")
const defaultCloneParameter = {
  http,
  fs: browserFS,
  corsProxy: "https://cors.isomorphic-git.org",
}
const defaultSeparator = "/"
const readFileFromRepo = (path: string) =>
  tryCatch(async () => {
    const buffer = await browserFS.promises.readFile(path, {
      encoding: "utf8",
    })
    return buffer.toString()
  }, toError)
const executeCloneRepo = ({ dir, url, file }: DirectoryFileProperties) =>
  tryCatch(async () => {
    await clone({ dir, url, ...defaultCloneParameter })
    return { dir, url, file } as DirectoryFileProperties
  }, toError)
const addPath = ({ dir, file }: DirectoryFileProperties) =>
  // eslint-disable-next-line unicorn/prefer-spread
  pipe(Semigroup, intercalate(defaultSeparator)).concat(dir, file)
const input = (name: string) => right(name)
const padMore = (name: string) => `${name}-${name}`
const wrapper = (properties: DirectoryFileProperties) => TEof(properties)
const errorMessageExtract = (xerror: Error) => xerror.message
const useFunky = () => flow(input, Emap(padMore))

const useGithubWiki = () =>
  flow(
    wrapper,
    TEchain(executeCloneRepo),
    TEmap(addPath),
    TEchain(readFileFromRepo),
    TEmapleft(errorMessageExtract),
  )

export { useGithubWiki, useFunky }
