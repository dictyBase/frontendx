const createAuthNavbarItems = (
  frontPageUrl: string,
  stockCenterUrl: string,
) => ({
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
            link: `${frontPageUrl}/explore/art/editable`,
          },
          {
            label: "Gallery",
            link: `${frontPageUrl}/explore/gallery/editable`,
          },
          {
            label: "Learn About Dicty",
            link: `${frontPageUrl}/explore/learn/editable`,
          },
          {
            label: "Teaching Protocols",
            link: `${frontPageUrl}/explore/teach/editable`,
          },
          {
            label: "Useful Links",
            link: `${frontPageUrl}/explore/links/editable`,
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
            link: `${frontPageUrl}/research/techniques/editable`,
          },
          {
            label: "Anatomy Ontology",
            link: `${frontPageUrl}/research/ontology/editable`,
          },
          {
            label: "Codon Bias Table",
            link: `${frontPageUrl}/research/codon/editable`,
          },
          {
            label: "Nomenclature Guidelines",
            link: `${frontPageUrl}/research/nomenclature/editable`,
          },
          {
            label: "Phenotyping",
            link: `${frontPageUrl}/research/phenotype/editable`,
          },
          {
            label: "Axenic Strain History",
            link: `${frontPageUrl}/research/strain-history/editable`,
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
            link: `${stockCenterUrl}/information/order/editable`,
          },
          {
            label: "Deposit Information",
            link: `${stockCenterUrl}/information/deposit/editable`,
          },
          {
            label: "Payment Information",
            link: `${stockCenterUrl}/information/payment/editable`,
          },
          {
            label: "FAQ",
            link: `${stockCenterUrl}/information/faq/editable`,
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
            link: `${frontPageUrl}/community/citation/editable`,
          },
          {
            label: "Dicty Annual Conferences",
            link: `${frontPageUrl}/community/conference/editable`,
          },
          {
            label: "Dicty Email Forum",
            link: `${frontPageUrl}/community/listserv/editable`,
          },
          {
            label: "Dicty Labs",
            link: `${frontPageUrl}/community/labs/editable`,
          },
          {
            label: "History",
            link: `${frontPageUrl}/community/history/editable`,
          },
          {
            label: "Jobs",
            link: `${frontPageUrl}/community/jobs/editable`,
          },
          {
            label: "Community Annotations",
            link: `${frontPageUrl}/community/annotations/editable`,
          },
        ],
      },
    },
  ],
})

export { createAuthNavbarItems }
