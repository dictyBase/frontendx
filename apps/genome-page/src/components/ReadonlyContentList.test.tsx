import { render, screen } from "@testing-library/react"
import { ReadonlyContentList } from "./ReadonlyContentList"

test("should render all items as chips", () => {
  const contentList = ["item1", "item2", "item3"]

  render(<ReadonlyContentList contentList={contentList} />)

  expect(screen.getByText("item1")).toBeInTheDocument()
  expect(screen.getByText("item2")).toBeInTheDocument()
  expect(screen.getByText("item3")).toBeInTheDocument()
})

test("should render empty when contentList is empty", () => {
  const contentList: Array<string> = []

  const { container } = render(
    <ReadonlyContentList contentList={contentList} />,
  )

  expect(container.querySelector('[role="button"]')).not.toBeInTheDocument()
})

test("should render single item", () => {
  const contentList = ["single-item"]

  render(<ReadonlyContentList contentList={contentList} />)

  expect(screen.getByText("single-item")).toBeInTheDocument()
})

test("should render multiple items in correct order", () => {
  const contentList = ["first", "second", "third", "fourth"]

  render(<ReadonlyContentList contentList={contentList} />)

  const chips = screen.getAllByText(/first|second|third|fourth/)
  expect(chips).toHaveLength(4)
  expect(chips[0]).toHaveTextContent("first")
  expect(chips[1]).toHaveTextContent("second")
  expect(chips[2]).toHaveTextContent("third")
  expect(chips[3]).toHaveTextContent("fourth")
})
