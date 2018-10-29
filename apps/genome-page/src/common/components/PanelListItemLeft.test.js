import React from "react"
import { shallow } from "enzyme"
import PanelListItemLeft from "./PanelListItemLeft"
import TableCell from "@material-ui/core/TableCell"

// two options for tests for components that use Material-UI withStyles:
// 1) use dive() for shallow rendering
// 2) use mount instead of shallow
// https://github.com/mui-org/material-ui/issues/9266

describe("PanelListItemLeft", () => {
  const props = {
    title: "Molecular Function",
  }
  const wrapper = shallow(<PanelListItemLeft {...props} />)
  const cell = wrapper.dive().find(TableCell)

  it("always renders one TableCell component", () => {
    expect(cell.length).toBe(1)
  })

  it("displays the correct title", () => {
    expect(cell.contains("Molecular Function")).toBe(true)
  })
})
