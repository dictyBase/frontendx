import { render, screen } from "@testing-library/react"
import React from "react"
import BlastLoader from "./BlastLoader"

const gene = "sadA"

jest.mock("next/router", () => {
  const useRouter = () => {
    push: (value: string) => value
  }
  return {
    useRouter,
  }
})

describe("features/blast/BlastLoader", () => {
  it("should render loader", () => {
    render(<BlastLoader />)

    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })
})
