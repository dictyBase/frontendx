const TEST_GENE = "DDB_G0269114"
const TEST_PUBLICATION_ID = "18550419"

const EXPECTED_REFERENCE = {
  related_genes: [
    { id: "DDB_G0281931", name: "DDB_G0281931" },
    { id: "DDB_G0288511", name: "sadA" },
    { id: "DDB_G0292322", name: "DDB_G0292322" },
    { id: "DDB_G0290965", name: "trafM" },
    { id: "DDB_G0282069", name: "slrA" },
    { id: "DDB_G0287363", name: "sibA" },
    { id: "DDB_G0283265", name: "mkkA" },
    { id: "DDB_G0268712", name: "DDB_G0268712" },
    { id: "DDB_G0267444", name: "phg1A" },
    { id: "DDB_G0267692", name: "DDB_G0267692" },
    { id: "DDB_G0280263", name: "DDB_G0280263" },
    { id: "DDB_G0267406", name: "lmpA" },
    { id: "DDB_G0277703", name: "aplF" },
    { id: "DDB_G0275267", name: "wrky1" },
    { id: "DDB_G0267400", name: "hspD" },
    { id: "DDB_G0269292", name: "sugt1" },
    { id: "DDB_G0267630", name: "kil1" },
  ],
  id: "18550419",
  doi: "10.1016/j.mib.2008.05.005",
  title: "Eat, kill or die: when amoeba meets bacteria.",
  journal: "Current opinion in microbiology",
  pub_date: "2008-06-10T00:00:00.000Z",
  volume: "11",
  pages: "271-276",
  pub_type: "Research Support, Non-U.S. Gov't",
  source: "MED",
  issue: "3",
  authors: [
    { last_name: "Cosson", rank: "0" },
    { last_name: "Soldati", rank: "1" },
  ],
}

test.beforeAll("Test Reference Page API", async ({ playwright }) => {
  const apiContext = await playwright.request.newContext()

  const request = await apiContext.post(
    GRAPHQL_ENDPOINT,
    listPublicationsWithGeneQueryData(TEST_GENE),
  )
  const { data: referenceData }: ListPublicationsWithGeneQueryResult =
    await request.json()

  expect(request.ok()).toBeTruthy()

  expect(referenceData?.listPublicationsWithGene).toContainEqual(
    expect.objectContaining(EXPECTED_REFERENCE),
  )
})

test.beforeEach(async ({ page }) => {
  await page.goto(`/gene/${TEST_GENE}/references/${TEST_PUBLICATION_ID}`)
})

test("", () => {})
