import { test, assert, expect, describe } from "vitest"

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

    assert(lastItem)
    expect(lastItem.link).toBe(
      "https://betastorage.dictybase.org/uploads/documents/DSC%20SOP.pdf",
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
    assert(exploreSection?.attributes.items[0])
    expect(exploreSection?.attributes.items[0].link).toBe("/explore/art/show")
  })
})

describe("formatNavbarData", () => {
  const mockNavbarItems = {
    data: [
      {
        type: "test",
        id: "1",
        attributes: {
          display: "Test Section",
          items: [
            {
              label: "Test Item 1",
              link: "/test1",
            },
            {
              label: "Test Item 2",
              link: "/test2",
            },
          ],
        },
      },
      {
        type: "another",
        id: "2",
        attributes: {
          display: "Another Section",
          items: [
            {
              label: "Another Item",
              link: "/another",
            },
          ],
        },
      },
    ],
  }

  test("should convert navbar items to dicty-navbar format", () => {
    const formatted = formatNavbarData(mockNavbarItems)

    expect(formatted).toHaveLength(2)

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
    const formatted = formatNavbarData(mockNavbarItems)
    const firstSection = formatted[0]
    assert(firstSection)
    expect(firstSection.title).toBe("Test Section")
    expect(firstSection.dropdown).toBe(true)
    expect(firstSection.items).toEqual([
      {
        name: "Test Item 1",
        href: "/test1",
      },
      {
        name: "Test Item 2",
        href: "/test2",
      },
    ])

    const secondSection = formatted[1]
    assert(secondSection)
    expect(secondSection.title).toBe("Another Section")
    expect(secondSection.items).toEqual([
      {
        name: "Another Item",
        href: "/another",
      },
    ])
  })
})
