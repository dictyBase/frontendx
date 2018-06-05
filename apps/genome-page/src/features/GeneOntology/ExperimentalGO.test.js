import React from "react"
import renderer from "react-test-renderer"
import { ExperimentalGO } from "./ExperimentalGO"
jest.mock("react-virtualized")

test("matching a snapshot of ExperimentalGO", () => {
  const goData = {
    data: [
      {
        term: "ATP-gated ion channel activity",
        evidence: "IMP",
        with: "",
        reference: "Sivaramakrishnan & Fountain (2012)",
        date: "21-02-2014",
        source: "DDB",
      },
      {
        term: "calcium ion transmembrane transport requires ATP",
        evidence: "IGI",
        with: "p2xA p2xC p2xD p2xE",
        reference: "Sivaramakrishnan & Fountain (2012)",
        date: "21-02-2014",
        source: "DDB",
      },
    ],
  }
  const fetchData = () => {}

  const component = renderer.create(
    <ExperimentalGO goData={goData} fetchData={fetchData} />,
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
