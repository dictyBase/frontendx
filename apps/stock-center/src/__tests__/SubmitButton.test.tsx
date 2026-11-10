import { test, expect, vi, beforeEach } from "vitest"
import { userEvent } from "@testing-library/user-event"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react"
import { SubmitButton } from "../components/SubmitButton"
import { getIDs, getUserVariables } from "../submitOrder"
import { mockStrainCartItem, mockPlasmidCartItem } from "../mocks/mockCartItems"
import type { ShippingFormData, PaymentFormData } from "../types"

const CONFIRMATION_TEXT = "Confirmation Page"
const ORDER_CREATION_ERROR_MESSAGE = "Order creation failed"

const mockCreateOrder = vi.fn()
const mockCreateUser = vi.fn()
const mockUpdateUser = vi.fn()
const mockFetchUserByEmail = vi.fn()

vi.mock("dicty-graphql-schema", async () => {
  const originalModule = (await vi.importActual(
    "dicty-graphql-schema",
  )) as typeof import("dicty-graphql-schema")

  return {
    ...originalModule,
    useCreateOrderMutation: () => [mockCreateOrder],
    useCreateUserMutation: () => [mockCreateUser],
    useUpdateUserMutation: () => [mockUpdateUser],
    useUserByEmailLazyQuery: () => [mockFetchUserByEmail],
    useUserByEmailQuery: () => ({
      refetch: mockFetchUserByEmail,
    }),
  }
})

const mockFormData: ShippingFormData & PaymentFormData = {
  firstName: "Jane",
  lastName: "Doe",
  email: "jane.doe@example.org",
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
  mockFetchUserByEmail.mockResolvedValue({
    data: { userByEmail: { id: 1091 } },
  })
  mockUpdateUser.mockResolvedValue({ data: { updateUser: { id: 1091 } } })
  mockCreateUser.mockResolvedValue({ data: { createUser: { id: 1092 } } })
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

  expect(mockUpdateUser).toHaveBeenCalledTimes(2)
  expect(mockCreateOrder).toHaveBeenCalledTimes(1)
  expect(screen.getByText(CONFIRMATION_TEXT)).toBeInTheDocument()
})

test("SubmitButton creates users when userByEmail returns NotFound and navigates on success", async () => {
  mockFetchUserByEmail.mockResolvedValue({
    error: {
      graphQLErrors: [
        { message: "User not found", extensions: { code: "NotFound" } },
      ],
    },
  })
  render(<App />)

  await userEvent.click(screen.getByRole("button", { name: "Submit" }))

  expect(mockCreateUser).toHaveBeenCalledTimes(2)
  expect(mockUpdateUser).not.toHaveBeenCalled()
  expect(mockCreateOrder).toHaveBeenCalledTimes(1)
  expect(screen.getByText(CONFIRMATION_TEXT)).toBeInTheDocument()
})

test("SubmitButton displays error snackbar and stops when fetching user fails with non-NotFound error", async () => {
  mockFetchUserByEmail.mockRejectedValue(
    new Error("Network failure while fetching user"),
  )
  render(<App />)

  await userEvent.click(screen.getByRole("button", { name: "Submit" }))

  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Network failure while fetching user",
  )
  expect(mockUpdateUser).not.toHaveBeenCalled()
  expect(mockCreateUser).not.toHaveBeenCalled()
  expect(mockCreateOrder).not.toHaveBeenCalled()
  expect(screen.queryByText(CONFIRMATION_TEXT)).not.toBeInTheDocument()
})

test("SubmitButton displays error snackbar and does not call createUser when updateUser fails", async () => {
  mockUpdateUser.mockRejectedValue(new Error("Failed to update consumer"))
  render(<App />)

  await userEvent.click(screen.getByRole("button", { name: "Submit" }))

  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Failed to update consumer",
  )
  expect(mockCreateUser).not.toHaveBeenCalled()
  expect(mockCreateOrder).not.toHaveBeenCalled()
  expect(screen.queryByText(CONFIRMATION_TEXT)).not.toBeInTheDocument()
})

test("SubmitButton displays error snackbar and stops when createUser fails after NotFound", async () => {
  mockFetchUserByEmail.mockRejectedValue({
    graphQLErrors: [
      { message: "User not found", extensions: { code: "NotFound" } },
    ],
  })
  mockCreateUser.mockRejectedValue(new Error("Failed to create consumer"))
  render(<App />)

  await userEvent.click(screen.getByRole("button", { name: "Submit" }))

  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Failed to create consumer",
  )
  expect(mockCreateOrder).not.toHaveBeenCalled()
  expect(screen.queryByText(CONFIRMATION_TEXT)).not.toBeInTheDocument()
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

test("getUserVariables returns create variables with email when no ID is provided", () => {
  const result = getUserVariables(mockFormData, "consumer")
  expect(result).toEqual({
    variables: {
      input: {
        first_name: "Jane",
        last_name: "Doe",
        email: "jane.doe@example.org",
        organization: "Dicty Lab",
        group_name: "Cell Group",
        first_address: "100 Main St",
        second_address: "Room 200",
        city: "Evanston",
        state: "IL",
        zipcode: "60208",
        country: "USA",
        phone: "555-000-1111",
        is_active: true,
      },
    },
  })
})

test("getUserVariables returns update variables with id and without email when ID is provided", () => {
  const result = getUserVariables(mockFormData, "payer", "42")
  expect(result).toEqual({
    variables: {
      id: "42",
      input: {
        first_name: "John",
        last_name: "Smith",
        organization: "Dicty Billing",
        group_name: "Admin",
        first_address: "200 Billing Ave",
        second_address: "Suite 10",
        city: "Chicago",
        state: "IL",
        zipcode: "60601",
        country: "USA",
        phone: "555-222-3333",
        is_active: true,
      },
    },
  })
})
