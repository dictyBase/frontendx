import { useState, useEffect } from "react"
import { pipe, constVoid } from "fp-ts/function"
import {
  of as Oof,
  fromNullable as OfromNullable,
  Applicative as OApplicative,
  flatMap as OflatMap,
  map as Omap,
  let as Olet,
  bind as Obind,
  bindTo as ObindTo,
} from "fp-ts/Option"
import {
  map as Amap,
  sequence as Asequence,
  filter as Afilter,
  head as Ahead,
  compact as Acompact,
} from "fp-ts/Array"
import {
  type NonEmptyArray,
  fromArray as NEAfromArray,
  filter as NEAfilter,
  map as NEAmap,
  sequence as NEAsequence,
} from "fp-ts/NonEmptyArray"
import {
  Do as TEDo,
  bind as TEbind,
  let as TElet,
  type TaskEither,
  match as TEmatch,
  tryCatch as TEtryCatch,
  filterOrElse as TEfilterOrElse,
  fromOption as TEfromOption,
} from "fp-ts/TaskEither"
import {
  startsWith as SstartsWith,
  replace as Sreplace,
  empty as Sempty,
} from "fp-ts/lib/string"
import { match } from "ts-pattern"

type PublicationItem = {
  publishDate: string
  title: string
  authors: Array<string>
  abstract: string
  link: string
  journal: string
  identifiers: Array<string>
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
      (toError) => `${toError}`,
    ),
    TEfilterOrElse(
      (response) => response.status === 200,
      (response) =>
        `Invalid Response. HTTP Code ${response.status}: ${response.statusText}`,
    ),
  )

const parseResponseToString = (response: Response) =>
  pipe(
    TEtryCatch(
      () => response.text(),
      (toError) => `${toError}`,
    ),
  )

const extractItems = (xmlString: string) =>
  pipe(
    [
      ...new window.DOMParser()
        .parseFromString(xmlString, "text/xml")
        .querySelectorAll("item"),
    ],
    NEAfromArray,
    TEfromOption(() => "No Publication Items found."),
  )

const itemPropertyExtractor = (element: Element) => (selector: string) =>
  pipe(
    element.querySelector(selector),
    OfromNullable,
    OflatMap(({ textContent }) => OfromNullable(textContent)),
  )

const itemPropertyExtractorAll = (element: Element) => (selector: string) =>
  pipe(
    [...element.querySelectorAll(selector)],
    Amap(({ textContent }) => OfromNullable(textContent)),
    Asequence(OApplicative),
  )

// const itemPropertyExtractorAll = (element: Element) => (selector: string) =>
//   pipe(
//     [...element.querySelectorAll(selector)],
//     Oof,
//     ObindTo("Aelement"),
//     Obind("NEAelement", ({ Aelement }) => NEAfromArray(Aelement)),
//     Obind("NEAtextContent", ({ NEAelement }) =>
//       pipe(
//         NEAelement,
//         NEAmap(({ textContent }) => OfromNullable(textContent)),
//         NEAsequence(OApplicative),
//       ),
//     ),
//     Omap(({ NEAtextContent }) => NEAtextContent),
//   )

const getPubmedId = (identifiers: Array<string>) =>
  pipe(
    identifiers,
    Afilter(SstartsWith("pmid")),
    Ahead,
    Omap(Sreplace(/pmid:/, Sempty)),
  )

const getItemProperties = (itemElement: Element) =>
  pipe(
    itemElement,
    Oof,
    ObindTo("item"),
    Olet("getProperty", ({ item }) => itemPropertyExtractor(item)),
    Olet("getProperties", ({ item }) => itemPropertyExtractorAll(item)),
    Obind("title", ({ getProperty }) => getProperty("title")),
    Obind("publishDate", ({ getProperty }) => getProperty("date")),
    Obind("abstract", ({ getProperty }) => getProperty("description")),
    Obind("link", ({ getProperty }) => getProperty("link")),
    Obind("journal", ({ getProperty }) => getProperty("*|source")),
    Obind("authors", ({ getProperties }) => getProperties("*|creator")),
    Obind("identifiers", ({ getProperties }) => getProperties("*|identifier")),
    Obind("pubmedId", ({ identifiers }) => getPubmedId(identifiers)),
  )

const mapElementsToPublicationItems = (elements: Array<Element>) =>
  pipe(elements, Amap(getItemProperties), Acompact)

const useFetchPublications = (url: string) => {
  const [fetchState, setFetchState] = useState({
    loading: true,
    data: [] as Array<PublicationItem>,
    error: Sempty,
  })
  useEffect(() => {
    let componentMounted = true
    const getPublicationItems = async () => {
      await pipe(
        TEDo,
        TEbind("response", () => createTaskEitherFetch(url)),
        TEbind("xmlString", ({ response }) => parseResponseToString(response)),
        TEbind("itemElements", ({ xmlString }) => extractItems(xmlString)),
        TElet("publicationItems", ({ itemElements }) =>
          mapElementsToPublicationItems(itemElements),
        ),
        TEmatch(
          (errorString) => {
            match(componentMounted)
              .with(false, () => constVoid)
              .with(true, () => {
                setFetchState((previousState) => ({
                  ...previousState,
                  error: errorString,
                  loading: false,
                }))
                return constVoid
              })
              .exhaustive()
          },
          ({ publicationItems }) => {
            match(componentMounted)
              .with(false, () => constVoid)
              .with(true, () => {
                setFetchState((previousState) => ({
                  ...previousState,
                  data: publicationItems,
                  loading: false,
                }))
                return constVoid
              })
              .exhaustive()
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
