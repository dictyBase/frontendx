import { vi, describe, test, expect, afterEach } from "vitest"
import { initializeGoogleAnalytics } from "../src/initializeGoogleAnalytics"

afterEach(() => {
  vi.restoreAllMocks()
})

describe("initializeGoogleAnalytics", () => {
  const testTrackingId = "G-XXXXXXXXXX" 
  initializeGoogleAnalytics(testTrackingId)

  test("Appends a script tag to the document with gtag.js URL with tracking ID as src", () => {
    const script = document.querySelector("script")
    expect(script).toBeInTheDocument()
    expect(script).toHaveAttribute("src", `https://www.googletagmanager.com/gtag/js?id=${testTrackingId}`)
  })

  test("gtag function is defined", () => {
    expect(window.gtag).toBeDefined()
  })

  test("dataLayer is defined", () => {
    expect(window.dataLayer).toBeDefined()
  })
})
