import { render, screen } from "@testing-library/react"
import { makeStyles as makeStylesMUI5 } from "tss-react/mui"
import { Box as BoxMUI4, makeStyles as makeStylesMUI4 } from "@material-ui/core"
import { Box as BoxMUI5 } from "@mui/material"
import { ThemeProvider } from "../components/layout/ThemeProvider"

const useMUI4ThemeStyles = makeStylesMUI4((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
}))

const useMUI5ThemeStyles = makeStylesMUI5()((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
  },
}))

const TestComponentMUI4 = () => {
  const classes = useMUI4ThemeStyles()
  return (
    <BoxMUI4 data-testid="mui4-box" className={classes.root}>
      test
    </BoxMUI4>
  )
}

const TestComponentMUI5 = () => {
  const { classes } = useMUI5ThemeStyles()
  return (
    <BoxMUI5 data-testid="mui5-box" className={classes.root}>
      test
    </BoxMUI5>
  )
}
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
