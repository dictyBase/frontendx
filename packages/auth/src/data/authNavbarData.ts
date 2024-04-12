/* eslint-disable dot-notation */
const authNavbarItems = {
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
            link: `${
              import.meta.env["VITE_APP_FRONTPAGE_URL"]
            }/explore/art/editable`,
          },
          {
            label: "Gallery",
            link: `${
              import.meta.env["VITE_APP_FRONTPAGE_URL"]
            }/explore/gallery/editable`,
          },
          {
            label: "Learn About Dicty",
            link: `${
              import.meta.env["VITE_APP_FRONTPAGE_URL"]
            }/explore/learn/editable`,
          },
          {
            label: "Teaching Protocols",
            link: `${
              import.meta.env["VITE_APP_FRONTPAGE_URL"]
            }/explore/teach/editable`,
          },
          {
            label: "Useful Links",
            link: `${
              import.meta.env["VITE_APP_FRONTPAGE_URL"]
            }/explore/links/editable`,
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
            link: `${
              import.meta.env["VITE_APP_FRONTPAGE_URL"]
            }/research/techniques/editable`,
          },
          {
            label: "Anatomy Ontology",
            link: `${
              import.meta.env["VITE_APP_FRONTPAGE_URL"]
            }/research/ontology/editable`,
          },
          {
            label: "Codon Bias Table",
            link: `${
              import.meta.env["VITE_APP_FRONTPAGE_URL"]
            }/research/codon/editable`,
          },
          {
            label: "Nomenclature Guidelines",
            link: `${
              import.meta.env["VITE_APP_FRONTPAGE_URL"]
            }/research/nomenclature/editable`,
          },
          {
            label: "Phenotyping",
            link: `${
              import.meta.env["VITE_APP_FRONTPAGE_URL"]
            }/research/phenotype/editable`,
          },
          {
            label: "Axenic Strain History",
            link: `${
              import.meta.env["VITE_APP_FRONTPAGE_URL"]
            }/research/strain-history/editable`,
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
            link: `${import.meta.env["VITE_APP_STOCKCENTER_URL"]}`,
          },
          {
            label: "Strain Catalog",
            link: `${import.meta.env["VITE_APP_STOCKCENTER_URL"]}/strains`,
          },
          {
            label: "Plasmid Catalog",
            link: `${import.meta.env["VITE_APP_STOCKCENTER_URL"]}/plasmids`,
          },
          {
            label: "Order Information",
            link: `${
              import.meta.env["VITE_APP_STOCKCENTER_URL"]
            }/information/order/editable`,
          },
          {
            label: "Deposit Information",
            link: `${
              import.meta.env["VITE_APP_STOCKCENTER_URL"]
            }/information/deposit/editable`,
          },
          {
            label: "Payment Information",
            link: `${
              import.meta.env["VITE_APP_STOCKCENTER_URL"]
            }/information/payment/editable`,
          },
          {
            label: "FAQ",
            link: `${
              import.meta.env["VITE_APP_STOCKCENTER_URL"]
            }/information/faq/editable`,
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
            link: `${
              import.meta.env["VITE_APP_FRONTPAGE_URL"]
            }/community/citation/editable`,
          },
          {
            label: "Dicty Annual Conferences",
            link: `${
              import.meta.env["VITE_APP_FRONTPAGE_URL"]
            }/community/conference/editable`,
          },
          {
            label: "Dicty Email Forum",
            link: `${
              import.meta.env["VITE_APP_FRONTPAGE_URL"]
            }/community/listserv/editable`,
          },
          {
            label: "Dicty Labs",
            link: `${
              import.meta.env["VITE_APP_FRONTPAGE_URL"]
            }/community/labs/editable`,
          },
          {
            label: "History",
            link: `${
              import.meta.env["VITE_APP_FRONTPAGE_URL"]
            }/community/history/editable`,
          },
          {
            label: "Jobs",
            link: `${
              import.meta.env["VITE_APP_FRONTPAGE_URL"]
            }/community/jobs/editable`,
          },
          {
            label: "Community Annotations",
            link: `${
              import.meta.env["VITE_APP_FRONTPAGE_URL"]
            }/community/annotations/editable`,
          },
        ],
      },
    },
  ],
}

export { authNavbarItems }
