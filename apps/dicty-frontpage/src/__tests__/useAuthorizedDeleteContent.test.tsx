import { test, expect, vi } from "vitest"
import { renderHook } from "@testing-library/react-hooks"
import { MockedProvider } from "@apollo/client/testing"
import { some, none } from "fp-ts/Option"
import { Left } from "fp-ts/Either"
import { useAuthorizedDeleteContent } from "../common/hooks/useAuthorizedDeleteContent"
import { ContentError } from "../common/constants/types"

const testContentId = "test-content-id"
// Mock Logto
const mockGetAccessToken = vi.fn()
vi.mock("@logto/react", () => ({
  useLogto: () => ({
    getAccessToken: mockGetAccessToken,
  }),
}))

const mockDeleteContentMutation = vi.fn()
vi.mock("dicty-graphql-schema", async () => {
  const actual = await vi.importActual("dicty-graphql-schema")
  return {
    ...actual,
    useDeleteContentMutation: () => [mockDeleteContentMutation],
  }
})

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MockedProvider>{children}</MockedProvider>
)

test("successfully deletes content with valid contentId and token", async () => {
  const contentId = some(testContentId)
  const mockToken = "mock-access-token"
  const mockDeleteResult = {
    data: { deleteContent: { id: testContentId } },
  }

  mockGetAccessToken.mockResolvedValue(mockToken)
  mockDeleteContentMutation.mockResolvedValue(mockDeleteResult)

  const { result } = renderHook(() => useAuthorizedDeleteContent(contentId), {
    wrapper,
  })

  const deleteFunction = result.current
  const taskEither = await deleteFunction()

  expect(taskEither._tag).toBe("Right")
  expect(mockGetAccessToken).toHaveBeenCalledWith(
    import.meta.env.VITE_APP_LOGTO_API_SECOND_RESOURCE,
  )
  expect(mockDeleteContentMutation).toHaveBeenCalledWith({
    variables: { id: testContentId },
    context: { headers: { Authorization: "Bearer mock-access-token" } },
  })
})

test("returns error when contentId is None", async () => {
  const contentId = none

  const { result } = renderHook(() => useAuthorizedDeleteContent(contentId), {
    wrapper,
  })

  const deleteFunction = result.current
  const taskEither = (await deleteFunction()) as Left<ContentError>

  expect(taskEither._tag).toBe("Left")
  expect(taskEither.left.message).toBe("Content ID missing")
})

test("returns error when getAccessToken fails", async () => {
  const contentId = some(testContentId)

  mockGetAccessToken.mockRejectedValue(new Error("Token error"))

  const { result } = renderHook(() => useAuthorizedDeleteContent(contentId), {
    wrapper,
  })

  const deleteFunction = result.current
  const taskEither = (await deleteFunction()) as Left<ContentError>

  expect(taskEither._tag).toBe("Left")
  expect(taskEither.left.message).toBe("Could not get access token")
})

test("returns error when deleteContent mutation fails", async () => {
  const contentId = some(testContentId)
  const mockToken = "mock-access-token"

  mockGetAccessToken.mockResolvedValue(mockToken)
  mockDeleteContentMutation.mockRejectedValue(new Error("Delete failed"))

  const { result } = renderHook(() => useAuthorizedDeleteContent(contentId), {
    wrapper,
  })

  const deleteFunction = result.current
  const taskEither = (await deleteFunction()) as Left<ContentError>

  expect(taskEither._tag).toBe("Left")
  expect(taskEither.left.message).toBe("Could not delete content")
})
