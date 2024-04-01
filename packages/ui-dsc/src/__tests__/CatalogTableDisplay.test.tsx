import { vi, describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import { RefObject } from "react"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import {
  abbreviateStringToLength,
  cellFunction,
  CatalogRows,
  CatalogTableHeader,
  PlasmidCatalogTableDisplay,
} from "../catalog/CatalogTableDisplay"
import { mockPlasmids } from "../mocks/mockPlasmids"

vi.mock("@material-ui/core/styles", async () => {
  const originalModule = (await vi.importActual(
    "@material-ui/core/styles",
  )) as typeof import("@material-ui/core/styles")
  return {
    ...originalModule,
    // eslint-disable-next-line unicorn/consistent-function-scoping
    makeStyles: () => () => ({
      row: {},
    }),
  }
})

describe("abbreviateStringToLength", () => {
  const testInputString = "This string has length 25"
  test("returns a string slice of a given length", () => {
    const abbreviateString = abbreviateStringToLength(11)
    const result = abbreviateString(testInputString)
    expect(result).toHaveLength(14)
    expect(result).toBe("This string...")
  })
  test("if the length argument is greater than the length of the input string, return the entire input string", () => {
    const abbreviateString = abbreviateStringToLength(100)
    const result = abbreviateString(testInputString)
    expect(result).toHaveLength(25)
    expect(result).toBe(testInputString)
  })
})

describe("cellFunction", () => {
  const testStrain = {
    id: "test_id",
    label: "test_label",
    summary: "test_summary",
    in_stock: true,
  }

  test("renders strain data in cells", () => {
    render(<MemoryRouter>{cellFunction(testStrain)}</MemoryRouter>)
    expect(
      screen.getByRole("cell", { name: testStrain.id }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("cell", { name: testStrain.label }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("cell", { name: testStrain.summary }),
    ).toBeInTheDocument()
  })
  test("When the cell label is clicked, the browser navigates to the strain details page", async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/strains/:id" element={<> Strain Details </>} />
        </Routes>
        {cellFunction(testStrain)}
      </MemoryRouter>,
    )
    await userEvent.click(screen.getByRole("link"))
    expect(screen.getByText("Strain Details")).toBeInTheDocument()
  })
})

describe("rowFunction", () => {
  const testListStrains = [
    {
      id: "test id 1",
      label: "test label 1",
      summary: "test summary 1",
      in_stock: true,
    },
    {
      id: "test id 2",
      label: "test label 2",
      summary: "test summary 2",
      in_stock: true,
    },
    {
      id: "test id 3",
      label: "test label 3",
      summary: "test summary 3",
      in_stock: true,
    },
  ]
  test("given a plasmid array, render a table row for each element in the array", () => {
    render(
      <MemoryRouter>
        <CatalogRows
          items={mockPlasmids}
          nextCursor={0}
          targetReference={{} as RefObject<HTMLTableRowElement>}
        />
      </MemoryRouter>,
    )
    expect(screen.getAllByRole("row")).toHaveLength(mockPlasmids.length)
  })

  test("given a strains array, render a table row for each element in the array", () => {
    render(
      <MemoryRouter>
        <CatalogRows
          items={testListStrains}
          nextCursor={0}
          targetReference={{} as RefObject<HTMLTableRowElement>}
        />
      </MemoryRouter>,
    )
    expect(screen.getAllByRole("row")).toHaveLength(testListStrains.length)
  })

  test("if nextCursor is greater than 1, render an additional table row for that indicates fetching more data", () => {
    render(
      <MemoryRouter>
        <CatalogRows
          items={testListStrains}
          nextCursor={4}
          targetReference={{} as RefObject<HTMLTableRowElement>}
        />
      </MemoryRouter>,
    )
    expect(screen.getAllByRole("row")).toHaveLength(testListStrains.length + 1)
  })
})

describe("CatalogTableHeader", () => {
  const tableHeaders = ["cell 1", "cell 2", "cell 3"]
  test("given an array of strings, the component renders a table cell for each string", () => {
    render(<CatalogTableHeader headers={tableHeaders} />)
    expect(screen.getByRole("cell", { name: "cell 1" })).toBeInTheDocument()
    expect(screen.getByRole("cell", { name: "cell 2" })).toBeInTheDocument()
    expect(screen.getByRole("cell", { name: "cell 3" })).toBeInTheDocument()
  })

  test("if no header prop is passed, use the default table headers ", () => {
    render(<CatalogTableHeader />)
    expect(
      screen.getByRole("cell", { name: "Strain Descriptor" }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("cell", { name: "Strain Summary" }),
    ).toBeInTheDocument()
    expect(screen.getByRole("cell", { name: "Strain ID" })).toBeInTheDocument()
  })
})

describe("PlasmidCatalogTableDisplay", () => {
  const testCases = pipe(
    mockPlasmids,
    Amap(({ name }) => name),
  )
  const mockPlasmidData = { listPlasmids: { plasmids: mockPlasmids } }
  test.each(testCases)(
    "properly displays row with name of plasmid: %s",
    (a) => {
      render(
        <MemoryRouter>
          <PlasmidCatalogTableDisplay
            data={mockPlasmidData}
            dataField="listPlasmids"
            target={{} as RefObject<HTMLTableRowElement>}
          />
        </MemoryRouter>,
      )
      expect(screen.getByText(a)).toBeInTheDocument()
    },
  )
})
