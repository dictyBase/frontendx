import { test, expect, vi, beforeEach } from "vitest"
import { userEvent } from "@testing-library/user-event"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react"
import { StatusEnum } from "dicty-graphql-schema"
import { SubmitButton } from "../components/SubmitButton"
import { getIDs, getOrderVariables } from "../submitOrder"
import { mockStrainCartItem, mockPlasmidCartItem } from "../mocks/mockCartItems"
import type { ShippingFormData, PaymentFormData } from "../types"

const CONFIRMATION_TEXT = "Confirmation Page"
const ORDER_CREATION_ERROR_MESSAGE = "Order creation failed"
const CONSUMER_EMAIL = "jane.doe@example.org"

const mockCreateOrder = vi.fn()

vi.mock("dicty-graphql-schema", async () => {
  const originalModule = (await vi.importActual(
    "dicty-graphql-schema",
  )) as typeof import("dicty-graphql-schema")

  return {
    ...originalModule,
    useCreateOrderMutation: () => [mockCreateOrder],
  }
})

const mockFormData: ShippingFormData & PaymentFormData = {
  firstName: "Jane",
  lastName: "Doe",
  email: CONSUMER_EMAIL,
  organization: "Dicty Lab",
  lab: "Cell Group",
  address1: "100 Main St",
  address2: "Room 200",
  city: "Evanston",
  state: "IL",
  zip: "60208",
  country: "USA",
  phoneCountryCode: "US",
  phone: "555-000-1111",
  shippingAccount: "DHL",
  shippingAccountNumber: "999999",
  additionalInformation: "Handle with care",
  payerFirstName: "John",
  payerLastName: "Smith",
  payerEmail: "john.smith@example.org",
  payerOrganization: "Dicty Billing",
  payerLab: "Admin",
  payerAddress1: "200 Billing Ave",
  payerAddress2: "Suite 10",
  payerCity: "Chicago",
  payerState: "IL",
  payerZip: "60601",
  payerCountry: "USA",
  payerPhoneCountryCode: "US",
  payerPhone: "555-222-3333",
  paymentMethod: "purchaseOrder",
  purchaseOrderNum: "PO-12345",
}

beforeEach(() => {
  vi.clearAllMocks()
  mockCreateOrder.mockResolvedValue({ data: { createOrder: { id: 1901 } } })
})

const App = () => (
  <MemoryRouter>
    <Routes>
      <Route path="/" element={<SubmitButton />} />
      <Route
        path="order/submitted/:orderId"
        element={<> {CONFIRMATION_TEXT} </>}
      />
    </Routes>
  </MemoryRouter>
)

test("SubmitButton component should navigate to a confirmation page when clicked", async () => {
  render(<App />)

  await userEvent.click(screen.getByRole("button", { name: "Submit" }))

  expect(mockCreateOrder).toHaveBeenCalledTimes(1)
  expect(screen.getByText(CONFIRMATION_TEXT)).toBeInTheDocument()
})

test("SubmitButton displays error snackbar when createOrder rejects with an error", async () => {
  mockCreateOrder.mockRejectedValue(new Error(ORDER_CREATION_ERROR_MESSAGE))
  render(<App />)

  await userEvent.click(screen.getByRole("button", { name: "Submit" }))

  expect(await screen.findByRole("alert")).toHaveTextContent(
    ORDER_CREATION_ERROR_MESSAGE,
  )
  expect(screen.queryByText(CONFIRMATION_TEXT)).not.toBeInTheDocument()
})

test("SubmitButton displays GraphQL error message in snackbar when createOrder returns errors", async () => {
  mockCreateOrder.mockResolvedValue({
    errors: [{ message: "Invalid order input" }],
  })
  render(<App />)

  await userEvent.click(screen.getByRole("button", { name: "Submit" }))

  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Invalid order input",
  )
  expect(screen.queryByText(CONFIRMATION_TEXT)).not.toBeInTheDocument()
})

test("SubmitButton displays fallback error snackbar when createOrder resolves without an order ID", async () => {
  mockCreateOrder.mockResolvedValue({ data: { createOrder: undefined } })
  render(<App />)

  await userEvent.click(screen.getByRole("button", { name: "Submit" }))

  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Could not create order",
  )
  expect(screen.queryByText(CONFIRMATION_TEXT)).not.toBeInTheDocument()
})

test("SubmitButton closes error snackbar when close button is clicked", async () => {
  mockCreateOrder.mockRejectedValue(new Error(ORDER_CREATION_ERROR_MESSAGE))
  render(<App />)

  await userEvent.click(screen.getByRole("button", { name: "Submit" }))
  expect(await screen.findByRole("alert")).toBeInTheDocument()

  await userEvent.click(screen.getByRole("button", { name: "Close" }))
  await waitForElementToBeRemoved(() => screen.queryByRole("alert"))
})

test("getIDs extracts stock IDs from catalog items", () => {
  const ids = getIDs([mockStrainCartItem, mockPlasmidCartItem])
  expect(ids).toEqual([mockStrainCartItem.id, mockPlasmidCartItem.id])
})

test("getOrderVariables builds CreateOrderMutationVariables from formData and cart items", () => {
  const result = getOrderVariables(mockFormData, [
    mockStrainCartItem,
    mockPlasmidCartItem,
  ])
  expect(result).toEqual({
    variables: {
      input: {
        courier: "DHL",
        courier_account: "999999",
        comments: "Handle with care",
        payment: "purchaseOrder",
        purchase_order_num: "PO-12345",
        status: StatusEnum.InPreparation,
        consumer: CONSUMER_EMAIL,
        consumer_info: {
          first_name: "Jane",
          last_name: "Doe",
          organization: "Dicty Lab",
          first_address: "100 Main St",
          second_address: "Room 200",
          city: "Evanston",
          state: "IL",
          zipcode: "60208",
          country: "USA",
          phone: "555-000-1111",
        },
        payer: "john.smith@example.org",
        payer_info: {
          first_name: "John",
          last_name: "Smith",
          organization: "Dicty Billing",
          first_address: "200 Billing Ave",
          second_address: "Suite 10",
          city: "Chicago",
          state: "IL",
          zipcode: "60601",
          country: "USA",
          phone: "555-222-3333",
        },
        purchaser: CONSUMER_EMAIL,
        items: [mockStrainCartItem.id, mockPlasmidCartItem.id],
      },
    },
  })
})
