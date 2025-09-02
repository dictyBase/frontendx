import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Button } from "@material-ui/core"
import { ActionBar } from "../common/components/ActionBar"

test("renders with description element and single child", () => {
  const descriptionElement = <span>Test Description</span>
  const childElement = <Button>Test Button</Button>

  render(
    <ActionBar descriptionElement={descriptionElement}>
      {childElement}
    </ActionBar>
  )

  expect(screen.getByText("Test Description")).toBeInTheDocument()
  expect(screen.getByRole("button", { name: "Test Button" })).toBeInTheDocument()
  expect(screen.getByTestId("info-page-toolbar")).toBeInTheDocument()
})

test("renders with multiple children as array", () => {
  const descriptionElement = <span>Multiple Actions</span>
  const children = [
    <Button key="1">Action 1</Button>,
    <Button key="2">Action 2</Button>,
    <Button key="3">Action 3</Button>
  ]

  render(
    <ActionBar descriptionElement={descriptionElement}>
      {children}
    </ActionBar>
  )

  expect(screen.getByText("Multiple Actions")).toBeInTheDocument()
  expect(screen.getByRole("button", { name: "Action 1" })).toBeInTheDocument()
  expect(screen.getByRole("button", { name: "Action 2" })).toBeInTheDocument()
  expect(screen.getByRole("button", { name: "Action 3" })).toBeInTheDocument()
})

test("applies correct CSS classes", () => {
  const descriptionElement = <span>Styled Test</span>
  const childElement = <Button>Styled Button</Button>

  render(
    <ActionBar descriptionElement={descriptionElement}>
      {childElement}
    </ActionBar>
  )

  const toolbar = screen.getByTestId("info-page-toolbar")
  expect(toolbar).toHaveClass("makeStyles-toolbar-1")
})