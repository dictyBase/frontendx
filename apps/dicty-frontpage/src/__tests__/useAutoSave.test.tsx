import { vi, test, expect, describe, beforeEach, afterEach } from "vitest"
import { renderHook, act } from "@testing-library/react-hooks"
import { left, right } from "fp-ts/Either"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAutoSave } from "../common/hooks/useAutoSave"
import {
  updateFailureError,
  useAuthorizedUpdateContent,
} from "../common/hooks/useAuthorizedUpdateContent"

// Import the mocked modules

// Mock the dependencies
vi.mock("@lexical/react/LexicalComposerContext", () => ({
  useLexicalComposerContext: vi.fn(),
}))

vi.mock("../common/hooks/useAuthorizedUpdateContent", () => ({
  useAuthorizedUpdateContent: vi.fn(),
  updateFailureError: {
    errorType: 2,
    message: "Could not update content",
  },
}))

describe("useAutoSave", () => {
  // Test configuration
  const contentId = "test-content-id"
  const saveInterval = 1000 // 1 second for faster tests
  // We'll get the actual contentValue from the mocked JSON.stringify

  // Mock functions
  const mockOnError = vi.fn()
  const mockOnSuccess = vi.fn()
  const mockAuthorizedUpdateContent = vi.fn()
  const mockGetEditorState = vi.fn()
  const mockToJSON = vi.fn()
  const mockStringify = vi.spyOn(JSON, "stringify")

  beforeEach(() => {
    vi.clearAllMocks()

    // Setup mock editor
    mockToJSON.mockReturnValue({ editorState: "test-content" })
    mockGetEditorState.mockReturnValue({ toJSON: mockToJSON })
    vi.mocked(useLexicalComposerContext).mockReturnValue([
      { getEditorState: mockGetEditorState },
    ] as any)

    // Setup mock authorized update content
    vi.mocked(useAuthorizedUpdateContent).mockReturnValue(
      mockAuthorizedUpdateContent,
    )

    // Mock JSON.stringify
    mockStringify.mockReturnValue('{"editorState":"test-content"}')

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

  test("clears interval on unmount", async () => {
    // Setup spy on clearInterval
    const clearIntervalSpy = vi.spyOn(global, "clearInterval")

    // Render the hook
    const { unmount } = renderHook(() =>
      useAutoSave({
        contentId,
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
