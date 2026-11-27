import { vi, test, expect, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { createMemoryRouter, RouterProvider } from "react-router-dom"
import { ACCESS } from "@dictybase/auth-mui5"
import StrainDetailsPage, {
  access as indexAccess,
} from "../pages/strains/[id]/index"
import EditableStrainPage, {
  access as editableAccess,
  roles as editableRoles,
} from "../pages/strains/[id]/editable"

const mockUseAuthorization = vi.hoisted(() => vi.fn())

vi.mock("@dictybase/auth-mui5", async () => {
  const actual = await vi.importActual<typeof import("@dictybase/auth-mui5")>(
    "@dictybase/auth-mui5",
  )
  return {
    ...actual,
    useAuthorization: mockUseAuthorization,
  }
})

vi.mock("@dictybase/ui-dsc", () => ({
  StrainDetailsContainer: () => <div>Public Strain Details View</div>,
  EditableStrainDetailsContainer: () => <div>Editable Strain Details View</div>,
}))

const TEST_STRAIN_PATH = "/strains/DBS0350877"

const routes = [
  {
    path: "/strains/:id",
    element: <StrainDetailsPage />,
  },
  {
    path: "/strains/:id/editable",
    element: <EditableStrainPage />,
  },
]

beforeEach(() => {
  vi.clearAllMocks()
})

test("exports expected route access and roles configuration", () => {
  expect(indexAccess).toBe(ACCESS.public)
  expect(editableAccess).toBe(ACCESS.private)
  expect(editableRoles).toEqual(["content-admin"])
})

test("redirects authorized content-admin user to /strains/:id/editable", async () => {
  mockUseAuthorization.mockReturnValue({
    isLoading: false,
    isAuthorized: true,
  })

  const router = createMemoryRouter(routes, {
    initialEntries: [TEST_STRAIN_PATH],
  })
  render(<RouterProvider router={router} />)

  expect(
    await screen.findByText("Editable Strain Details View"),
  ).toBeInTheDocument()
  expect(router.state.location.pathname).toBe(`${TEST_STRAIN_PATH}/editable`)
})

test("renders public StrainDetailsContainer for unauthorized user", () => {
  mockUseAuthorization.mockReturnValue({
    isLoading: false,
    isAuthorized: false,
  })

  const router = createMemoryRouter(routes, {
    initialEntries: [TEST_STRAIN_PATH],
  })
  render(<RouterProvider router={router} />)

  expect(screen.getByText("Public Strain Details View")).toBeInTheDocument()
  expect(router.state.location.pathname).toBe(TEST_STRAIN_PATH)
})

test("renders loading display while authorization is loading", () => {
  mockUseAuthorization.mockReturnValue({
    isLoading: true,
    isAuthorized: false,
  })

  const router = createMemoryRouter(routes, {
    initialEntries: [TEST_STRAIN_PATH],
  })
  render(<RouterProvider router={router} />)

  expect(screen.getAllByTestId("skeleton").length).toBeGreaterThan(0)
})
