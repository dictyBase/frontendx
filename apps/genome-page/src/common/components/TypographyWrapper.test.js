import React from "react"
import { mount } from "enzyme"
import TypographyWrapper from "./TypographyWrapper"
import Typography from "@material-ui/core/Typography"

describe("TypographyWrapper", () => {
  const wrapper = mount(<TypographyWrapper>Example text</TypographyWrapper>)

  it("always renders one Typography component", () => {
    expect(wrapper.find(Typography).length).toBe(1)
  })

  it("displays the correct text", () => {
    expect(wrapper.find(Typography).contains("Example text")).toBe(true)
  })
})
