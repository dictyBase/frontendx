/* eslint-disable unicorn/prefer-query-selector */
import { useState, useEffect } from "react"
import { pipe, flow } from "fp-ts/function"
import { type Task, map as Tmap } from "fp-ts/Task"
import {
  fromNullable,
  getOrElse as OgetOrElse,
  map as Omap,
} from "fp-ts/Option"
import { map as Amap } from "fp-ts/Array"
import {
  type TaskEither,
  of as TEof,
  map as TEmap,
  match as TEmatch,
  tryCatch as TEtryCatch,
  chain as TEchain,
  getOrElse as TEgetOrElse,
  tap as TEtap,
  tapError as TEtapError,
  left as TEleft,
  right as TEright,
} from "fp-ts/TaskEither"
import { type Either, left as Eleft, right as Eright } from "fp-ts/Either"

const RSS_URL =
  "https://pubmed.ncbi.nlm.nih.gov/rss/search/1xSjLNP-2lGAmjK0hZKzE4pxRxyAAh7BAEFNc5kyVReacTxspv/?limit=15&utm_campaign=pubmed-2&fc=20231211102630"

type PublicationItem = {
  title: string
  authors: Array<string>
  description: string
  publishDate: string
  link: string
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
          : Eleft(`HTTP Error ${response.status}: ${response.statusText}`),
    ),
  )

const parseRSSResponse = (response: Response) =>
  pipe(
    TEtryCatch(
      () => response.text(),
      (reason) => `${reason}`,
    ),
  )

const resolveQuerySelector = flow(
  fromNullable<Element | null>,
  Omap(({ innerHTML }) => innerHTML),
  OgetOrElse(() => ""),
)

const resolveQuerySelectorAll = flow(
  (a: HTMLCollectionOf<Element>) => [...a],
  Amap(({ innerHTML }) => innerHTML),
)

const extractPublicationItems = (xmlString: string): Array<PublicationItem> =>
  pipe(
    xmlString,
    (a) => new window.DOMParser().parseFromString(a, "text/xml"),
    (b) => b.querySelectorAll("item"),
    (c) => [...c],
    Amap((fa) => ({
      title: pipe(fa.querySelector("title"), resolveQuerySelector),
      authors: pipe(
        fa.getElementsByTagName("dc:creator"),
        resolveQuerySelectorAll,
      ),
      description: pipe(fa.querySelector("description"), resolveQuerySelector),
      publishDate: pipe(fa.querySelector("date"), resolveQuerySelector),
      link: pipe(fa.querySelector("link"), resolveQuerySelector),
    })),
  )

const useFetchPublications = (url: string) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Array<PublicationItem>>([])
  const [error, setError] = useState("")

  useEffect(() => {
    const getPublicationItems = async () => {
      await pipe(
        url,
        createTaskEitherFetch,
        TEchain(parseRSSResponse),
        TEmap(extractPublicationItems),
        TEtapError((e) => {
          setError(e)
          return TEleft(e)
        }),
        TEtap((a) => {
          setData(a)
          return TEright(a)
        }),
      )()
    }
  })
}

// pipe(
//   RSS_URL,
//   createTaskEitherFetch,
//   TEchain(parseRSSResponse),
//   TEmap(extractPublicationItems),
// )().then((a) => console.log(a))

export { useFetchPublications }
