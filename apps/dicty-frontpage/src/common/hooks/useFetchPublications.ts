import { useState, useEffect } from "react"
import { pipe, constVoid } from "fp-ts/function"
import {
  of as Oof,
  fromNullable,
  getOrElse as OgetOrElse,
  Applicative as OApplicative,
  flatMap as OflatMap,
  map as Omap,
  Do as ODo,
  let as Olet,
  bind as Obind,
  bindTo as ObindTo,
} from "fp-ts/Option"
import {
  map as Amap,
  sequence,
  filter as Afilter,
  head,
  compact,
} from "fp-ts/Array"
import {
  type TaskEither,
  map as TEmap,
  match as TEmatch,
  tryCatch as TEtryCatch,
  flatMap as TEflatMap,
} from "fp-ts/TaskEither"
import { Do as IDo, let as Ilet } from "fp-ts/Identity"
import { left as Eleft, right as Eright } from "fp-ts/Either"
import { startsWith, replace } from "fp-ts/lib/string"

type PublicationItem = {
  publishDate: string
  title: string
  authors: Array<string>
  description: string
  link: string
  journal: string
  pubmedId: string
}

/**
 * A function whose return function fetches a resource from a given URL using the TaskEither monad.
 *
 * https://gcanti.github.io/fp-ts/modules/TaskEither.ts.html
 *
 * @param url - The URL of the resource to fetch.
 * @returns A TaskEither that represents the asynchronous fetch operation.
 */
const createTaskEitherFetch = (url: string): TaskEither<string, Response> =>
  pipe(
    TEtryCatch(
      () => fetch(url),
      (reason) => `${reason}`,
    ),
    TEmatch(
      (error) => Eleft(error),
      (response) =>
        response.status === 200
          ? Eright(response)
          : Eleft(
              `Invalid Response. HTTP Code ${response.status}: ${response.statusText}`,
            ),
    ),
  )

const parseResponseToString = (response: Response) =>
  pipe(
    TEtryCatch(
      () => response.text(),
      (reason) => `${reason}`,
    ),
  )

const extractItems = (xmlString: string): Array<Element> => [
  ...new window.DOMParser()
    .parseFromString(xmlString, "text/xml")
    .querySelectorAll("item"),
]

const itemPropertyExtractor = (element: Element) => (selector: string) =>
  pipe(
    element.querySelector(selector),
    fromNullable,
    OflatMap(({ textContent }) => fromNullable(textContent)),
  )

const itemPropertyExtractorAll = (element: Element) => (selector: string) =>
  pipe(
    element.querySelectorAll(selector),
    (a) => [...a],
    Amap(({ textContent }) => fromNullable(textContent)),
    sequence(OApplicative),
  )

const getPubmedId = (identifiers: Array<string>) =>
  pipe(
    identifiers,
    Afilter(startsWith("pmid")),
    head,
    Omap(replace(/pmid:/, "")),
  )

const getItemProperties = (item: Element) =>
  pipe(
    item,
    Oof,
    ObindTo("_item"),
    Olet("getProperty", ({ _item }) => itemPropertyExtractor(_item)),
    Olet("getProperties", ({ _item }) => itemPropertyExtractorAll(_item)),
    Obind("title", ({ getProperty }) => getProperty("title")),
    Obind("publishDate", ({ getProperty }) => getProperty("date")),
    Obind("description", ({ getProperty }) => getProperty("description")),
    Obind("link", ({ getProperty }) => getProperty("link")),
    Obind("journal", ({ getProperty }) => getProperty("*|source")),
    Obind("authors", ({ getProperties }) => getProperties("*|creator")),
    Obind("identifiers", ({ getProperties }) => getProperties("*|identifier")),
    Obind("pubmedId", ({ identifiers }) => getPubmedId(identifiers)),
  )

const mapElementsToPublicationItems = (elements: Array<Element>) =>
  pipe(elements, Amap(getItemProperties), compact)

const useFetchPublications = (url: string) => {
  const [fetchState, setFetchState] = useState({
    loading: true,
    data: [] as Array<PublicationItem>,
    error: "",
  })
  useEffect(() => {
    let componentMounted = true
    const getPublicationItems = async () => {
      await pipe(
        url,
        createTaskEitherFetch,
        TEflatMap(parseResponseToString),
        TEmap(extractItems),
        TEmap(mapElementsToPublicationItems),
        TEmatch(
          (_error) => {
            if (componentMounted) {
              setFetchState((previousState) => ({
                ...previousState,
                error: _error,
                loading: false,
              }))
            }
            return constVoid
          },
          (a) => {
            if (componentMounted) {
              setFetchState((previousState) => ({
                ...previousState,
                data: a,
                loading: false,
              }))
            }
            return constVoid
          },
        ),
      )()
    }
    getPublicationItems()
    return () => {
      componentMounted = false
    }
  }, [url])
  return fetchState
}

export { type PublicationItem, useFetchPublications }
