import { ReactNode } from "react"
import { vi, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import OrderConfirmation from "../pages/order/submitted/[orderId]"

const orderState = {
  orderID: "1901",
  cartItems: [],
  formData: {},
  cartTotal: "$0.00",
}

vi.mock("jotai", async () => {
  const originalModule = (await vi.importActual(
    "jotai",
  )) as typeof import("jotai")

  return {
    ...originalModule,
    useAtomValue: () => orderState,
  }
})

vi.mock("@react-pdf/renderer", async () => {
  const originalModule = (await vi.importActual(
    "@react-pdf/renderer",
  )) as typeof import("@react-pdf/renderer")

  return {
    ...originalModule,
    PDFViewer: ({ children }: { children: ReactNode }) => <>{children}</>,
    StyleSheet: { create: () => ({ body: {}, title: {}, row: {}, items: {} }) },
  }
})

const App = ({ orderId }: { orderId: string }) => (
  <MemoryRouter initialEntries={[`/order/submitted/${orderId}`]}>
    <Routes>
      <Route path="/">
        <Route index element={<>Home Page</>} />
        <Route
          path="order/submitted/:orderId"
          element={<OrderConfirmation />}
        />
      </Route>
    </Routes>
  </MemoryRouter>
)

test("if the orderId param matches the orderId in state, it render without error", () => {
  render(<App orderId="1901" />)

  const orderHeaderText = /Order ID:/
  const orderDescriptionText = /Thank you for your order/
  const OrderSummaryPdfText = /Order Summary/
  expect(screen.getByText(orderHeaderText)).toBeInTheDocument()
  expect(screen.getByText(orderDescriptionText)).toBeInTheDocument()
  expect(screen.getByText(OrderSummaryPdfText)).toBeInTheDocument()
})

test("if the orderId param does not match the orderId in state, it should redirect to home", () => {
  render(<App orderId="1091" />)
  expect(screen.getByText("Home Page")).toBeInTheDocument()
})
