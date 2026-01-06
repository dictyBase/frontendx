import { render, screen } from "@testing-library/react"
import { ThemeProvider, Theme, StyledEngineProvider, adaptV4Theme } from "@mui/material";
import { createTheme } from "@mui/material/styles"
import { SearchPhenotypeListHeader } from "../catalog/SearchPhenotypeListHeader"


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


describe("Stocks/SearchResults/PhenotypeListHeader", () => {
  describe("initial render", () => {
    const theme = createTheme(adaptV4Theme({
      props: { MuiWithWidth: { initialWidth: "lg" } },
    }))
    // need to add theme to render with large screen
    // this allows all three headers to show
    render(
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <SearchPhenotypeListHeader />
        </ThemeProvider>
      </StyledEngineProvider>,
    )
    it("renders the three expected list headers", () => {
      expect(screen.getByText("Strain Descriptor")).toBeInTheDocument()
      expect(screen.getByText("Associated Gene(s)")).toBeInTheDocument()
      expect(screen.getByText("Reference")).toBeInTheDocument()
    })
  })
})
