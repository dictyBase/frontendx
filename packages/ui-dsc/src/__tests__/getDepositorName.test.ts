import { getDepositorName } from "../utils/getDepositorName"

describe("features/Stocks/Details/utils/getDepositorName", () => {
  it("should return full name", () => {
    const depositor = {
      firstName: "Jackie",
      lastName: "Chiles",
    }
    expect(getDepositorName(depositor)).toEqual("Jackie Chiles")
  })

  it("should return empty string", () => {
    expect(getDepositorName({})).toEqual("")
  })
})
