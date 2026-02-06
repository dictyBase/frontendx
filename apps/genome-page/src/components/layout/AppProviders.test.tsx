import { vi, Mock } from "vitest"
import { render, screen } from "@testing-library/react"
import { useApolloClientCache } from "@dictybase/data-access"
import { AppProviders } from "./AppProviders"

vi.mock("@logto/react", () => ({
  useLogto: vi.fn(() => {}),
  useHandleSignInCallback: vi.fn(() => {}),
  LogtoProvider: vi.fn(({ children }) => <>{children}</>),
  UserScope: {
    Profile: "",
    Email: "",
    Phone: "",
    CustomData: "",
  },
}))

vi.mock("@apollo/client", async (importOriginal) => ({
  ...(await importOriginal()),
  ApolloProvider: vi.fn(({ children }) => <>{children}</>),
}))

vi.mock("@dictybase/data-access", () => ({
  useGraphqlClient: vi.fn(() => {}),
  useApolloClientCache: vi.fn(),
  storageType: {
    INDEX: "",
  },
}))

test("renders loader when ApolloClientCache is initializing", () => {
  ;(useApolloClientCache as Mock).mockImplementationOnce(() => ({
    cache: {},
    isInitializing: true,
  }))

  render(
    <AppProviders>
      <div> Test Child </div>
    </AppProviders>,
  )
  expect(screen.queryByText("Test Child")).toBeNull()
  expect(screen.getByRole("progressbar")).toBeInTheDocument()
})

test("renders children when initialization is complete", () => {
  ;(useApolloClientCache as Mock).mockImplementationOnce(() => ({
    cache: {},
    isInitializing: false,
  }))

  render(
    <AppProviders>
      <div> Test Child </div>
    </AppProviders>,
  )
  expect(screen.getByText("Test Child")).toBeInTheDocument()
})
