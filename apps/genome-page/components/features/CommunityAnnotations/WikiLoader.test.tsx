import React from "react"
import { render, screen } from "@testing-library/react"
import WikiLoader from "./WikiLoader"
const useRouter = jest.spyOn(require("next/router"), "useRouter")
const gene = "ada2"

describe("CommunityAnnotations/WikiLoader", () => {
  it("should render skeleton loader", () => {
    useRouter.mockImplementation(() => ({
      pathname: `gene/${gene}/communityannotations`,
    }))
    render(<WikiLoader />)
    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()

    // Tabs should load
    expect(screen.getByText("Gene Summary")).toBeInTheDocument()
    expect(screen.getByText("Gene Ontology")).toBeInTheDocument()
    expect(screen.getByText("Orthologs")).toBeInTheDocument()
    expect(screen.getByText("Phenotypes")).toBeInTheDocument()
    expect(screen.getByText("References")).toBeInTheDocument()
    expect(screen.getByText("Annotations")).toBeInTheDocument()
  })
})
