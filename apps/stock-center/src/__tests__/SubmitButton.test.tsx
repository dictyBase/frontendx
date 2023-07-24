import { test, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { render, screen } from "@testing-library/react"
import { SubmitButton } from "../components/SubmitButton"

vi.mock("dicty-graphql-schema", async () => {
  const originalModule = (await vi.importActual(
    "dicty-graphql-schema",
  )) as typeof import("dicty-graphql-schema")

  return {
    ...originalModule,
    useCreateOrderMutation: () => [
      () => ({ data: { createOrder: { id: 1901 } } }),
    ],
    useCreateUserMutation: () => [() => {}],
    useUpdateUserMutation: () => [() => {}],
    useUserByEmailQuery: () => ({
      refetch: () => ({ data: { userByEmail: { id: 1091 } } }),
    }),
  }
})

const App = () => (
  <MemoryRouter>
    <Routes>
      <Route
        path="order/submitted/:orderId"
        element={<> Confirmation Page </>}
      />
    </Routes>
    <SubmitButton />
  </MemoryRouter>
)

test("SubmitButton component should navigate to a confirmation page when clicked", async () => {
  render(<App />)

  await userEvent.click(screen.getByRole("button", { name: "Submit" }))

  expect(screen.getByText("Confirmation Page")).toBeInTheDocument()
})
