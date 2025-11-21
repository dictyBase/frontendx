import { vi, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { WindowHeightWrapper } from "../WindowHeightWrapper"

const mockUseWindowSize = vi.fn()

vi.mock("@dictybase/hook", () => ({
  useWindowSize: () => mockUseWindowSize(),
}))

test("should render children", () => {
  mockUseWindowSize.mockReturnValue({ width: 1024, height: 768 })
  render(
    <WindowHeightWrapper>
      <div>Test Child Content</div>
    </WindowHeightWrapper>,
  )
  expect(screen.getByText(/Test Child Content/)).toBeInTheDocument()
})

test("should be 60% of window height", () => {
  const windowHeight = 1000
  mockUseWindowSize.mockReturnValue({ width: 1024, height: windowHeight })

  const { container } = render(
    <WindowHeightWrapper>
      <div>Test Content</div>
    </WindowHeightWrapper>,
  )

  const wrapperElement = container.firstChild as HTMLElement
  const expectedHeight = windowHeight * 0.6

  expect(wrapperElement).toHaveStyle({ height: `${expectedHeight}px` })
})
