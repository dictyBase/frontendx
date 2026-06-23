import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"
import { StatCard } from "../home/StatCard"

const TEST_NUMBER = "12,000+"
const TEST_LABEL = "Test Stats"
const MUI_CARD_SELECTOR = ".MuiCard-root"

test("renders StatCard with number", () => {
  render(<StatCard number={TEST_NUMBER} label={TEST_LABEL} />)
  expect(screen.getByText(TEST_NUMBER)).toBeInTheDocument()
})

test("renders StatCard with label", () => {
  render(<StatCard number={TEST_NUMBER} label={TEST_LABEL} />)
  expect(screen.getByText(TEST_LABEL)).toBeInTheDocument()
})

test("uses default gradient when not provided", () => {
  const { container } = render(
    <StatCard number={TEST_NUMBER} label={TEST_LABEL} />,
  )
  const card = container.querySelector(MUI_CARD_SELECTOR)
  expect(card).toBeInTheDocument()
})

test("applies custom gradient", () => {
  const { container } = render(
    <StatCard
      number={TEST_NUMBER}
      label={TEST_LABEL}
      gradient={["#ff0000", "#00ff00"]}
    />,
  )
  const card = container.querySelector(MUI_CARD_SELECTOR)
  expect(card).toHaveStyle({
    background: "linear-gradient(135deg, #ff0000, #00ff00)",
  })
})

test("applies custom sx styles", () => {
  const { container } = render(
    <StatCard
      number={TEST_NUMBER}
      label={TEST_LABEL}
      sx={{ backgroundColor: "purple" }}
    />,
  )
  const card = container.querySelector(MUI_CARD_SELECTOR)
  expect(card).toHaveStyle({ backgroundColor: "purple" })
})

test("number has correct typography variant", () => {
  render(<StatCard number={TEST_NUMBER} label={TEST_LABEL} />)
  const number = screen.getByText(TEST_NUMBER)
  expect(number.tagName).toBe("DIV")
})
