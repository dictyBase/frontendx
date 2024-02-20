import { useState, useEffect } from "react"
import { pipe, constVoid } from "fp-ts/function"
import { match as TEmatch } from "fp-ts/TaskEither"
import { empty as Sempty } from "fp-ts/lib/string"
import { match } from "ts-pattern"
import { getPublicationData } from "../utils/getPublicationData"

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
        getPublicationData(url),
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
