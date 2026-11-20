import { render, screen } from "@testing-library/react"
import { Box as BoxMUI5 } from "@mui/material"
import { ThemeProvider } from "../components/layout/ThemeProvider"

const TestComponentMUI4 = () => (
  <BoxMUI5
    data-testid="mui4-box"
    sx={(theme) => ({ backgroundColor: theme.palette.primary.main })}>
    test
  </BoxMUI5>
)

const TestComponentMUI5 = () => (
  <BoxMUI5
    data-testid="mui5-box"
    sx={(theme) => ({ backgroundColor: theme.palette.secondary.main })}>
    test
  </BoxMUI5>
)
test("It provides theme styles to MUI4 components", () => {
  render(
    <ThemeProvider>
      <TestComponentMUI4 />
    </ThemeProvider>,
  )
  expect(screen.getByTestId("mui4-box")).toHaveStyle({
    backgroundColor: "#004080",
  })
  expect(screen.getByTestId("mui4-box")).not.toHaveStyle({
    backgroundColor: "#008080",
  })
})

test("It provides theme styles to MUI5 components", () => {
  render(
    <ThemeProvider>
      <TestComponentMUI5 />
    </ThemeProvider>,
  )
  expect(screen.getByTestId("mui5-box")).toHaveStyle({
    backgroundColor: "#008080",
  })
  expect(screen.getByTestId("mui5-box")).not.toHaveStyle({
    backgroundColor: "#004080",
  })
})
