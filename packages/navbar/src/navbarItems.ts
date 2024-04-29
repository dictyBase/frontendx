const createNavbarItems = (frontPageUrl: string, stockCenterUrl: string) => ({
  data: [
    {
      type: "genomes",
      id: "1",
      attributes: {
        display: "Genomes",
        items: [
          {
            label: "Dictyostelium discoideum AX4",
            link: "/",
          },
          {
            label: "Dictyostelium purpureum AX1",
            link: "http://genomes.dictybase.org/purpureum",
          },
          {
            label: "Dictyostelium fasciculatum SH3",
            link: "http://genomes.dictybase.org/fasciculatum",
          },
          {
            label: "Polysphondylium pallidum PN500",
            link: "http://genomes.dictybase.org/pallidum",
          },
        ],
      },
    },
    {
      type: "tools",
      id: "2",
      attributes: {
        display: "Tools",
        items: [
          {
            label: "Genome Browser",
            link: "http://dictybase.org/tools/jbrowse/?data=data/jbrowse/discoideum&loc=6:1..50011&tracks=reference,gene,transcript",
          },
          {
            label: "Dashboard",
            link: "/dictyaccess",
          },
        ],
      },
    },
    {
      type: "explore",
      id: "3",
      attributes: {
        display: "Explore",
        items: [
          {
            label: "Dicty Art",
            link: `${frontPageUrl}/explore/art/show`,
          },
          {
            label: "Gallery",
            link: `${frontPageUrl}/explore/gallery/show`,
          },
          {
            label: "Learn About Dicty",
            link: `${frontPageUrl}/explore/learn/show`,
          },
          {
            label: "Teaching Protocols",
            link: `${frontPageUrl}/explore/teach/show`,
          },
          {
            label: "Useful Links",
            link: `${frontPageUrl}/explore/links/show`,
          },
        ],
      },
    },
    {
      type: "research",
      id: "4",
      attributes: {
        display: "Research",
        items: [
          {
            label: "Techniques",
            link: `${frontPageUrl}/research/techniques/show`,
          },
          {
            label: "Anatomy Ontology",
            link: `${frontPageUrl}/research/ontology/show`,
          },
          {
            label: "Codon Bias Table",
            link: `${frontPageUrl}/research/codon/show`,
          },
          {
            label: "Nomenclature Guidelines",
            link: `${frontPageUrl}/research/nomenclature/show`,
          },
          {
            label: "Phenotyping",
            link: `${frontPageUrl}/research/phenotype/show`,
          },
          {
            label: "Axenic Strain History",
            link: `${frontPageUrl}/research/strain-history/show`,
          },
        ],
      },
    },
    {
      type: "dsc",
      id: "5",
      attributes: {
        display: "Dicty Stock Center",
        items: [
          {
            label: "Stock Center Home",
            link: `${stockCenterUrl}`,
          },
          {
            label: "Strain Catalog",
            link: `${stockCenterUrl}/strains`,
          },
          {
            label: "Plasmid Catalog",
            link: `${stockCenterUrl}/plasmids`,
          },
          {
            label: "Order Information",
            link: `${stockCenterUrl}/information/order/show`,
          },
          {
            label: "Deposit Information",
            link: `${stockCenterUrl}/information/deposit/show`,
          },
          {
            label: "Payment Information",
            link: `${stockCenterUrl}/information/payment/show`,
          },
          {
            label: "FAQ",
            link: `${stockCenterUrl}/information/faq/show`,
          },
          {
            label: "Standard Operating Procedures",
            link: "https://northwestern.box.com/s/p0f8m70whgiuib2u0wt8gtn497ncmq8i",
          },
        ],
      },
    },
    {
      type: "community",
      id: "6",
      attributes: {
        display: "Community",
        items: [
          {
            label: "Cite Us",
            link: `${frontPageUrl}/community/citation/show`,
          },
          {
            label: "Dicty Annual Conferences",
            link: `${frontPageUrl}/community/conference/show`,
          },
          {
            label: "Dicty Email Forum",
            link: `${frontPageUrl}/community/listserv/show`,
          },
          {
            label: "Dicty Labs",
            link: `${frontPageUrl}/community/labs/show`,
          },
          {
            label: "History",
            link: `${frontPageUrl}/community/history/show`,
          },
          {
            label: "Jobs",
            link: `${frontPageUrl}/community/jobs/show`,
          },
          {
            label: "Community Annotations",
            link: `${frontPageUrl}/community/annotations/show`,
          },
        ],
      },
    },
  ],
})

type Item = {
  label: string
  link: string
}

type NavbarItems = {
  data: Array<{
    type: string
    id: string
    attributes: {
      display: string
      items: Array<Item>
    }
  }>
}

/**
 * formatNavbarItems is a helper function to convert the links
 * under each header into the accepted navbar data format.
 */
const formatNavbarItems = (items: Array<Item>) =>
  items.map((c) => ({
    name: c.label,
    href: c.link,
  }))

/**
 * formatNavbarData converts the received navbar JSON data and
 * converts it into the dicty-navbar data format.
 */
const formatNavbarData = (json: NavbarItems) =>
  json.data.map((item) => ({
    dropdown: true,
    title: item.attributes.display,
    items: formatNavbarItems(item.attributes.items),
  }))

export type { NavbarItems }
export { createNavbarItems, formatNavbarData }
