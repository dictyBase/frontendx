import { expect, test } from "vitest"
import { createMemoryRouter, RouterProvider } from "react-router-dom"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { PublicationRow } from "./PublicationRow"

const mockPublication = {
  id: "12345",
  title: "Test Publication Title",
  journal: "Test Journal",
  pages: "123-456",
  pub_type: "research-article",
  source: "source",
  authors: [
    { last_name: "Smith", rank: "1" },
    { last_name: "Johnson", rank: "2" },
  ],
  related_genes: [
    { id: "gene1", name: "geneA" },
    { id: "gene2", name: "geneB" },
    { id: "gene3", name: "geneC" },
  ],
}
test("renders publication details correctly", () => {
  const router = createMemoryRouter([
    {
      index: true,
      element: <PublicationRow publication={mockPublication} />,
    },
    {
      path: ":id",
      element: <> Gene Page </>,
    },
  ])

  render(<RouterProvider router={router} />)

  // Check if the publication details are rendered correctly
  expect(screen.getByText(/Smith & Johnson/)).toBeInTheDocument()
  expect(screen.getByText(/Test Publication Title/)).toBeInTheDocument()
  expect(screen.getByText(/Test Journal/)).toBeInTheDocument()
  expect(screen.getByText(/123-456/)).toBeInTheDocument()

  // Check if all gene chips are rendered
  expect(screen.getByText("geneA")).toBeInTheDocument()
  expect(screen.getByText("geneB")).toBeInTheDocument()
  expect(screen.getByText("geneC")).toBeInTheDocument()
})

test("navigates to the correct gene route when a gene chip is clicked", async () => {
  const user = userEvent.setup()
  const router = createMemoryRouter([
    {
      index: true,
      element: <PublicationRow publication={mockPublication} />,
    },
    {
      path: ":id",
      element: <> Gene Page </>,
    },
  ])

  render(<RouterProvider router={router} />)

  // Get gene chip and click it
  const geneChip = screen.getByText("geneB")
  await user.click(geneChip)

  // Verify navigation occurred by checking for the new page content
  expect(screen.getByText("Gene Page")).toBeInTheDocument()
})

test("navigates to different gene routes when different chips are clicked", async () => {
  const user = userEvent.setup()
  const router = createMemoryRouter([
    {
      index: true,
      element: <PublicationRow publication={mockPublication} />,
    },
    {
      path: ":id",
      element: <> Gene Page </>,
    },
  ])

  render(<RouterProvider router={router} />)

  // Click the first gene chip
  const geneChipA = screen.getByText("geneA")
  await user.click(geneChipA)
  expect(screen.getByText("Gene Page")).toBeInTheDocument()

  // Navigate back to test another chip
  await router.navigate(-1)

  // Click the third gene chip
  const geneChipC = screen.getByText("geneC")
  await user.click(geneChipC)
  expect(screen.getByText("Gene Page")).toBeInTheDocument()
})
