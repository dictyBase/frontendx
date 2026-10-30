import { FC } from "react"
import { render, screen, waitFor } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"
import type { MockedResponse } from "@apollo/client/testing"
import { none, some } from "fp-ts/Option"
import type { Option } from "fp-ts/Option"
import { test, expect } from "vitest"
import {
  StrainListDocument,
  PlasmidListFilterDocument,
  StrainType,
  PlasmidType,
} from "dicty-graphql-schema"
import { useInitialSearchResults } from "../hooks/useInitialSearchResults"

const mockStrains = [
  {
    __typename: "Strain",
    id: "DBS0001",
    label: "axeA",
    summary: "Test strain",
    in_stock: true,
  },
]

const mockPlasmids = [
  {
    __typename: "Plasmid",
    id: "DBP0001",
    name: "pAXE1",
    summary: "Test plasmid",
    in_stock: true,
  },
]

type HookWrapperProperties = {
  entity: string
  group: Option<string>
  skip: boolean
}

const HookWrapper: FC<HookWrapperProperties> = ({ entity, group, skip }) => {
  const result = useInitialSearchResults({ entity, group, skip })
  return (
    <>
      <div data-testid="loading">{String(result.loading)}</div>
      <div data-testid="data">
        {result.data === undefined ? "undefined" : JSON.stringify(result.data)}
      </div>
      <div data-testid="error">{String(!!result.error)}</div>
    </>
  )
}

const renderHook = (
  entity: string,
  group: Option<string>,
  skip: boolean,
  mocks: ReadonlyArray<MockedResponse>,
) =>
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <HookWrapper entity={entity} group={group} skip={skip} />
    </MockedProvider>,
  )

test("returns strain results when entity is strain", async () => {
  const mocks = [
    {
      request: {
        query: StrainListDocument,
        variables: {
          cursor: 0,
          limit: 12,
          filter: { strain_type: StrainType.Regular },
        },
      },
      result: {
        data: {
          listStrains: {
            strains: mockStrains,
            nextCursor: 0,
          },
        },
      },
    },
  ]

  renderHook("strain", some("regular"), false, mocks)

  await waitFor(() => {
    expect(screen.getByTestId("loading")).toHaveTextContent("false")
  })

  expect(screen.getByTestId("data")).toHaveTextContent(
    JSON.stringify(mockStrains),
  )
})

test("returns plasmid results when entity is plasmid", async () => {
  const mocks = [
    {
      request: {
        query: PlasmidListFilterDocument,
        variables: {
          cursor: 0,
          limit: 12,
          filter: { plasmid_type: PlasmidType.Regular },
        },
      },
      result: {
        data: {
          listPlasmids: {
            plasmids: mockPlasmids,
            nextCursor: 0,
          },
        },
      },
    },
  ]

  renderHook("plasmid", some("regular"), false, mocks)

  await waitFor(() => {
    expect(screen.getByTestId("loading")).toHaveTextContent("false")
  })

  expect(screen.getByTestId("data")).toHaveTextContent(
    JSON.stringify(mockPlasmids),
  )
})

test("returns combined results when entity is all", async () => {
  const mocks = [
    {
      request: {
        query: StrainListDocument,
        variables: {
          cursor: 0,
          limit: 12,
          filter: { strain_type: StrainType.All },
        },
      },
      result: {
        data: {
          listStrains: {
            strains: mockStrains,
            nextCursor: 0,
          },
        },
      },
    },
    {
      request: {
        query: PlasmidListFilterDocument,
        variables: {
          cursor: 0,
          limit: 12,
          filter: { plasmid_type: PlasmidType.All },
        },
      },
      result: {
        data: {
          listPlasmids: {
            plasmids: mockPlasmids,
            nextCursor: 0,
          },
        },
      },
    },
  ]

  renderHook("all", some("all"), false, mocks)

  await waitFor(() => {
    expect(screen.getByTestId("loading")).toHaveTextContent("false")
  })

  const combinedResults = [...mockStrains, ...mockPlasmids]
  expect(screen.getByTestId("data")).toHaveTextContent(
    JSON.stringify(combinedResults),
  )
})

test("defaults to all type when group value is unknown for strains", async () => {
  const mocks = [
    {
      request: {
        query: StrainListDocument,
        variables: {
          cursor: 0,
          limit: 12,
          filter: { strain_type: StrainType.All },
        },
      },
      result: {
        data: {
          listStrains: {
            strains: mockStrains,
            nextCursor: 0,
          },
        },
      },
    },
  ]

  renderHook("strain", some("unknown-group-value"), false, mocks)

  await waitFor(() => {
    expect(screen.getByTestId("loading")).toHaveTextContent("false")
  })

  expect(screen.getByTestId("data")).toHaveTextContent(
    JSON.stringify(mockStrains),
  )
})

test("defaults to all type when group value is unknown for plasmids", async () => {
  const mocks = [
    {
      request: {
        query: PlasmidListFilterDocument,
        variables: {
          cursor: 0,
          limit: 12,
          filter: { plasmid_type: PlasmidType.All },
        },
      },
      result: {
        data: {
          listPlasmids: {
            plasmids: mockPlasmids,
            nextCursor: 0,
          },
        },
      },
    },
  ]

  renderHook("plasmid", some("unknown-group-value"), false, mocks)

  await waitFor(() => {
    expect(screen.getByTestId("loading")).toHaveTextContent("false")
  })

  expect(screen.getByTestId("data")).toHaveTextContent(
    JSON.stringify(mockPlasmids),
  )
})

test("skips fetching when skip is true", () => {
  renderHook("strain", some("regular"), true, [])

  expect(screen.getByTestId("data")).toHaveTextContent("undefined")
  expect(screen.getByTestId("loading")).toHaveTextContent("false")
})

test("returns undefined data when results are empty", async () => {
  const mocks = [
    {
      request: {
        query: StrainListDocument,
        variables: {
          cursor: 0,
          limit: 12,
          filter: { strain_type: StrainType.Regular },
        },
      },
      result: {
        data: {
          listStrains: {
            strains: [],
            nextCursor: 0,
          },
        },
      },
    },
  ]

  renderHook("strain", some("regular"), false, mocks)

  await waitFor(() => {
    expect(screen.getByTestId("loading")).toHaveTextContent("false")
  })

  expect(screen.getByTestId("data")).toHaveTextContent("undefined")
})

test("uses all type when group is none", async () => {
  const mocks = [
    {
      request: {
        query: StrainListDocument,
        variables: {
          cursor: 0,
          limit: 12,
          filter: { strain_type: StrainType.All },
        },
      },
      result: {
        data: {
          listStrains: {
            strains: mockStrains,
            nextCursor: 0,
          },
        },
      },
    },
  ]

  renderHook("strain", none, false, mocks)

  await waitFor(() => {
    expect(screen.getByTestId("loading")).toHaveTextContent("false")
  })

  expect(screen.getByTestId("data")).toHaveTextContent(
    JSON.stringify(mockStrains),
  )
})
