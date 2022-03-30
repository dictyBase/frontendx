import { render, screen } from "@testing-library/react"
import React from "react"
import OrthologsLoader from './OrthologsLoader';

const gene = "sadA"

jest.mock("next/router", () => {
  const useRouter = () => {
    push: (value: string) => value
  }
  return {
    useRouter,
  }
})

describe("features/Orthologs/OrthologsLoader", () => {
  it("should render loader", () => {
    render(<OrthologsLoader />)

    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })
})
