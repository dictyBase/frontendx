import { test, expect } from "@playwright/test"
import { PublicationQueryResult } from "dicty-graphql-schema"
import { publicationQueryData } from "./utils/gqlRequestData"

const GRAPHQL_ENDPOINT = `${process.env.VITE_GRAPHQL_SERVER}/graphql`
const TEST_PUBLICATION = "26088819"

const EXPECTED_PUBLICATION = {
  id: "26088819",
  doi: "10.1002/dvg.22867",
  title:
    "dictyBase 2015: Expanding data and annotations in a new software environment.",
  abstract:
    "dictyBase is the model organism database for the social amoeba Dictyostelium discoideum and related species. The primary mission of dictyBase is to provide the biomedical research community with well-integrated high quality data, and tools that enable original research. Data presented at dictyBase is obtained from sequencing centers, groups performing high throughput experiments such as large-scale mutagenesis studies, and RNAseq data, as well as a growing number of manually added functional gene annotations from the published literature, including Gene Ontology, strain, and phenotype annotations. Through the Dicty Stock Center we provide the community with an impressive amount of annotated strains and plasmids. Recently, dictyBase accomplished a major overhaul to adapt an outdated infrastructure to the current technological advances, thus facilitating the implementation of innovative tools and comparative genomics. It also provides new strategies for high quality annotations that enable bench researchers to benefit from the rapidly increasing volume of available data. dictyBase is highly responsive to its users needs, building a successful relationship that capitalizes on the vast efforts of the Dictyostelium research community. dictyBase has become the trusted data resource for Dictyostelium investigators, other investigators or organizations seeking information about Dictyostelium, as well as educators who use this model system.",
  journal: "Genesis (New York, N.Y. : 2000)",
  pub_date: "2015-07-08T00:00:00.000Z",
  pages: "523-534",
  issue: "8",
  volume: "53",
  authors: [
    { initials: "S", last_name: "Basu" },
    { initials: "P", last_name: "Fey" },
    { initials: "D", last_name: "Jimenez-Morales" },
    { initials: "RJ", last_name: "Dodson" },
    { initials: "RL", last_name: "Chisholm" },
  ],
}

test.beforeAll("Test Publication Page API", async ({ playwright }) => {
  const apiContext = await playwright.request.newContext()

  const publication = await apiContext.post(
    GRAPHQL_ENDPOINT,
    publicationQueryData(TEST_PUBLICATION),
  )
  const { data: publicationData }: PublicationQueryResult =
    await publication.json()
  expect(publication.ok()).toBeTruthy()

  expect(publicationData?.publication).toEqual(
    expect.objectContaining(EXPECTED_PUBLICATION),
  )
})

test.beforeEach(async ({ page }) => {
  await page.goto(`/publication/${TEST_PUBLICATION}`)
})

test("Displays Publication Data", async ({ page }) => {
  await expect(page.getByText(EXPECTED_PUBLICATION.title)).toBeVisible()
  await expect(page.getByText(EXPECTED_PUBLICATION.abstract)).toBeVisible()
})
