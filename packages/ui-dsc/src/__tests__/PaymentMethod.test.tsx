import { vi, test } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { PaymentMethod } from "../order/PaymentMethod"

vi.mock("react-hook-form", () => {
  const originalModule = vi.importActual("react-hook-form")

  return {
    ...originalModule,
    useFormContext: () => ({
      register: () => {},
      formState: { errors: {} },
    }),
  }
})

describe("OrderForm/Payment/PaymentMethod", () => {
  describe("initial render", () => {
    test("renders four radio buttons", () => {
      render(<PaymentMethod />)
      const radios = screen.getAllByRole("radio")
      expect(radios).toHaveLength(4)
    })

    test("renders one text field", () => {
      render(<PaymentMethod />)
      expect(screen.getByRole("textbox")).toBeInTheDocument()
    })
  })

  describe("radio button interactions", () => {
    test("removes textbox when clicking waiver", async () => {
      render(<PaymentMethod />)
      const waiver = screen.getByRole("radio", {
        name: "Waiver Requested",
      })
      await userEvent.click(waiver)
      expect(screen.queryByRole("textbox")).not.toBeInTheDocument()
    })

    test("removes textbox when clicking credit", async () => {
      render(<PaymentMethod />)
      const credit = screen.getByRole("radio", {
        name: "Credit Card",
      })
      await userEvent.click(credit)
      expect(screen.queryByRole("textbox")).not.toBeInTheDocument()
    })

    test("removes textbox when clicking wire", async () => {
      render(<PaymentMethod />)
      const wire = screen.getByRole("radio", {
        name: "Wire Transfer",
      })
      await userEvent.click(wire)
      expect(screen.queryByRole("textbox")).not.toBeInTheDocument()
    })

    test("correctly toggles textbox", async () => {
      render(<PaymentMethod />)
      const wire = screen.getByRole("radio", {
        name: "Wire Transfer",
      })
      const po = screen.getByRole("radio", {
        name: "Purchase Order (PO)",
      })
      expect(screen.queryByRole("textbox")).toBeInTheDocument()
      await userEvent.click(wire)
      expect(screen.queryByRole("textbox")).not.toBeInTheDocument()
      await userEvent.click(po)
      expect(screen.queryByRole("textbox")).toBeInTheDocument()
    })
  })
})
