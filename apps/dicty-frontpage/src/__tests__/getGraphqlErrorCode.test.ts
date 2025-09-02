import { test, expect } from "vitest"
import { getGraphqlErrorCode, mapCodeToMessage } from "../common/utils/getGraphqlErrorCode"
import { GraphQLError } from "graphql"

test("returns error code from GraphQL error extensions", () => {
  const graphqlErrors = [
    new GraphQLError("Test error", {
      extensions: { code: "VALIDATION_ERROR" }
    })
  ]

  expect(getGraphqlErrorCode(graphqlErrors)).toBe("VALIDATION_ERROR")
})

test("returns 'unexpected' when no extensions are present", () => {
  const graphqlErrors = [
    new GraphQLError("Test error without extensions")
  ]

  expect(getGraphqlErrorCode(graphqlErrors)).toBe("unexpected")
})

test("returns 'unexpected' when extensions are null", () => {
  const graphqlErrors = [
    new GraphQLError("Test error", {
      extensions: null
    })
  ]

  expect(getGraphqlErrorCode(graphqlErrors)).toBe("unexpected")
})

test("returns code from first error when multiple errors", () => {
  const graphqlErrors = [
    new GraphQLError("First error", {
      extensions: { code: "FIRST_ERROR" }
    }),
    new GraphQLError("Second error", {
      extensions: { code: "SECOND_ERROR" }
    })
  ]

  expect(getGraphqlErrorCode(graphqlErrors)).toBe("FIRST_ERROR")
})

test("mapCodeToMessage returns correct message for unexpected code", () => {
  expect(mapCodeToMessage("unexpected")).toBe("An unexpected error has occurred")
})

test("mapCodeToMessage returns undefined for unknown code", () => {
  expect(mapCodeToMessage("UNKNOWN_CODE")).toBeUndefined()
})