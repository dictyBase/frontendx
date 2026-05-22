/* eslint-disable unicorn/prevent-abbreviations */
import { vi, test, expect } from "vitest"
import { createMemoryRouter, RouterProvider } from "react-router-dom"
import { render } from "@testing-library/react"
import { SearchPhenotypeList } from "../catalog/SearchPhenotypeList"
import { strainWithPhenotype } from "../mocks/mockStrain"

const mockLoadMore = vi.fn()

vi.mock("@dictybase/hook", () => ({
  useIntersectionObserver: vi.fn((params: any) => {
    params.onIntersection()
  }),
}))

const Wrapper = () => {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: (
          <SearchPhenotypeList
            data={[strainWithPhenotype]}
            hasMore
            isLoadingMore={false}
            loadMore={mockLoadMore}
            totalCount={10}
          />
        ),
      },
    ],
    {
      initialEntries: ["/"],
    },
  )

  return <RouterProvider router={router} />
}
test("When the bottom of the list is scrolled into view, loadMore() is called if hasMore is true", async () => {
  render(<Wrapper />)
  expect(mockLoadMore).toHaveBeenCalledOnce()
})
