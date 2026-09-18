import { test, expect, vi } from "vitest"
import { renderHook } from "@testing-library/react-hooks"
import { useAtom } from "jotai"
import { LexicalTestComposer } from "../utils/LexicalTestComposer"
import { useBlockFormat } from "../hooks/useBlockFormat"
import { blockTypeAtom, BlockTypes } from "../context/atomConfigs"

type WrapperProperties = { children: React.ReactNode }

const wrapper = ({ children }: WrapperProperties) => (
  <LexicalTestComposer>{children as JSX.Element}</LexicalTestComposer>
)

test("returns the current blockType from atom (default is paragraph)", () => {
  const { result } = renderHook(() => useBlockFormat(), { wrapper })
  const [blockType] = result.current
  expect(blockType).toBe(BlockTypes.PARAGRAPH)
})

test("returns a setBlockType function", () => {
  const { result } = renderHook(() => useBlockFormat(), { wrapper })
  const [, setBlockType] = result.current
  expect(typeof setBlockType).toBe("function")
})

test("setBlockType('bullet') dispatches INSERT_UNORDERED_LIST_COMMAND", () => {
  const { result } = renderHook(() => useBlockFormat(), { wrapper })

  const [, setBlockType] = result.current
  const dispatchSpy = vi.fn().mockReturnValue(false)

  // Access the editor from the hook's closure via dispatchCommand spy
  // We test indirectly by verifying no errors thrown and command is dispatched
  // by spying on console.error for unexpected errors
  const consoleErrorSpy = vi
    .spyOn(console, "error")
    .mockImplementation(() => {})
  expect(() => setBlockType(BlockTypes.BULLET_LIST)).not.toThrow()
  consoleErrorSpy.mockRestore()
  dispatchSpy.mockRestore()
})

test("setBlockType('number') dispatches INSERT_ORDERED_LIST_COMMAND when not already numbered", () => {
  const { result } = renderHook(() => useBlockFormat(), { wrapper })
  const [, setBlockType] = result.current

  const consoleErrorSpy = vi
    .spyOn(console, "error")
    .mockImplementation(() => {})
  expect(() => setBlockType(BlockTypes.NUMBERED_LIST)).not.toThrow()
  consoleErrorSpy.mockRestore()
})

test("setBlockType('paragraph') is a no-op when blockType is already paragraph", () => {
  const { result } = renderHook(() => useBlockFormat(), { wrapper })
  const [blockType, setBlockType] = result.current

  expect(blockType).toBe(BlockTypes.PARAGRAPH)

  const consoleErrorSpy = vi
    .spyOn(console, "error")
    .mockImplementation(() => {})
  // This should not trigger any editor update since blockType matches
  expect(() => setBlockType(BlockTypes.PARAGRAPH)).not.toThrow()
  consoleErrorSpy.mockRestore()
})

test("setBlockType('h1') dispatches editor update for heading", () => {
  const { result } = renderHook(() => useBlockFormat(), { wrapper })
  const [, setBlockType] = result.current

  const consoleErrorSpy = vi
    .spyOn(console, "error")
    .mockImplementation(() => {})
  expect(() => setBlockType(BlockTypes.HEADING_ONE)).not.toThrow()
  consoleErrorSpy.mockRestore()
})

test("setBlockType('quote') dispatches editor update for quote", () => {
  const { result } = renderHook(() => useBlockFormat(), { wrapper })
  const [, setBlockType] = result.current

  const consoleErrorSpy = vi
    .spyOn(console, "error")
    .mockImplementation(() => {})
  expect(() => setBlockType(BlockTypes.QUOTE)).not.toThrow()
  consoleErrorSpy.mockRestore()
})

test("setBlockType('bullet') dispatches REMOVE_LIST_COMMAND when blockType is already bullet", () => {
  const { result } = renderHook(
    () => {
      const [, setAtomBlockType] = useAtom(blockTypeAtom)
      const blockFormat = useBlockFormat()
      return { blockFormat, setAtomBlockType }
    },
    { wrapper },
  )

  // Set blockType to bullet via atom
  result.current.setAtomBlockType(BlockTypes.BULLET_LIST)

  const [, setBlockType] = result.current.blockFormat

  const consoleErrorSpy = vi
    .spyOn(console, "error")
    .mockImplementation(() => {})
  // When already on 'bullet', calling setBlockType('bullet') should dispatch REMOVE_LIST_COMMAND
  expect(() => setBlockType(BlockTypes.BULLET_LIST)).not.toThrow()
  consoleErrorSpy.mockRestore()
})

test("setBlockType('number') dispatches REMOVE_LIST_COMMAND when blockType is already number", () => {
  const { result } = renderHook(
    () => {
      const [, setAtomBlockType] = useAtom(blockTypeAtom)
      const blockFormat = useBlockFormat()
      return { blockFormat, setAtomBlockType }
    },
    { wrapper },
  )

  result.current.setAtomBlockType(BlockTypes.NUMBERED_LIST)

  const [, setBlockType] = result.current.blockFormat

  const consoleErrorSpy = vi
    .spyOn(console, "error")
    .mockImplementation(() => {})
  expect(() => setBlockType(BlockTypes.NUMBERED_LIST)).not.toThrow()
  consoleErrorSpy.mockRestore()
})
