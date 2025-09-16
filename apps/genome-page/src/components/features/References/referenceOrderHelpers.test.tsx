import { mockReferencesData } from "mocks/mockReferencesData"
import { Gene } from "dicty-graphql-schema"
import { ordByOldest } from "./referenceOrderHelpers"

const missingPubDate = {
  related_genes: [] as Array<Gene>,
  id: "18168",
  authors: [{ last_name: "Tun", first_name: "", initials: "", rank: "" }],
  title: "Invalid Publish Date",
  journal: "dictyBase",
  pages: ":",
  abstract: "",
  pub_type: "",
  source: "",
  doi: "",
  // eslint-disable-next-line unicorn/no-null
  pub_date: null,
  volume: "",
  issn: "",
  issue: "",
  status: "",
}

describe("ordByOldest", () => {
  test("Publications with an invalid pub_date format equal to any other publication", () => {
    expect(ordByOldest.compare(missingPubDate, mockReferencesData[0])).toEqual(
      0,
    )
  })
})
