import { URLSearchParamsInit } from "react-router-dom"

/**
 * @typedef inputProps - The props type for state that keep tracks of user inputs.
 */
export interface inputProps {
  /** user input that gets reset after switching options  */
  user: string
  /** copy of user input that does not gets reset */
  userCopy: string
}

/**
 * @typedef AllStringObj - An object with key and value are of string type
 */
export interface AllStringObj {
  [index: string]: string
}

/**
 * @typedef SetURLSearchParams - Type definition for react-router function that
 * modify the query string of the URL
 */
export type SetURLSearchParams = (
  nextInit: URLSearchParamsInit,
  navigateOptions?:
    | {
        replace?: boolean | undefined
        state?: any
      }
    | undefined,
) => void
