import { renderHook, act } from "@testing-library/react-hooks"
import { useSearchStoreAtoms } from "../useSearchStoreWithAtom"

describe("manage input and tag states with atom", () => {
  const m = new Map()
  beforeEach(() => {
    const { result } = renderHook(() => useSearchStoreAtoms())
    m.set("result", result)
  })
  test("manage tag state", () => {
    const result = m.get("result")
    expect(result.current.tag).toBeFalsy()
    act(() => result.current.setTag(true))
    expect(result.current.tag).toBeTruthy()
  })
  test("manage input state", () => {
    const result = m.get("result")
    expect(result.current.input).toEqual(expect.stringContaining(""))
    act(() => result.current.setInput("strain"))
    expect(result.current.input).toEqual("strain")
    act(() =>
      result.current.setInput((input: string) => `${input}-description`),
    )
    expect(result.current.input).toEqual("strain-description")
    act(() => result.current.resetInput())
    expect(result.current.input).toEqual(expect.stringContaining(""))
  })
  test("manage option state", () => {
    const result = m.get("result")
    expect(result.current.options).toEqual(expect.arrayContaining([]))
    act(() => result.current.setOptions(Array.of("name")))
    expect(result.current.options.length).toEqual(1)
    act(() => result.current.setOptions(Array.of("description", "id")))
    expect(result.current.options.length).toEqual(2)
    expect(result.current.options).toEqual(Array.of("description", "id"))
    expect(result.current.lastOption).toEqual("id")
  })
})
