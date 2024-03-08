import React from "react"
import { render, screen } from "@testing-library/react"
import { ProteinInfoLoader } from "./ProteinInfoLoader"

// eslint-disable-next-line import/no-commonjs, unicorn/prefer-module -- ESM not supported by default as of Jest 29
const useRouter = jest.spyOn(require("next/router"), "useRouter")

const gene = "DDB_G123456"

describe("components/ProteinInformation/ProteinInfoLoader", () => {
  it("should render skeleton loader", () => {
    useRouter.mockImplementation(() => ({
      pathname: `gene/${gene}/goannotations`,
    }))
    render(<ProteinInfoLoader />)
    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })
})
