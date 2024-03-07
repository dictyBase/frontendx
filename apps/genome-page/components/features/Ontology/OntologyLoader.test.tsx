import React from "react"
import { render, screen } from "@testing-library/react"
import { OntologyLoader } from "./OntologyLoader"

// eslint-disable-next-line import/no-commonjs, unicorn/prefer-module -- ESM not supported by default as of Jest 29
const useRouter = jest.spyOn(require("next/router"), "useRouter")

const gene = "DDB_G123456"

describe("components/OntologyLoader", () => {
  it("should render skeleton loader", () => {
    useRouter.mockImplementation(() => ({
      pathname: `gene/${gene}/goannotations`,
    }))
    render(<OntologyLoader />)
    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })
})
