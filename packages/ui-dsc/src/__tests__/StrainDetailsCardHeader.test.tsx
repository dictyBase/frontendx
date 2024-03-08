import { vi, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { StrainDetailsCardHeader } from "../catalog/StrainDetailsCardHeader"
import { fees } from "../fees"

const handleChangeSpy = vi.fn()
const properties = {
  value: 0,
  handleChange: handleChangeSpy,
  phenotypeLength: 3,
  cartData: {
    id: "DBS123456",
    label: "test1",
    summary: "this is the best test strain in the world",
    fee: fees.STRAIN_FEE,

    in_stock: true,
    quantity: 1,
  },
  inStock: true,
}

test("renders expected tabs", () => {
  render(<StrainDetailsCardHeader {...properties} />)
  const tabs = screen.getAllByRole("tab")
  expect(tabs).toHaveLength(2)
  expect(
    screen.getByRole("tab", { name: "Strain Details" }),
  ).toBeInTheDocument()
  expect(screen.getByRole("tab", { name: "Phenotypes 3" })).toBeInTheDocument()
})
test("calls handleChange on tab click", async () => {
  render(<StrainDetailsCardHeader {...properties} />)
  const phenotypeTab = screen.getByRole("tab", { name: "Phenotypes 3" })
  await userEvent.click(phenotypeTab)
  expect(handleChangeSpy).toHaveBeenCalledTimes(1)
})
