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
            description:
              "The reference genome for Dictyostelium discoideum AX4 strain.",
          },
          {
            label: "Dictyostelium purpureum AX1",
            link: "http://genomes.dictybase.org/purpureum",
            description:
              "Genome sequence and annotation for Dictyostelium purpureum AX1.",
          },
          {
            label: "Dictyostelium fasciculatum SH3",
            link: "http://genomes.dictybase.org/fasciculatum",
            description: "Genomic data for Dictyostelium fasciculatum SH3.",
          },
          {
            label: "Polysphondylium pallidum PN500",
            link: "http://genomes.dictybase.org/pallidum",
            description: "Genome resources for Polysphondylium pallidum PN500.",
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
            description:
              "Interactive genome browser for visualizing genomic features and annotations.",
          },
          {
            label: "Dashboard",
            link: "/dictyaccess",
            description:
              "Access your personalized dashboard for managing your dictyBase experience.",
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
            description:
              "Explore artistic representations and visualizations of Dictyostelium.",
          },
          {
            label: "Gallery",
            link: `${frontPageUrl}/explore/gallery/show`,
            description:
              "Browse images and micrographs of Dictyostelium species.",
          },
          {
            label: "Learn About Dicty",
            link: `${frontPageUrl}/explore/learn/show`,
            description:
              "Educational resources about Dictyostelium biology and research.",
          },
          {
            label: "Teaching Protocols",
            link: `${frontPageUrl}/explore/teach/show`,
            description:
              "Laboratory protocols and educational materials for teaching with Dictyostelium.",
          },
          {
            label: "Useful Links",
            link: `${frontPageUrl}/explore/links/show`,
            description:
              "Curated collection of external resources and related links.",
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
            description:
              "Laboratory methods and experimental protocols for Dictyostelium research.",
          },
          {
            label: "Anatomy Ontology",
            link: `${frontPageUrl}/research/ontology/show`,
            description:
              "Structured vocabulary for Dictyostelium anatomical structures.",
          },
          {
            label: "Codon Bias Table",
            link: `${frontPageUrl}/research/codon/show`,
            description: "Codon usage statistics for Dictyostelium discoideum.",
          },
          {
            label: "Nomenclature Guidelines",
            link: `${frontPageUrl}/research/nomenclature/show`,
            description:
              "Standardized naming conventions for Dictyostelium genes and proteins.",
          },
          {
            label: "Phenotyping",
            link: `${frontPageUrl}/research/phenotype/show`,
            description:
              "Resources for phenotypic analysis and characterization.",
          },
          {
            label: "Axenic Strain History",
            link: `${frontPageUrl}/research/strain-history/show`,
            description:
              "Historical records and provenance of axenic laboratory strains.",
          },
          {
            label: "Track Maxima",
            link: `${frontPageUrl}/research/trackmaxima/show`,
            description:
              "Analysis of maximum movement tracks in Dictyostelium.",
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
            description:
              "Central hub for ordering Dictyostelium strains and plasmids.",
          },
          {
            label: "Strain Catalog",
            link: `${stockCenterUrl}/strains`,
            description:
              "Browse and order from the collection of available Dictyostelium strains.",
          },
          {
            label: "Plasmid Catalog",
            link: `${stockCenterUrl}/plasmids`,
            description:
              "Browse and order plasmids for Dictyostelium research.",
          },
          {
            label: "Order Information",
            link: `${stockCenterUrl}/information/order/show`,
            description: "Information about ordering procedures and policies.",
          },
          {
            label: "Deposit Information",
            link: `${stockCenterUrl}/information/deposit/show`,
            description:
              "Guidelines for depositing strains and plasmids to the stock center.",
          },
          {
            label: "Payment Information",
            link: `${stockCenterUrl}/information/payment/show`,
            description:
              "Payment methods and billing information for stock center orders.",
          },
          {
            label: "FAQ",
            link: `${stockCenterUrl}/information/faq/show`,
            description:
              "Frequently asked questions about the Dicty Stock Center.",
          },
          {
            label: "Standard Operating Procedures",
            link: "https://northwestern.box.com/s/p0f8m70whgiuib2u0wt8gtn497ncmq8i",
            description:
              "Detailed SOPs for maintaining and handling Dictyostelium stocks.",
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
            description:
              "How to cite dictyBase in your publications and research.",
          },
          {
            label: "Dicty Annual Conferences",
            link: `${frontPageUrl}/community/conference/show`,
            description:
              "Information about the annual Dictyostelium research conferences.",
          },
          {
            label: "Dicty Email Forum",
            link: `${frontPageUrl}/community/listserv/show`,
            description:
              "Join the Dictyostelium community mailing list for discussions and announcements.",
          },
          {
            label: "Dicty Labs",
            link: `${frontPageUrl}/community/labs/show`,
            description:
              "Directory of research laboratories studying Dictyostelium.",
          },
          {
            label: "History",
            link: `${frontPageUrl}/community/history/show`,
            description:
              "Historical overview of Dictyostelium research and dictyBase development.",
          },
          {
            label: "Jobs",
            link: `${frontPageUrl}/community/jobs/show`,
            description:
              "Career opportunities and job postings in the Dictyostelium community.",
          },
          {
            label: "Community Annotations",
            link: `${frontPageUrl}/community/annotations/show`,
            description:
              "Contribute to community-based gene and protein annotations.",
          },
        ],
      },
    },
  ],
})

type Item = {
  label: string
  link: string
  description?: string
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
    description: c.description,
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
