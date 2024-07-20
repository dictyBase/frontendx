import { vi, test, expect, beforeEach, afterEach } from "vitest"
import { render } from "@testing-library/react"
import { useGoogleAnalytics } from "../common/hooks/useGoogleAnalytics"

const Wrapper = () => {
  useGoogleAnalytics()
  return <></>
}

beforeEach(() => {
  vi.stubGlobal("gtag", undefined)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

test("Does not load Google Analytics in a non-production environment", () => {
  import.meta.env.VITE_DEPLOY_ENV = "testing"
  import.meta.env.VITE_GA_TRACKING_ID = "G-XXXXXXXXXX"
  render(<Wrapper />)

  expect(window.gtag).toBeUndefined()
})

test("Loads Google Analytics in production environment", () => {
  import.meta.env.VITE_DEPLOY_ENV = "production"
  import.meta.env.VITE_GA_TRACKING_ID = "G-XXXXXXXXXX"
  render(<Wrapper />)

  expect(window.gtag).toBeDefined()
})

test("Does not load Google Analytics if there is no tracking ID", () => {
  const mockConsoleError = vi.fn()
  vi.stubGlobal("console", { error: mockConsoleError })
  import.meta.env.VITE_DEPLOY_ENV = "production"
  import.meta.env.VITE_GA_TRACKING_ID = ""
  render(<Wrapper />)

  expect(window.gtag).toBeUndefined()
  expect(mockConsoleError).toHaveBeenCalled()
})

