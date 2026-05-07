import { test, expect } from "vitest"
import { ApolloError } from "@apollo/client"
import { hasNotFoundError } from "../utils/hasNotFoundError"

const NOT_FOUND_MESSAGE = "None found"

test("returns false if error argument is undefined", () => {
  expect(hasNotFoundError(undefined)).toBe(false)
})

test("returns false if ApolloError.graphQLErrors is empty", () => {
  const error = new ApolloError({
    graphQLErrors: [],
  })
  expect(hasNotFoundError(error)).toBe(false)
})

test("returns false if ApolloError has graphQLErrors without extensions", () => {
  const error = new ApolloError({
    graphQLErrors: [{ message: NOT_FOUND_MESSAGE }],
  })
  expect(hasNotFoundError(error)).toBe(false)
})

test("returns false if ApolloError has graphQLErrors with extension code other than `Not found`", () => {
  const error = new ApolloError({
    graphQLErrors: [
      { extensions: { code: "Invalid" }, message: "Invalid Request" },
    ],
  })
  expect(hasNotFoundError(error)).toBe(false)
})

test("returns true if ApolloError has graphQLErrors with extension code `NotFound`", () => {
  const error = new ApolloError({
    graphQLErrors: [
      { extensions: { code: "NotFound" }, message: NOT_FOUND_MESSAGE },
    ],
  })
  expect(hasNotFoundError(error)).toBe(true)
})
