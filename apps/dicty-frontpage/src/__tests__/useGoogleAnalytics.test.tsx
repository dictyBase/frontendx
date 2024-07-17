import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { render, screen } from "@testing-library/react"
import { test, vi, beforeEach } from "vitest"
import { useGoogleAnalytics } from "../common/hooks/useGoogleAnalytics"

const { mockGTag, mockInitialize } = vi.hoisted(() => ({ mockGTag: vi.fn(), mockInitialize: vi.fn() }))

vi.doMock("react-ga4", () => {
  return {
    default: {
      gTag: mockGTag,
      initialize: mockInitialize
    }
  }
})

const Wrapper = () => {
  useGoogleAnalytics()
  return <></>
}

const routes = [
  { index: true, element: <Wrapper />},
  { path: "test", element: <Wrapper />}
]

beforeEach(() => {
  import.meta.env.GA_TRACKING_ID = "TEST_TRACKING_ID"
})

test("Google Analytics is inactive in non-production environments", () => {
  import.meta.env.DEPLOY_ENV = "development" 
  const router = createMemoryRouter(routes)
  render(<RouterProvider router={router} />)

  expect(mockInitialize).toHaveBeenCalledTimes(0)
})

test("Google Analytics is inactive in non-production environments", () => {
  import.meta.env.DEPLOY_ENV = "staging" 
  const router = createMemoryRouter(routes)
  render(<RouterProvider router={router} />)

  expect(mockInitialize).toHaveBeenCalledTimes(0)
})

test("Google Analytics is active in a production environment", () => {
  import.meta.env.DEPLOY_ENV = "production" 
  const router = createMemoryRouter(routes)
  render(<RouterProvider router={router} />)

  expect(mockInitialize).toHaveBeenCalledTimes(0)
})
