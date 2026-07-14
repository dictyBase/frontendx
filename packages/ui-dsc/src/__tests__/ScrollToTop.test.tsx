import { test, expect, vi, afterEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { cleanup } from "@testing-library/react"
import { ScrollToTop } from "../catalog/ScrollToTop"

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

test("does not render button when page has not scrolled", () => {
  vi.stubGlobal("scrollY", 0)
  render(<ScrollToTop threshold={300} />)
  expect(
    screen.queryByRole("button", { name: /scroll to top/i }),
  ).not.toBeInTheDocument()
})

test("renders button after scrolling past the threshold", () => {
  vi.stubGlobal("scrollY", 0)
  render(<ScrollToTop threshold={300} />)

  vi.stubGlobal("scrollY", 400)
  fireEvent.scroll(window)

  expect(
    screen.getByRole("button", { name: /scroll to top/i }),
  ).toBeInTheDocument()
})

test("hides button when scrolling back above threshold", () => {
  vi.stubGlobal("scrollY", 400)
  render(<ScrollToTop threshold={300} />)
  fireEvent.scroll(window)

  vi.stubGlobal("scrollY", 100)
  fireEvent.scroll(window)

  expect(
    screen.queryByRole("button", { name: /scroll to top/i }),
  ).not.toBeInTheDocument()
})

test("calls window.scrollTo with top 0 and smooth behavior when clicked", async () => {
  const user = userEvent.setup()
  const scrollToSpy = vi.spyOn(window, "scrollTo")
  vi.stubGlobal("scrollY", 400)

  render(<ScrollToTop threshold={300} />)
  fireEvent.scroll(window)

  await user.click(screen.getByRole("button", { name: /scroll to top/i }))

  expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: "smooth" })
})

test("respects a custom scroll behavior prop", async () => {
  const user = userEvent.setup()
  const scrollToSpy = vi.spyOn(window, "scrollTo")
  vi.stubGlobal("scrollY", 400)

  render(<ScrollToTop threshold={300} behavior="instant" />)
  fireEvent.scroll(window)

  await user.click(screen.getByRole("button", { name: /scroll to top/i }))

  expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: "instant" })
})

test("uses a default threshold of 300", () => {
  vi.stubGlobal("scrollY", 0)
  render(<ScrollToTop />)

  vi.stubGlobal("scrollY", 301)
  fireEvent.scroll(window)

  expect(
    screen.getByRole("button", { name: /scroll to top/i }),
  ).toBeInTheDocument()
})
