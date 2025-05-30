import { ListPublicationsWithGeneQuery } from "dicty-graphql-schema"
import { filterPublications } from "./filterPublications"

type Publications = NonNullable<
  ListPublicationsWithGeneQuery["listPublicationsWithGene"]
>

describe("filterPublications", () => {
  // Mock publication data for testing
  const mockPublications: Publications = [
    {
      id: "1",
      title: "Dictyostelium discoideum: a model system for cell biology",
      abstract: "This is an abstract about Dictyostelium",
      journal: "Nature Reviews",
      pub_date: "2020-01-01",
      authors: [
        {
          last_name: "Smith",
          first_name: "John",
          initials: "J",
          rank: 1,
        },
        {
          last_name: "Johnson",
          first_name: "Mary",
          initials: "M",
          rank: 2,
        },
      ],
      related_genes: [
        {
          id: "DDB_G0123456",
          name: "sadA",
        },
        {
          id: "DDB_G0654321",
          name: "pkaC",
        },
      ],
    },
    {
      id: "2",
      title: "Cell signaling in Dictyostelium development",
      abstract: "This paper discusses cell signaling",
      journal: "Cell",
      pub_date: "2021-02-15",
      authors: [
        {
          last_name: "Williams",
          first_name: "Robert",
          initials: "R",
          rank: 1,
        },
        {
          last_name: "Brown",
          first_name: "Sarah",
          initials: "S",
          rank: 2,
        },
      ],
      related_genes: [
        {
          id: "DDB_G0987654",
          name: "gpaB",
        },
      ],
    },
    {
      id: "3",
      title: "Molecular mechanisms of chemotaxis",
      abstract: "A study on chemotaxis in Dictyostelium",
      journal: "Science",
      pub_date: "2019-11-30",
      authors: [
        {
          last_name: "Smith",
          first_name: "Jane",
          initials: "J",
          rank: 1,
        },
      ],
      related_genes: [
        {
          id: "DDB_G0123456",
          name: "sadA",
        },
      ],
    },
  ]

  test("should filter publications by title", () => {
    const searchParameters = { title: "cell" }
    const filtered = filterPublications(mockPublications, searchParameters)

    expect(filtered).toHaveLength(2)
    expect(filtered[0].id).toBe("1")
    expect(filtered[1].id).toBe("2")
  })

  test("should filter publications by author", () => {
    const searchParameters = { author: "smith" }
    const filtered = filterPublications(mockPublications, searchParameters)

    expect(filtered).toHaveLength(2)
    expect(filtered[0].id).toBe("1")
    expect(filtered[1].id).toBe("3")
  })

  test("should filter publications by gene", () => {
    const searchParameters = { gene: "sadA" }
    const filtered = filterPublications(mockPublications, searchParameters)

    expect(filtered).toHaveLength(2)
    expect(filtered[0].id).toBe("1")
    expect(filtered[1].id).toBe("3")
  })

  test("should filter publications by multiple criteria", () => {
    const searchParameters = { author: "smith", gene: "sadA" }
    const filtered = filterPublications(mockPublications, searchParameters)

    expect(filtered).toHaveLength(2)
    expect(filtered[0].id).toBe("1")
    expect(filtered[1].id).toBe("3")
  })

  test("should return all publications when no search parameters match", () => {
    const searchParameters = { author: "nonexistent" }
    const filtered = filterPublications(mockPublications, searchParameters)

    expect(filtered).toHaveLength(0)
  })

  test("should return all publications when search parameters are empty", () => {
    const searchParameters = {}
    const filtered = filterPublications(mockPublications, searchParameters)

    expect(filtered).toHaveLength(3)
    expect(filtered).toEqual(mockPublications)
  })

  test("should handle case-insensitive search", () => {
    const searchParameters = { title: "CELL" }
    const filtered = filterPublications(mockPublications, searchParameters)

    expect(filtered).toHaveLength(2)
    expect(filtered[0].id).toBe("1")
    expect(filtered[1].id).toBe("2")
  })

  test("should handle partial matches", () => {
    const searchParameters = { title: "dictyo" }
    const filtered = filterPublications(mockPublications, searchParameters)

    expect(filtered).toHaveLength(2)
    expect(filtered[0].id).toBe("1")
  })
})
