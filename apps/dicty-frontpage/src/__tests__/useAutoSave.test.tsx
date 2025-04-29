import { vi, test, expect, describe, beforeEach, afterEach } from "vitest"
import { renderHook, act } from "@testing-library/react-hooks"
import { left, right } from "fp-ts/Either"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { LazyQueryResultTuple } from "@apollo/client"
import {
  ContentBySlugQuery,
  ContentBySlugQueryResult,
  ContentBySlugQueryVariables,
  useContentBySlugLazyQuery,
} from "dicty-graphql-schema"
import { useAutoSave } from "../common/hooks/useAutoSave"
import { useAuthorizedUpdateContent } from "../common/hooks/useAuthorizedUpdateContent"
import { updateFailureError } from "../common/constants/types"
import {
  mockContentA,
  mockContentB,
  mockContentBySlugQueryData,
} from "../mocks/mockContent"

// Import the mocked modules
vi.mock("dicty-graphql-schema", () => ({
  useContentBySlugLazyQuery: vi.fn(() => [
    () => ({
      data: { contentBySlug: mockContentBySlugQueryData },
    }),
  ]),
}))

// Mock the dependencies
vi.mock("@lexical/react/LexicalComposerContext", () => ({
  useLexicalComposerContext: vi.fn(),
}))

vi.mock("../common/hooks/useAuthorizedUpdateContent", () => ({
  useAuthorizedUpdateContent: vi.fn(),
}))

describe("useAutoSave", () => {
  // Test configuration
  const contentId = "test-content-id"
  const contentSlug = "test-content"
  const saveInterval = 1000 // 1 second for faster tests
  // We'll get the actual contentValue from the mocked JSON.stringify

  // Mock functions
  const mockOnError = vi.fn()
  const mockOnSuccess = vi.fn()
  const mockAuthorizedUpdateContent = vi.fn()
  const mockGetEditorState = vi.fn()
  const mockToJSON = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    // Setup mock editor
    mockToJSON.mockReturnValue(JSON.parse(mockContentB))
    mockGetEditorState.mockReturnValue({ toJSON: mockToJSON })
    vi.mocked(useLexicalComposerContext).mockReturnValue([
      { getEditorState: mockGetEditorState },
    ] as any)

    // Setup mock authorized update content
    vi.mocked(useAuthorizedUpdateContent).mockReturnValue(
      mockAuthorizedUpdateContent,
    )

    // Setup timers
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  test("calls onSuccess when authorizedUpdateContent resolves with right", async () => {
    // Mock successful update
    mockAuthorizedUpdateContent.mockResolvedValue(right({ id: contentId }))

    // Render the hook
    renderHook(() =>
      useAutoSave({
        contentId,
        contentSlug,
        onError: mockOnError,
        onSuccess: mockOnSuccess,
        saveInterval,
      }),
    )

    // Fast-forward timer to trigger auto-save
    await act(async () => {
      vi.advanceTimersByTime(saveInterval)
    })

    // Verify behavior
    expect(mockAuthorizedUpdateContent).toHaveBeenCalled()
    expect(mockOnSuccess).toHaveBeenCalledTimes(1)
    expect(mockOnError).not.toHaveBeenCalled()
  })

  test("calls onError when authorizedUpdateContent resolves with left", async () => {
    // Mock failed update
    mockAuthorizedUpdateContent.mockResolvedValue(left(updateFailureError))

    // Render the hook
    renderHook(() =>
      useAutoSave({
        contentId,
        contentSlug,
        onError: mockOnError,
        onSuccess: mockOnSuccess,
        saveInterval,
      }),
    )

    // Fast-forward timer to trigger auto-save
    await act(async () => {
      vi.advanceTimersByTime(saveInterval)
    })

    // Verify behavior
    expect(mockAuthorizedUpdateContent).toHaveBeenCalled()
    expect(mockOnError).toHaveBeenCalledWith(updateFailureError)
    expect(mockOnSuccess).not.toHaveBeenCalled()
  })

  test("does not attempt to save content if it has not changed", async () => {
    mockAuthorizedUpdateContent.mockResolvedValue(left(updateFailureError))
    expect(vi.isMockFunction(useContentBySlugLazyQuery)).toBe(true)
    vi.mocked(useContentBySlugLazyQuery).mockReturnValue([
      () =>
        Promise.resolve({
          data: {
            contentBySlug: {
              content: mockContentA,
            } as ContentBySlugQuery,
          },
        } as ContentBySlugQueryResult),
      [] as unknown as ContentBySlugQueryResult,
    ] as LazyQueryResultTuple<ContentBySlugQuery, ContentBySlugQueryVariables>)
    // Render the hook
    renderHook(() =>
      useAutoSave({
        contentId,
        contentSlug,
        onError: mockOnError,
        onSuccess: mockOnSuccess,
        saveInterval,
      }),
    )

    // Fast-forward timer to trigger auto-save
    await act(async () => {
      vi.advanceTimersByTime(saveInterval)
    })

    // Verify behavior
    expect(mockAuthorizedUpdateContent).not.toHaveBeenCalled()
    expect(mockOnError).not.toHaveBeenCalled()
    expect(mockOnSuccess).not.toHaveBeenCalled()
  })

  test("clears interval on unmount", async () => {
    // Setup spy on clearInterval
    const clearIntervalSpy = vi.spyOn(global, "clearInterval")

    // Render the hook
    const { unmount } = renderHook(() =>
      useAutoSave({
        contentId,
        contentSlug,
        onError: mockOnError,
        onSuccess: mockOnSuccess,
        saveInterval,
      }),
    )

    // Unmount to trigger cleanup
    unmount()

    // Verify interval was cleared
    expect(clearIntervalSpy).toHaveBeenCalled()
  })

  test("auto-saves at regular intervals", async () => {
    // Mock successful update
    mockAuthorizedUpdateContent.mockResolvedValue(right({ id: contentId }))

    // Render the hook
    renderHook(() =>
      useAutoSave({
        contentId,
        contentSlug,
        onError: mockOnError,
        onSuccess: mockOnSuccess,
        saveInterval,
      }),
    )

    // Fast-forward timer multiple times
    await act(async () => {
      vi.advanceTimersByTime(saveInterval)
    })
    expect(mockAuthorizedUpdateContent).toHaveBeenCalledTimes(1)
    expect(mockOnSuccess).toHaveBeenCalledTimes(1)

    await act(async () => {
      vi.advanceTimersByTime(saveInterval)
    })
    expect(mockAuthorizedUpdateContent).toHaveBeenCalledTimes(2)
    expect(mockOnSuccess).toHaveBeenCalledTimes(2)

    await act(async () => {
      vi.advanceTimersByTime(saveInterval)
    })
    expect(mockAuthorizedUpdateContent).toHaveBeenCalledTimes(3)
    expect(mockOnSuccess).toHaveBeenCalledTimes(3)
  })
})
