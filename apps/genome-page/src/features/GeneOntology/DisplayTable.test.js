import React from "react"
import renderer from "react-test-renderer"
import DisplayTable from "./DisplayTable"

test("matching a snapshot of DisplayTable", () => {
  const data = [
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
  ]
  const fetchData = () => {}

  const component = renderer.create(
    <DisplayTable data={data} fetchData={fetchData} />,
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
