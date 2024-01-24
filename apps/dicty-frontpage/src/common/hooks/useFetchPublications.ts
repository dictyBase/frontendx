import { useState, useEffect } from "react"
import { pipe, flow } from "fp-ts/function"
import {
  type TaskEither,
  map as TEmap,
  match as TEmatch,
  tryCatch as TEtryCatch,
} from "fp-ts/TaskEither"
import { type Either, left as Eleft, right as Eright } from "fp-ts/Either"

const RSS_URL =
  "https://pubmed.ncbi.nlm.nih.gov/rss/search/1xSjLNP-2lGAmjK0hZKzE4pxRxyAAh7BAEFNc5kyVReacTxspv/?limit=15&utm_campaign=pubmed-2&fc=20231211102630"

/**
 * A function whose return function fetches a resource from a given URL using the TaskEither monad.
 *
 * https://gcanti.github.io/fp-ts/modules/TaskEither.ts.html
 *
 * @param url - The URL of the resource to fetch.
 * @returns A TaskEither that represents the asynchronous fetch operation.
 */
const createFetchTaskEither = (url: string): TaskEither<string, Response> =>
  pipe(
    TEtryCatch(
      () => fetch(url),
      (reason) => reason,
    ),
    TEmatch(
      (error) => Eleft(`${error}`),
      (response) =>
        response.status === 200
          ? Eright(response)
          : Eleft(`HTTP Error ${response.status}: ${response.statusText}`),
    ),
  )

const useFetchPublication = (url: string) => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState({})

  useEffect(() => {
    const getPublicationItems = async () => {
      const dataOrError = pipe(url, createFetchTaskEither)
    }
  })
}

export { createFetchTaskEither as fetchTaskEither }
