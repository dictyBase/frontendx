/* eslint-disable sonarjs/no-duplicate-string */
import { vi, describe, expect, test, Mock } from "vitest"
import { render, screen } from "@testing-library/react"
import { BrowserRouter, useLocation } from "react-router-dom"
import { Breadcrumbs } from "../components/Breadcrumbs"

vi.mock("react-router-dom", async () => {
  const originalModule =
    await vi.importActual<typeof import("react-router-dom")>("react-router-dom")
  return {
    ...originalModule,
    useLocation: vi.fn(),
  }
})

describe("app/layout/Breadcrumbs", () => {
  const MockComponent = () => (
    <BrowserRouter>
      <Breadcrumbs />
    </BrowserRouter>
  )

  describe("subpages", () => {
    test("should include DSC Home link first", () => {
      ;(useLocation as Mock).mockReturnValueOnce({
        pathname: "/vandelay",
      })
      render(<MockComponent />)
      expect(screen.queryByTestId("breadcrumbs-home")).toHaveTextContent(
        "DSC Home",
      )
      expect(screen.getByTestId("breadcrumbs-last")).toHaveTextContent(
        "Vandelay",
      )
    })

    test("should display FAQs for /faq subroute", () => {
      ;(useLocation as Mock).mockReturnValueOnce({
        pathname: "/information/faq",
      })
      render(<MockComponent />)
      expect(screen.queryByTestId("breadcrumbs-home")).toHaveTextContent(
        "DSC Home",
      )
      expect(screen.getByTestId("breadcrumbs-link")).toHaveTextContent(
        "Information",
      )
      expect(screen.getByTestId("breadcrumbs-last")).toHaveTextContent("FAQs")
    })

    test("should display MyDSC for /mydsc subroute", () => {
      ;(useLocation as Mock).mockReturnValueOnce({
        pathname: "/mydsc",
      })
      render(<MockComponent />)
      expect(screen.queryByTestId("breadcrumbs-home")).toHaveTextContent(
        "DSC Home",
      )
      expect(screen.getByTestId("breadcrumbs-last")).toHaveTextContent("MyDSC")
    })

    test("should display Add Page for /addpage subroute", () => {
      ;(useLocation as Mock).mockReturnValueOnce({
        pathname: "/addpage",
      })
      render(<MockComponent />)
      expect(screen.queryByTestId("breadcrumbs-home")).toHaveTextContent(
        "DSC Home",
      )
      expect(screen.getByTestId("breadcrumbs-last")).toHaveTextContent(
        "Add Page",
      )
    })

    test("should remove extra characters from phenotypes breadcrumb", () => {
      ;(useLocation as Mock).mockReturnValueOnce({
        pathname: "/phenotypes/abolished+protein+phosphorylation",
      })
      render(<MockComponent />)
      expect(screen.queryByTestId("breadcrumbs-home")).toHaveTextContent(
        "DSC Home",
      )
      expect(screen.getByTestId("breadcrumbs-text")).toHaveTextContent(
        "Phenotypes",
      )
      expect(screen.getByTestId("breadcrumbs-last")).toHaveTextContent(
        "abolished protein phosphorylation",
      )
    })

    test("should remove extra characters from hyphenated pathnames", () => {
      ;(useLocation as Mock).mockReturnValueOnce({
        pathname: "/information/other-stock-centers",
      })
      render(<MockComponent />)
      expect(screen.queryByTestId("breadcrumbs-home")).toHaveTextContent(
        "DSC Home",
      )
      expect(screen.getByTestId("breadcrumbs-link")).toHaveTextContent(
        "Information",
      )
      expect(screen.getByTestId("breadcrumbs-last")).toHaveTextContent(
        "Other Stock Centers",
      )
    })
  })

  describe("homepage", () => {
    test("should not render breadcrumbs on homepage", () => {
      ;(useLocation as Mock).mockReturnValueOnce({
        pathname: "/",
      })
      render(<MockComponent />)
      expect(screen.queryByTestId("breadcrumbs-home")).not.toBeInTheDocument()
    })
  })
})
