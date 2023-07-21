import { vi, describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { renderAddressFields, isCountry } from "../functional"

vi.mock("react-hook-form", () => {
  const originalModule = vi.importActual("react-hook-form")

  return {
    useFormContext: () => ({ register: vi.fn(), formState: { errors: {} } }),
    ...originalModule,
  }
})

describe("renderAddressFields", () => {
  describe("initial render with country", () => {
    const properties = [
      {
        name: "firstName",
        label: "First Name",
        required: true,
      },
      {
        name: "lastName",
        label: "Last Name",
        required: true,
      },
      {
        name: "country",
        label: "Country",
        required: true,
      },
    ]
    test("displays all expected text fields", () => {
      render(<>{renderAddressFields(properties)}</>)
      properties.forEach((item) => {
        expect(screen.getAllByText(`${item.label}`)[0]).toBeInTheDocument()
      })
      expect(screen.getAllByRole("textbox")).toHaveLength(3)
    })
  })

  describe("initial render without country", () => {
    const properties = [
      {
        name: "firstName",
        label: "First Name",
        required: true,
      },
      {
        name: "lastName",
        label: "Last Name",
        required: true,
      },
    ]
    test("displays all expected text fields", () => {
      render(<>{renderAddressFields(properties)}</>)
      properties.forEach((item) => {
        expect(screen.getAllByText(`${item.label}`)[0]).toBeInTheDocument()
      })
      expect(screen.getAllByRole("textbox")).toHaveLength(2)
    })
  })
})

describe("isCountry function", () => {
  test("should return true for expected country fields", () => {
    expect(isCountry({ name: "country" })).toBeTruthy()
    expect(isCountry({ name: "payerCountry" })).toBeTruthy()
  })
  test("should return false for wrong field", () => {
    expect(isCountry({ name: "firstName" })).toBeFalsy()
  })
})
