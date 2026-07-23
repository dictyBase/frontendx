import type { Page } from "@playwright/test"

const waitForImageLoad = () =>
  [...document.querySelectorAll("img")].every(
    (img) => img.complete && img.naturalHeight !== 0,
  )

const MOCK_PAPERS_XML = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/" version="2.0">
  <channel>
    <title>Dictyostelium Papers</title>
    <link>https://pubmed.ncbi.nlm.nih.gov/</link>
    <description>Mock PubMed RSS feed for testing</description>
    <item>
      <title>Stress, Sex, Cysts and Spores: Selection for Syngamy, Meiosis and Dormancy Under Resource Limitation in Eukaryotic Microbes</title>
      <link>https://pubmed.ncbi.nlm.nih.gov/42476553/</link>
      <description>In facultatively sexual species, which reproduce both sexually and clonally, sexual reproduction is often triggered by stress. There exists an extensive theoretical literature to explain this pattern, broadly relying on the fact that the benefits of sexual reproduction are highest when an organism is maladapted to its environment.</description>
      <date>2026-07-20</date>
      <dc:creator>George W A Constable</dc:creator>
      <dc:creator>Xiaoyuan Liu</dc:creator>
      <dc:source>Integrative and comparative biology</dc:source>
      <dc:identifier>pmid:42476553</dc:identifier>
      <dc:identifier>doi:10.1093/icb/icag118</dc:identifier>
    </item>
    <item>
      <title>Collective surfing of single cells on a chemo-attractant wave using multiscale Eulerian velocity vector field</title>
      <link>https://pubmed.ncbi.nlm.nih.gov/42471391/</link>
      <description>Wavelike motion mediated by chemotactic signaling occurs in various biological phenomena including neutrophil swarms, wound healing, and amoeba aggregates. However, the macroscopic transition from independent to collective cellular behavior remains unclear.</description>
      <date>2026-07-18</date>
      <dc:creator>Sulimon Sattari</dc:creator>
      <dc:creator>Md Motaleb Hossain</dc:creator>
      <dc:creator>Satoshi Sawai</dc:creator>
      <dc:source>Scientific reports</dc:source>
      <dc:identifier>pmid:42471391</dc:identifier>
      <dc:identifier>doi:10.1038/s41598-026-61774-2</dc:identifier>
    </item>
    <item>
      <title>IqgD is a Rac1-interacting IQGAP required for efficient growth of Dictyostelium discoideum on bacterial lawns</title>
      <link>https://pubmed.ncbi.nlm.nih.gov/42458551/</link>
      <description>Phagocytosis of surface-bound microbes is essential for host defence and environmental feeding, yet the mechanism by which macrophages remove surface-bound particles has only recently been described. This process involves the formation of an F-actin-rich, force-bearing ring around the surface-attached particle.</description>
      <date>2026-07-16</date>
      <dc:creator>Anja Cizmar</dc:creator>
      <dc:creator>Darija Putar</dc:creator>
      <dc:creator>Igor Weber</dc:creator>
      <dc:creator>Vedrana Filic</dc:creator>
      <dc:source>Cell communication and signaling</dc:source>
      <dc:identifier>pmid:42458551</dc:identifier>
      <dc:identifier>doi:10.1186/s12964-026-03074-w</dc:identifier>
    </item>
  </channel>
</rss>`

const mockPubMedFetch = async (page: Page) => {
  await page.route(
    "**/pubmed.ncbi.nlm.nih.gov/rss/search/**",
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/rss+xml",
        body: MOCK_PAPERS_XML,
      })
    },
  )
}

export { waitForImageLoad, mockPubMedFetch }
