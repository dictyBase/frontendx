import { useState, useEffect } from "react"
import { pipe, constVoid } from "fp-ts/function"
import {
  of as Oof,
  Do as ODo,
  bind as Obind,
  fromNullable,
  getOrElse as OgetOrElse,
  map as Omap,
  Applicative as OApplicative,
} from "fp-ts/Option"
import { map as Amap, sequence } from "fp-ts/Array"
import {
  type TaskEither,
  map as TEmap,
  match as TEmatch,
  tryCatch as TEtryCatch,
  flatMap as TEflatMap,
} from "fp-ts/TaskEither"
import { left as Eleft, right as Eright } from "fp-ts/Either"

type PublicationItem = {
  readonly title: string
  readonly authors: Array<string>
  readonly description: string
  readonly publishDate: string
  readonly link: string
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

const getInnerHTML = (element: Element | null) =>
  pipe(
    element,
    fromNullable,
    Omap(({ textContent }) => textContent),
  )

const getElementsByTagName = (authors: HTMLCollectionOf<Element>) =>
  pipe(
    authors,
    (a) => [...a],
    Amap(({ textContent }) => Oof(textContent)),
  )

const getItemProperties = (item: Element) =>
  pipe(
    ODo,
    Obind("title", () => getInnerHTML(item.querySelector("title"))),
    Obind("publishDate", () => getInnerHTML(item.querySelector("date"))),
    Obind("link", () => getInnerHTML(item.querySelector("link"))),
    Obind("description", () => getInnerHTML(item.querySelector("description"))),
    Obind("authors", () =>
      // eslint-disable-next-line unicorn/prefer-query-selector
      Oof(getElementsByTagName(item.getElementsByTagName("dc:creator"))),
    ),
  )

const mapElementsToPublicationItems = (elements: Array<Element>) =>
  pipe(
    elements,
    Amap(getItemProperties),
    sequence(OApplicative),
    OgetOrElse(() => [] as Array<PublicationItem>),
  )

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
              }))
            }
            return constVoid
          },
          (a) => {
            if (componentMounted) {
              setFetchState((previousState) => ({
                ...previousState,
                data: a,
              }))
            }
            return constVoid
          },
        ),
      )()
      setFetchState((previousState) => ({
        ...previousState,
        loading: false,
      }))
    }
    getPublicationItems()
    return () => {
      componentMounted = false
    }
  }, [url])
  return fetchState
}

// pipe(
//   RSS_URL,
//   createTaskEitherFetch,
//   TEflatMap(parseResponseToString),
//   TEmap(extractPublicationItems),
// )().then((a) => console.log(a))

export { type PublicationItem, useFetchPublications }
