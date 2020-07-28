import React from "react"
import qualifierFormatter from "./qualifierFormatter"

describe("qualifierFormatter", () => {
  it("returns correct formatting for NOT", () => {
    // reason for stringify:
    // https://github.com/facebook/jest/issues/5998#issuecomment-382265119
    expect(
      JSON.stringify(qualifierFormatter("NOT|acts_upstream_of_or_within")),
    ).toBe(
      JSON.stringify(
        <React.Fragment>
          <strong>NOT </strong> <em>acts_upstream_of_or_within</em>
        </React.Fragment>,
      ),
    )
  })
  it("returns correct formatting without NOT", () => {
    expect(
      JSON.stringify(qualifierFormatter("acts_upstream_of_or_within")),
    ).toBe(JSON.stringify(<em>acts_upstream_of_or_within</em>))
  })
})
