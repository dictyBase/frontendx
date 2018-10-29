import React from "react"
import { shallow } from "enzyme"
import PanelListItemRight from "./PanelListItemRight"
import TableCell from "@material-ui/core/TableCell"

// two options for tests for components that use Material-UI withStyles:
// 1) use dive() for shallow rendering
// 2) use mount instead of shallow
// https://github.com/mui-org/material-ui/issues/9266

describe("PanelListItemRight", () => {
  const wrapper = shallow(
    <PanelListItemRight>nucleic acid binding (IEA)</PanelListItemRight>,
  )
  const cell = wrapper.dive().find(TableCell)

  it("always renders one TableCell component", () => {
    expect(cell.length).toBe(1)
  })

  it("displays the correct title", () => {
    expect(cell.contains("nucleic acid binding (IEA)")).toBe(true)
  })
})
