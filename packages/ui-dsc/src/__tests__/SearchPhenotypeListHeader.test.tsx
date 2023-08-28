import { render, screen } from "@testing-library/react"
import { ThemeProvider } from "@material-ui/core"
import { createTheme } from "@material-ui/core/styles"
import { SearchPhenotypeListHeader } from "../catalog/SearchPhenotypeListHeader"

describe("Stocks/SearchResults/PhenotypeListHeader", () => {
  describe("initial render", () => {
    const theme = createTheme({
      props: { MuiWithWidth: { initialWidth: "lg" } },
    })
    // need to add theme to render with large screen
    // this allows all three headers to show
    render(
      <ThemeProvider theme={theme}>
        <SearchPhenotypeListHeader />
      </ThemeProvider>,
    )
    it("renders the three expected list headers", () => {
      expect(screen.getByText("Strain Descriptor")).toBeInTheDocument()
      expect(screen.getByText("Associated Gene(s)")).toBeInTheDocument()
      expect(screen.getByText("Reference")).toBeInTheDocument()
    })
  })
})
