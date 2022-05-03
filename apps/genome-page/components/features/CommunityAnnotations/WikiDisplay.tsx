// group of functions that maps the markdown content/error to the corresponding react component
import * as E from "fp-ts/Either"
import * as F from "fp-ts-std/Function"
import ReactMarkDown from "react-markdown"

interface WikiContentProps {
  markdown?: string
  loading: boolean
}

// type for Either monad
export type WikiContentEither = E.Either<string, WikiContentProps>

// predicate function that checks is the fetching is under process
const isLoading = (ma: WikiContentEither) => E.isRight(ma) && ma.right.loading

// predicate function to indicate if the fetching is completed
const isNotLoading = (ma: WikiContentEither) =>
  E.isRight(ma) && !ma.right.loading

// react component for loading state
const loaderDisplay = () => <h1>Loading....</h1>

// react component for error display
const errDisplay = (ma: WikiContentEither) =>
  E.isLeft(ma) && <h2>error {ma.left}</h2>

// react component for display markdown content
const nameDisplay = (ma: WikiContentEither) =>
  E.isRight(ma) && <ReactMarkDown>{ma.right.markdown as string}</ReactMarkDown>

// react component when something unexpected happened
const defaultDisplay = () => <h2>Not sure what happened</h2>

// this function maps three conditions, error,success or loading to a react component
export const toOutput = F.guard([
  [isLoading, loaderDisplay],
  [E.isLeft, errDisplay],
  [isNotLoading, nameDisplay],
])(defaultDisplay)
