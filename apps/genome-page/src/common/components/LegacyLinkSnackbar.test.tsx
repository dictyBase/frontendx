import React from "react"
import { render, screen } from "@testing-library/react"
import LegacyLinkSnackbar from "./LegacyLinkSnackbar"

describe("common/components/LegacyLinkSnackbar", () => {
  it("should render correct legacy URL", () => {
    render(<LegacyLinkSnackbar gene="DDB_G123456" />)
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "http://dictybase.org/gene/DDB_G123456",
    )
  })
})
