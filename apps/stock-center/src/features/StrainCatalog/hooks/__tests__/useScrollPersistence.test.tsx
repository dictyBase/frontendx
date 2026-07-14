import { createElement, FC } from "react"
import { render } from "@testing-library/react"
import { test, expect, vi, beforeEach, afterEach } from "vitest"
import { useScrollPersistence } from "../useScrollPersistence"

// Wrapper component so render() integrates with the global afterEach(cleanup)
const HookWrapper: FC<{ storageKey?: string }> = ({
  storageKey = "catalogScrollPos",
}) => {
  useScrollPersistence({ storageKey })
  return <></>
}

beforeEach(() => {
  sessionStorage.clear()
})

afterEach(() => {
  vi.restoreAllMocks()
})

test("restores scroll position from sessionStorage on mount", () => {
  const scrollToSpy = vi.spyOn(window, "scrollTo")
  sessionStorage.setItem("catalogScrollPos", "500")

  render(createElement(HookWrapper, {}))

  expect(scrollToSpy).toHaveBeenCalledWith(0, 500)
})

test("does not scroll when no saved position exists", () => {
  const scrollToSpy = vi.spyOn(window, "scrollTo")

  render(createElement(HookWrapper, {}))

  expect(scrollToSpy).not.toHaveBeenCalled()
})

test("saves scroll position to sessionStorage on beforeunload", () => {
  vi.stubGlobal("scrollY", 250)

  render(createElement(HookWrapper, {}))
  window.dispatchEvent(new Event("beforeunload"))

  expect(sessionStorage.getItem("catalogScrollPos")).toBe("250")
})

test("uses a custom storage key when provided", () => {
  const scrollToSpy = vi.spyOn(window, "scrollTo")
  sessionStorage.setItem("myCustomKey", "100")

  render(createElement(HookWrapper, { storageKey: "myCustomKey" }))

  expect(scrollToSpy).toHaveBeenCalledWith(0, 100)
})

test("removes the beforeunload listener on unmount", () => {
  const removeEventListenerSpy = vi.spyOn(window, "removeEventListener")

  const { unmount } = render(createElement(HookWrapper, {}))
  unmount()

  expect(removeEventListenerSpy).toHaveBeenCalledWith(
    "beforeunload",
    expect.any(Function),
  )
})
