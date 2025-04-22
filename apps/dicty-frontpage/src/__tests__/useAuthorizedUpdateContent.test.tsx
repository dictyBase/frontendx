import { vi, test, expect, beforeEach, describe, afterEach } from "vitest"
import { renderHook } from "@testing-library/react-hooks"
import { left, right } from "fp-ts/Either"

// Import the actual mocked modules to set up mock implementations
import { useLogto } from "@logto/react"
import { useUpdateContentMutation } from "dicty-graphql-schema"
import { useAuthorizedUpdateContent } from "../common/hooks/useAuthorizedUpdateContent"

const UPDATE_ERROR_MESSAGE = "Could not update content"
const USER_ERROR_MESSAGE = "Could not get user info"

// Mock the @logto/react module
vi.mock("@logto/react", () => ({
  useLogto: vi.fn(),
}))

// Mock the dicty-graphql-schema module
vi.mock("dicty-graphql-schema", () => ({
  useUpdateContentMutation: vi.fn(),
}))

describe("useAuthorizedUpdateContent", () => {
  // Set up our basic mock values
  const contentId = "test-content-id"
  const contentValue = "test-content-value"

  // Mock implementations
  const mockFetchUserInfo = vi.fn()
  const mockGetAccessToken = vi.fn()
  const mockUpdateContent = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    // Default successful implementation
    mockFetchUserInfo.mockResolvedValue({
      email: "test@example.com",
    })
    mockGetAccessToken.mockResolvedValue("mock-access-token")
    mockUpdateContent.mockResolvedValue({
      data: { updateContent: { id: contentId } },
    })

    // Set up mocks for Logto and UpdateContentMutation
    // @ts-ignore
    vi.mocked(useLogto).mockReturnValue({
      getAccessToken: mockGetAccessToken,
      fetchUserInfo: mockFetchUserInfo,
    })

    vi.mocked(useUpdateContentMutation).mockReturnValue([
      mockUpdateContent,
    ] as any)

    // Mock environment variable
    vi.stubEnv("VITE_APP_LOGTO_API_SECOND_RESOURCE", "test-resource")
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  test("returns a function that updates content successfully", async () => {
    const { result } = renderHook(() => useAuthorizedUpdateContent(contentId))

    // Get the returned function
    const updateFunction = result.current

    // Call the function
    const updateResult = await updateFunction(contentValue)

    // Verify the result is on the Right path (success)
    expect(updateResult).toEqual(right({ updateContent: { id: contentId } }))

    // Verify all dependencies were called with expected arguments
    expect(mockFetchUserInfo).toHaveBeenCalled()
    expect(mockGetAccessToken).toHaveBeenCalledWith("test-resource")
    expect(mockUpdateContent).toHaveBeenCalledWith({
      variables: {
        input: {
          id: contentId,
          content: contentValue,
          updated_by: "test@example.com",
        },
      },
      context: { headers: { Authorization: "Bearer mock-access-token" } },
    })
  })

  test("returns USER_INFO_ERROR when fetchUserInfo fails", async () => {
    // Make fetchUserInfo throw an error
    mockFetchUserInfo.mockRejectedValueOnce(
      new Error("Failed to fetch user info"),
    )

    const { result } = renderHook(() => useAuthorizedUpdateContent(contentId))
    const updateFunction = result.current

    const updateResult = await updateFunction(contentValue)

    // Verify we got the expected error
    expect(updateResult).toEqual(
      left({
        errorType: 1, // USER_INFO_ERROR
        message: USER_ERROR_MESSAGE,
      }),
    )

    // Verify we did call fetchUserInfo
    expect(mockFetchUserInfo).toHaveBeenCalled()
    // But we didn't call the other functions
    expect(mockUpdateContent).not.toHaveBeenCalled()
  })

  test("returns USER_INFO_ERROR when userInfo is null", async () => {
    // Return null from fetchUserInfo
    mockFetchUserInfo.mockResolvedValueOnce(undefined)

    const { result } = renderHook(() => useAuthorizedUpdateContent(contentId))
    const updateFunction = result.current

    const updateResult = await updateFunction(contentValue)

    // Verify we got the expected error
    expect(updateResult).toEqual(
      left({
        errorType: 1, // USER_INFO_ERROR
        message: USER_ERROR_MESSAGE,
      }),
    )
  })

  test("returns USER_INFO_ERROR when userInfo has no email", async () => {
    // Return user info without email
    mockFetchUserInfo.mockResolvedValueOnce({ name: "Test User" })

    const { result } = renderHook(() => useAuthorizedUpdateContent(contentId))
    const updateFunction = result.current

    const updateResult = await updateFunction(contentValue)

    // Verify we got the expected error
    expect(updateResult).toEqual(
      left({
        errorType: 1, // USER_INFO_ERROR
        message: USER_ERROR_MESSAGE,
      }),
    )
  })

  test("returns ACCESS_TOKEN_ERROR when getAccessToken fails", async () => {
    // Make getAccessToken throw an error
    mockGetAccessToken.mockRejectedValueOnce(
      new Error("Failed to get access token"),
    )

    const { result } = renderHook(() => useAuthorizedUpdateContent(contentId))
    const updateFunction = result.current

    const updateResult = await updateFunction(contentValue)

    // Verify we got the expected error
    expect(updateResult).toEqual(
      left({
        errorType: 0, // ACCESS_TOKEN_ERROR
        message: "Could not get access token",
      }),
    )

    // Verify we did call fetchUserInfo but not updateContent
    expect(mockFetchUserInfo).toHaveBeenCalled()
    expect(mockUpdateContent).not.toHaveBeenCalled()
  })

  test("returns UPDATE_FAILURE when updateContent throws an error", async () => {
    // Make updateContent throw an error
    mockUpdateContent.mockRejectedValueOnce(
      new Error("Failed to update content"),
    )

    const { result } = renderHook(() => useAuthorizedUpdateContent(contentId))
    const updateFunction = result.current

    const updateResult = await updateFunction(contentValue)

    // Verify we got the expected error
    expect(updateResult).toEqual(
      left({
        errorType: 2, // UPDATE_FAILURE
        message: UPDATE_ERROR_MESSAGE,
      }),
    )

    // Verify we did call fetchUserInfo and getAccessToken
    expect(mockFetchUserInfo).toHaveBeenCalled()
    expect(mockGetAccessToken).toHaveBeenCalled()
    expect(mockUpdateContent).toHaveBeenCalled()
  })

  test("returns UPDATE_FAILURE when updateContent response has no data", async () => {
    // Make updateContent return a response without data
    mockUpdateContent.mockResolvedValueOnce({})

    const { result } = renderHook(() => useAuthorizedUpdateContent(contentId))
    const updateFunction = result.current

    const updateResult = await updateFunction(contentValue)

    // Verify we got the expected error
    expect(updateResult).toEqual(
      left({
        errorType: 2, // UPDATE_FAILURE
        message: UPDATE_ERROR_MESSAGE,
      }),
    )
  })

  test("returns UPDATE_FAILURE when update succeeds but data is null", async () => {
    // Make updateContent return undefined data
    mockUpdateContent.mockResolvedValueOnce({
      data: undefined,
    })

    const { result } = renderHook(() => useAuthorizedUpdateContent(contentId))
    const updateFunction = result.current

    const updateResult = await updateFunction(contentValue)

    // Verify we got the expected error
    expect(updateResult).toEqual(
      left({
        errorType: 2, // UPDATE_FAILURE
        message: UPDATE_ERROR_MESSAGE,
      }),
    )
  })
})

