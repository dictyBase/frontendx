import { vi, describe, expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ShippingMethodRadioGroup } from "../order/ShippingMethodRadioGroup"

const mockResetFieldValue = vi.fn()
const mockSetValue = vi.fn()

vi.mock("react-hook-form", () => {
  const originalModule = vi.importActual("react-hook-form")

  return {
    ...originalModule,
    useFormContext: () => ({
      resetField: mockResetFieldValue,
      setValue: mockSetValue,
      getValues: () => "DHL",
      register: () => {},
    }),
  }
})

describe("ShippingMethodRadioGroup", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const mockSetIsPrepaid = vi.fn()

  const properties = {
    setIsPrepaid: mockSetIsPrepaid,
  }

  describe("initial render", () => {
    test("renders radio buttons", () => {
      render(<ShippingMethodRadioGroup {...properties} />)
      const radios = screen.getAllByRole("radio")
      expect(radios).toHaveLength(4)
    })
  })

  describe("radio button interactions", () => {
    test("sets field value when clicking prepaid shipping label", async () => {
      render(<ShippingMethodRadioGroup {...properties} />)
      // click prepaid label button
      const label = screen.getByRole("radio", {
        name: "Send prepaid shipping label",
      })
      await userEvent.click(label)
      expect(mockSetValue).toBeCalledTimes(1)
      expect(mockSetValue).toBeCalledWith(
        "shippingAccountNumber",
        "sending prepaid shipping label",
      )
      expect(mockSetIsPrepaid).toBeCalledTimes(1)
      expect(mockSetIsPrepaid).toBeCalledWith(true)
    })
    test("does not set field value when clicking others", async () => {
      render(<ShippingMethodRadioGroup {...properties} />)
      // click UPS button
      const ups = screen.getByRole("radio", {
        name: "UPS",
      })
      await userEvent.click(ups)
      expect(mockResetFieldValue).toBeCalledWith("shippingAccountNumber")
      expect(mockSetIsPrepaid).toBeCalledWith(false)
      // click FedEx button
      const fedex = screen.getByRole("radio", {
        name: "FedEx",
      })
      await userEvent.click(fedex)
      expect(mockResetFieldValue).toBeCalledWith("shippingAccountNumber")
      expect(mockSetIsPrepaid).toBeCalledWith(false)
      // click DHL button
      const dhl = screen.getByRole("radio", {
        name: "DHL",
      })
      await userEvent.click(dhl)
      expect(mockResetFieldValue).toBeCalledWith("shippingAccountNumber")
      expect(mockSetIsPrepaid).toBeCalledWith(false)
    })
  })
})
