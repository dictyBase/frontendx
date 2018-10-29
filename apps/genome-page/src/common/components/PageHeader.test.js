import React from "react"
import { mount } from "enzyme"
import PageHeader from "./PageHeader"
import { BrowserRouter } from "react-router-dom"

describe("PageHeader", () => {
  const props = {
    name: "far1",
  }

  const wrapper = mount(
    <BrowserRouter>
      <PageHeader {...props} />
    </BrowserRouter>,
  )

  it("always renders one h2 element", () => {
    expect(wrapper.find("h2").length).toBe(1)
  })

  it("displays the correct text", () => {
    expect(wrapper.find("h2").contains("Gene Information")).toBe(true)
  })
})
