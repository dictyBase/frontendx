import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Gene } from "dicty-graphql-schema"
import { GenesDisplay } from "../catalog/GenesDisplay"

test("renders one LinkTag for every gene", () => {
  const genes = [
    { id: "DDB_G123456", name: "sadA" },
    { id: "DDB_9882111", name: "gflB" },
  ] as Array<Gene>
  render(<GenesDisplay genes={genes} />)
  const links = screen.getAllByRole("link")
  expect(links).toHaveLength(2)
  expect(links[0]).toHaveTextContent(/sadA/)
  expect(links[1]).toHaveTextContent(/gflB/)
})

test("renders no LinkTags if gene list is empty", () => {
  const genes = [] as Array<Gene>
  render(<GenesDisplay genes={genes} />)
  const links = screen.queryByRole("link")
  expect(links).not.toBeInTheDocument()
})
