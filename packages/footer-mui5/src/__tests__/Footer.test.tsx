import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Footer } from "../functional/Footer"

const testData = [
  {
    url: `/research/techniques/show`,
    label: "Techniques",
  },
  {
    url: `/research/teach/show`,
    label: "Teaching Protocols",
  },
  {
    url: `/stockcenter`,
    label: "Dicty Stock Center",
  },
  {
    url: "http://dictybase.org/tools/jbrowse/?data=data%2Fjbrowse%2Fdiscoideum&loc=6%3A1..50022&tracks=reference%2Cgene%2Ctranscript&highlight=",
    label: "Genome Browser",
  },
]

test.each([
  {
    url: `/research/techniques/show`,
    label: "Techniques",
  },
  {
    url: `/research/teach/show`,
    label: "Teaching Protocols",
  },
  {
    url: `/stockcenter`,
    label: "Dicty Stock Center",
  },
  {
    url: "http://dictybase.org/tools/jbrowse/?data=data%2Fjbrowse%2Fdiscoideum&loc=6%3A1..50022&tracks=reference%2Cgene%2Ctranscript&highlight=",
    label: "Genome Browser",
  },
])("renders footer with links of footer data with $label and $url",
  ({ label, url }) => {
    render(<Footer data={testData} />)

    const link = screen.getByRole("link", { name: label })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", url)
  }
)
