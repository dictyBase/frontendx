// group of functions that maps the markdown content/error to the corresponding react component
import * as E from "fp-ts/Either"
import { guard } from "fp-ts-std/Function"
import { WikiContainer } from "../../components/features/CommunityAnnotations/WikiContainer"
import { WikiLoader } from "../../components/features/CommunityAnnotations/WikiLoader"

interface WikiContentProperties {
  markdown?: string
  loading: boolean
}

// type for Either monad
export type WikiContentEither = E.Either<string, WikiContentProperties>

// predicate function that checks is the fetching is under process
const isLoading = (ma: WikiContentEither) => E.isRight(ma) && ma.right.loading

// predicate function to indicate if the fetching is completed
const isNotLoading = (ma: WikiContentEither) =>
  E.isRight(ma) && !ma.right.loading

// react component for loading state
const loaderDisplay = () => <WikiLoader />

// react component for error display
const errorDisplay = (ma: WikiContentEither) =>
  E.isLeft(ma) && <WikiContainer />

// react component for display markdown content
const nameDisplay = (ma: WikiContentEither) =>
  E.isRight(ma) && <WikiContainer markdown={ma.right.markdown as string} />

// react component when something unexpected happened
const defaultDisplay = () => <h2>Not sure what happened</h2>

// this function maps three conditions, error,success or loading to a react component
export const toOutput = guard([
  [isLoading, loaderDisplay],
  [E.isLeft, errorDisplay],
  [isNotLoading, nameDisplay],
])(defaultDisplay)
