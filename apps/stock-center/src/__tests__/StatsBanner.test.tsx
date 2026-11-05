import { vi, test, expect, beforeEach, afterEach } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import { StatsBanner } from "../features/NewHome/StatsBanner"

const mockApiResponse = {
  strains: {
    total: "28576",
  },
  plasmids: {
    total: "1265",
  },
}

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn())
})

afterEach(() => {
  vi.unstubAllGlobals()
})

test("shows skeleton placeholders while loading", () => {
  vi.mocked(fetch).mockReturnValue(
    new Promise<Response>(() => {
      /* never resolves */
    }),
  )
  render(<StatsBanner />)
  const skeletons = document.querySelectorAll(".MuiSkeleton-root")
  expect(skeletons.length).toBeGreaterThan(0)
})

test("displays formatted stats on successful fetch", async () => {
  vi.mocked(fetch).mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(mockApiResponse),
  } as Response)

  render(<StatsBanner />)

  await waitFor(() => {
    expect(screen.getByText("28,576")).toBeInTheDocument()
  })
  expect(screen.getByText("Strains")).toBeInTheDocument()
  expect(screen.getByText("1,265")).toBeInTheDocument()
  expect(screen.getByText("Plasmids")).toBeInTheDocument()
  expect(screen.getByText("24/7")).toBeInTheDocument()
  expect(screen.getByText("Online Ordering")).toBeInTheDocument()
})

test("falls back to static stats when fetch fails", async () => {
  vi.mocked(fetch).mockRejectedValue(new Error("Network error"))

  render(<StatsBanner />)

  await waitFor(() => {
    expect(screen.getByText("28,576")).toBeInTheDocument()
  })
  expect(screen.getByText("Strains")).toBeInTheDocument()
  expect(screen.getByText("1,265")).toBeInTheDocument()
  expect(screen.getByText("Plasmids")).toBeInTheDocument()
  expect(screen.getByText("24/7")).toBeInTheDocument()
})

test("falls back to static stats on non-ok response", async () => {
  vi.mocked(fetch).mockResolvedValue({
    ok: false,
    status: 500,
  } as Response)

  render(<StatsBanner />)

  await waitFor(() => {
    expect(screen.getByText("28,576")).toBeInTheDocument()
  })
  expect(screen.getByText("Strains")).toBeInTheDocument()
  expect(screen.getByText("24/7")).toBeInTheDocument()
})
