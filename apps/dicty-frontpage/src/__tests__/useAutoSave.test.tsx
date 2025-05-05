import { vi, test, expect, describe, beforeEach, afterEach } from "vitest"
import { renderHook, act } from "@testing-library/react-hooks"
import { EditorState } from "lexical"
import { useAuthorizedUpdateContentWithStates } from "../common/hooks/useAuthorizedUpdateContentWithStates"
import { useAutoSave } from "../common/hooks/useAutoSave"

// Mock the dependencies
vi.mock("../common/hooks/useAuthorizedUpdateContentWithStates", () => ({
  useAuthorizedUpdateContentWithStates: vi.fn(),
}))

describe("useAutoSave", () => {
  // Test configuration
  const contentId = "test-content-id"
  const mockEditorState = { toJSON: vi.fn() } as unknown as EditorState

  // Mock functions and data
  const mockAuthorizedUpdateContent = vi.fn()
  const mockReset = vi.fn()
  let mockHookResult: any

  beforeEach(() => {
    vi.clearAllMocks()

    // Setup mock editor state
    mockEditorState.toJSON.mockReturnValue({
      root: { children: [{ text: "test content" }] },
    })

    // Setup mock authorized update content with states
    mockHookResult = {
      loading: false,
      error: undefined,
      data: undefined,
      reset: mockReset,
    }

    vi.mocked(useAuthorizedUpdateContentWithStates).mockReturnValue([
      mockAuthorizedUpdateContent,
      mockHookResult,
    ])

    // Setup timers for debounce testing
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  test("returns a handler function and state object", () => {
    const { result } = renderHook(() => useAutoSave({ contentId }))

    // Check return structure
    expect(Array.isArray(result.current)).toBe(true)
    expect(result.current.length).toBe(2)
    expect(typeof result.current[0]).toBe("function")
    expect(typeof result.current[1]).toBe("object")

    // Check state object properties
    const stateObject = result.current[1]
    expect(stateObject).toHaveProperty("waiting")
    expect(stateObject).toHaveProperty("loading")
    expect(stateObject).toHaveProperty("error")
    expect(stateObject).toHaveProperty("data")
  })

  test("sets waiting state to true when handleChange is called", () => {
    const { result } = renderHook(() => useAutoSave({ contentId }))

    // Get the handler function
    const handleChange = result.current[0]

    // Call the handler
    act(() => {
      handleChange(mockEditorState)
    })

    // Check waiting state is true
    expect(result.current[1].waiting).toBe(true)
  })

  test("calls authorizedUpdateContent after debounce delay", async () => {
    const { result } = renderHook(() => useAutoSave({ contentId }))

    // Get the handler function
    const handleChange = result.current[0]

    // Call the handler
    act(() => {
      handleChange(mockEditorState)
    })

    // Check that reset was called
    expect(mockReset).toHaveBeenCalled()

    // Fast-forward timer to trigger the save
    await act(async () => {
      vi.advanceTimersByTime(1000)
    })

    // Check that authorizedUpdateContent was called with the stringified editor state
    expect(mockAuthorizedUpdateContent).toHaveBeenCalledWith(
      JSON.stringify(mockEditorState.toJSON()),
    )

    // Check that waiting state is false
    expect(result.current[1].waiting).toBe(false)
  })

  test("debounces multiple calls to handleChange", async () => {
    const { result } = renderHook(() => useAutoSave({ contentId }))
    const handleChange = result.current[0]

    // Call handler multiple times in quick succession
    act(() => {
      handleChange(mockEditorState)
    })

    // Check reset called once
    expect(mockReset).toHaveBeenCalledTimes(1)

    // Call again quickly
    act(() => {
      handleChange(mockEditorState)
    })

    // Check reset called twice (once per handleChange call)
    expect(mockReset).toHaveBeenCalledTimes(2)

    // Fast-forward timer halfway - nothing should happen yet
    await act(async () => {
      vi.advanceTimersByTime(500)
    })

    // Verify authorizedUpdateContent not called yet
    expect(mockAuthorizedUpdateContent).not.toHaveBeenCalled()

    // Fast-forward timer to completion - only ONE authorizedUpdateContent call should happen
    await act(async () => {
      vi.advanceTimersByTime(500) // Total time: 1000ms
    })

    // Verify authorizedUpdateContent called exactly once
    expect(mockAuthorizedUpdateContent).toHaveBeenCalledTimes(1)
  })

  test("clears timeout on unmount", () => {
    // Setup spy on clearTimeout
    const clearTimeoutSpy = vi.spyOn(global, "clearTimeout")

    // Render the hook
    const { result, unmount } = renderHook(() => useAutoSave({ contentId }))

    // Call the handler to set a timeout
    act(() => {
      result.current[0](mockEditorState)
    })

    // Unmount to trigger cleanup
    unmount()

    // Verify clearTimeout was called
    expect(clearTimeoutSpy).toHaveBeenCalled()
  })

  test("exposes loading, error and data states from useAuthorizedUpdateContentWithStates", () => {
    // Setup mock result with specific states
    const mockData = { updateContent: { content: "updated content" } }
    const mockError = new Error("test error")

    mockHookResult.loading = true
    mockHookResult.error = mockError
    mockHookResult.data = mockData

    // Render the hook
    const { result } = renderHook(() => useAutoSave({ contentId }))

    // Check states are passed through correctly
    expect(result.current[1].loading).toBe(true)
    expect(result.current[1].error).toBe(mockError)
    expect(result.current[1].data).toBe(mockData)
  })
})

