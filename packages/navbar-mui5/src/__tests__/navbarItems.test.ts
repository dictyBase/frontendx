import { test, expect, describe } from "vitest"
import { createNavbarItems, formatNavbarData } from "../navbarItems"

describe("createNavbarItems", () => {
  const frontPageUrl = "https://frontpage.example.com"
  const stockCenterUrl = "https://stockcenter.example.com"

  test("should return navbar items with correct structure", () => {
    const result = createNavbarItems(frontPageUrl, stockCenterUrl)

    expect(result).toHaveProperty("data")
    expect(result.data).toBeInstanceOf(Array)
    expect(result.data).toHaveLength(6)
  })

  test("should include all expected sections", () => {
    const result = createNavbarItems(frontPageUrl, stockCenterUrl)
    const sectionTypes = result.data.map((item) => item.type)

    expect(sectionTypes).toEqual([
      "genomes",
      "tools",
      "explore",
      "research",
      "dsc",
      "community",
    ])
  })

  test("should have correct section displays", () => {
    const result = createNavbarItems(frontPageUrl, stockCenterUrl)
    const displays = result.data.map((item) => item.attributes.display)

    expect(displays).toEqual([
      "Genomes",
      "Tools",
      "Explore",
      "Research",
      "Dicty Stock Center",
      "Community",
    ])
  })

  test("should interpolate frontPageUrl in explore section links", () => {
    const result = createNavbarItems(frontPageUrl, stockCenterUrl)
    const exploreSection = result.data.find((item) => item.type === "explore")

    expect(exploreSection).toBeDefined()
    exploreSection?.attributes.items.forEach((item) => {
      expect(item.link).toContain(frontPageUrl)
    })
  })

  test("should interpolate frontPageUrl in research section links", () => {
    const result = createNavbarItems(frontPageUrl, stockCenterUrl)
    const researchSection = result.data.find((item) => item.type === "research")

    expect(researchSection).toBeDefined()
    researchSection?.attributes.items.forEach((item) => {
      expect(item.link).toContain(frontPageUrl)
    })
  })

  test("should interpolate stockCenterUrl in dsc section links", () => {
    const result = createNavbarItems(frontPageUrl, stockCenterUrl)
    const dscSection = result.data.find((item) => item.type === "dsc")

    expect(dscSection).toBeDefined()
    const dscItems = dscSection?.attributes.items || []

    // All items except the last one (Standard Operating Procedures) should use stockCenterUrl
    dscItems.slice(0, -1).forEach((item) => {
      expect(item.link).toContain(stockCenterUrl)
    })

    // Last item should be the external Northwestern box link
    const lastItem = dscItems.at(-1)
    // @ts-ignore
    expect(lastItem.link).toBe(
      "https://northwestern.box.com/s/p0f8m70whgiuib2u0wt8gtn497ncmq8i",
    )
  })

  test("should interpolate frontPageUrl in community section links", () => {
    const result = createNavbarItems(frontPageUrl, stockCenterUrl)
    const communitySection = result.data.find(
      (item) => item.type === "community",
    )

    expect(communitySection).toBeDefined()
    communitySection?.attributes.items.forEach((item) => {
      expect(item.link).toContain(frontPageUrl)
    })
  })

  test("should handle empty URLs", () => {
    const result = createNavbarItems("", "")

    expect(result.data).toHaveLength(6)

    // Check that sections still work with empty URLs
    const exploreSection = result.data.find((item) => item.type === "explore")
    // @ts-ignore
    expect(exploreSection?.attributes.items[0].link).toBe("/explore/art/show")
  })
})

describe("formatNavbarData", () => {
  test("should convert navbar items to dicty-navbar format", () => {
    const frontPageUrl = "https://frontpage.example.com"
    const stockCenterUrl = "https://stockcenter.example.com"
    const navbarItems = createNavbarItems(frontPageUrl, stockCenterUrl)

    const formatted = formatNavbarData(navbarItems)

    expect(formatted).toHaveLength(6)

    formatted.forEach((item) => {
      expect(item).toHaveProperty("dropdown", true)
      expect(item).toHaveProperty("title")
      expect(item).toHaveProperty("items")
      expect(item.items).toBeInstanceOf(Array)

      item.items.forEach((subItem) => {
        expect(subItem).toHaveProperty("name")
        expect(subItem).toHaveProperty("href")
      })
    })
  })

  test("should correctly map item properties", () => {
    const navbarItems = createNavbarItems(
      "https://test.com",
      "https://stock.com",
    )
    const formatted = formatNavbarData(navbarItems)

    const genomesSection = formatted[0]
    // @ts-ignore
    expect(genomesSection.title).toBe("Genomes")
    // @ts-ignore
    expect(genomesSection.items[0]).toEqual({
      name: "Dictyostelium discoideum AX4",
      href: "/",
    })
  })
})
