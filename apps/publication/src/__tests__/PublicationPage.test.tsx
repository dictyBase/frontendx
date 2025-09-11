import React from "react"
import { render, screen } from "@testing-library/react"
import { data } from "../mocks/mockdata"
import { PublicationPage } from "../components/PublicationPage"

test("displays expected data", () => {
  render(<PublicationPage publication={data.publication} />)

  expect(
    screen.getByText(
      "This is a fake publication title that should be at least ten words",
    ),
  ).toBeInTheDocument()
  // shows depositor
  const { abstract } = data.publication
  expect(screen.getByText(abstract)).toBeInTheDocument()
})
