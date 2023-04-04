/* eslint-disable no-underscore-dangle */
/* export const URI = "SelectState"
export type URI = typeof URI
declare module "fp-ts/HKT" {
  interface URItoKind2<E, A> {
    SelectState: SelectState<E, A>
  }
} */

type Loading = { _tag: "Loading" }
type Error<E> = { _tag: "Error"; value: E }
type Success<A> = { _tag: "Success"; value: A }
type SelectState<E, A> = Loading | Error<E> | Success<A>

const error = <E = never, A = never>(xerror: E): SelectState<E, A> => ({
  _tag: "Error",
  value: xerror,
})
const success = <E = never, A = never>(value: A): SelectState<E, A> => ({
  _tag: "Success",
  value,
})
const loading = (): SelectState<never, never> => ({ _tag: "Loading" })

const isError = <E>(data: SelectState<E, unknown>): data is Error<E> =>
  data._tag === "Error"
const isSuccess = <A>(data: SelectState<unknown, A>): data is Success<A> =>
  data._tag === "Success"
const isLoading = (data: SelectState<unknown, unknown>): data is Loading =>
  data._tag === "Loading"

const fold =
  <E, A, B>(
    onLoading: () => B,
    onError: (error: E) => B,
    onSuccess: (value: A) => B,
  ) =>
  (ma: SelectState<E, A>): B => {
    switch (ma._tag) {
      case "Loading":
        return onLoading()
      case "Error":
        return onError(ma.value)
      default:
        return onSuccess(ma.value)
    }
  }

export {
  error,
  success,
  loading,
  isError,
  isLoading,
  isSuccess,
  fold,
  fold as match,
  type SelectState,
}
