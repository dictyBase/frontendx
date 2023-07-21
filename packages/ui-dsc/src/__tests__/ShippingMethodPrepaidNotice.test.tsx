import { test } from "vitest"
import { BrowserRouter } from "react-router-dom"
import { render, screen } from "@testing-library/react"
import { ShippingMethodPrepaidNotice } from "../order/ShippingMethodPrepaidNotice"

describe("OrderForm/Shipping/ShippingMethodPrepaidNotice", () => {
  describe("initial render", () => {
    test("renders email link", () => {
      render(
        <BrowserRouter>
          <ShippingMethodPrepaidNotice />
        </BrowserRouter>,
      )
      const emailLink = screen.getByRole("link")
      expect(emailLink).toHaveAttribute(
        "href",
        "mailto:dictystocks@northwestern.edu",
      )
    })
  })
})
