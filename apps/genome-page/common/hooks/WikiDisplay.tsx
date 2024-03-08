// group of functions that maps the markdown content/error to the corresponding react component
import {
  type Either,
  isRight as EisRight,
  isLeft as EisLeft,
} from "fp-ts/Either"
import { guard } from "fp-ts-std/Function"
import { WikiContainer } from "../../components/features/CommunityAnnotations/WikiContainer"
import { WikiLoader } from "../../components/features/CommunityAnnotations/WikiLoader"

interface WikiContentProperties {
  markdown?: string
  loading: boolean
}

// type for Either monad
export type WikiContentEither = Either<string, WikiContentProperties>

// predicate function that checks is the fetching is under process
const isLoading = (ma: WikiContentEither) => EisRight(ma) && ma.right.loading

// predicate function to indicate if the fetching is completed
const isNotLoading = (ma: WikiContentEither) =>
  EisRight(ma) && !ma.right.loading

// react component for loading state
const loaderDisplay = () => <WikiLoader />

// react component for error display
const errorDisplay = (ma: WikiContentEither) => EisLeft(ma) && <WikiContainer />

// react component for display markdown content
const nameDisplay = (ma: WikiContentEither) =>
  EisRight(ma) && <WikiContainer markdown={ma.right.markdown as string} />

// react component when something unexpected happened
const defaultDisplay = () => <h2>Not sure what happened</h2>

// this function maps three conditions, error,success or loading to a react component
export const toOutput = guard([
  [isLoading, loaderDisplay],
  [EisLeft, errorDisplay],
  [isNotLoading, nameDisplay],
])(defaultDisplay)
