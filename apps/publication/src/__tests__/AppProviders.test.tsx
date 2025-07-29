import { render, screen } from "@testing-library/react"
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
  useApolloClientCache: jest.fn(() => ({
    cache: {},
    isInitializing: false,
  })),
  storageType: {
    INDEX: "",
  },
}))

test("renders children", () => {
  render(
    <AppProviders>
      <div> Test Child </div>
    </AppProviders>,
  )
  expect(screen.getByText("Test Child")).toBeInTheDocument()
})
