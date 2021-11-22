import React from "react"
import { render, screen } from "@testing-library/react"
import PhenotypesContainer from "./PhenotypesContainer"
import { MockedProvider } from "@apollo/client/testing"
import { GeneDocument } from "dicty-graphql-schema"
import mockGraphQLData from "common/mocks/mockGraphQLData"

const gene = "sadA"
const pathname = `gene/${gene}/phenotypes`
const mocks = [
  {
    request: {
      query: GeneDocument,
      variables: {
        gene: gene,
      },
    },
    result: mockGraphQLData,
  },
]

jest.mock("react-router-dom", () => {
  const useParams = () => ({ gene })
  return {
    useParams,
    useLocation: () => ({ pathname }),
  }
})

describe("features/Phenotypes/PhenotypesContainer", () => {
  it("should render phenotypes page", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PhenotypesContainer />
      </MockedProvider>,
    )

    expect(screen.getByText(`Gene Phenotypes for ${gene}`)).toBeInTheDocument()
  })
})
