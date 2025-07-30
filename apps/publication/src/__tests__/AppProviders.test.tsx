import { render, screen } from "@testing-library/react"
import { useApolloClientCache } from "@dictybase/data-access"
import { AppProviders } from "../components/layout/AppProviders"

jest.mock("@logto/react", () => ({
  useLogto: jest.fn(() => {}),
  useHandleSignInCallback: jest.fn(() => {}),
  LogtoProvider: jest.fn(({ children }) => <>{children}</>),
  UserScope: {
    Profile: "",
    Email: "",
    Phone: "",
    CustomData: "",
  },
}))

jest.mock("@apollo/client", () => ({
  ApolloProvider: jest.fn(({ children }) => <>{children}</>),
}))

jest.mock("@dictybase/data-access", () => ({
  useGraphqlClient: jest.fn(() => {}),
  useApolloClientCache: jest.fn(),
  storageType: {
    INDEX: "",
  },
}))

test("renders loader when ApolloClientCache is initializing", () => {
  ;(useApolloClientCache as jest.Mock).mockImplementationOnce(() => ({
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
  ;(useApolloClientCache as jest.Mock).mockImplementationOnce(() => ({
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
