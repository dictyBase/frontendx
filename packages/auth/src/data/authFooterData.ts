type CreateFooterItemsProperties = {
  frontPageUrl: string
  stockCenterUrl: string
}
const createAuthFooterItems = ({
  frontPageUrl,
  stockCenterUrl,
}: CreateFooterItemsProperties) => [
  {
    url: `${frontPageUrl}/research/techniques/editable`,
    label: "Techniques",
  },
  {
    url: `${frontPageUrl}/research/teach/editable`,
    label: "Teaching Protocols",
  },
  {
    url: `${stockCenterUrl}`,
    label: "Dicty Stock Center",
  },
  {
    url: "http://dictybase.org/tools/jbrowse/?data=data%2Fjbrowse%2Fdiscoideum&loc=6%3A1..50022&tracks=reference%2Cgene%2Ctranscript&highlight=",
    label: "Genome Browser",
  },
  {
    url: "/dictyaccess",
    label: "DictyAccess",
  },
  {
    url: `${frontPageUrl}/community/conference/editable`,
    label: "Conference",
  },
  {
    url: `${frontPageUrl}/community/labs/editable`,
    label: "Labs",
  },
  {
    url: `${frontPageUrl}/about/editable`,
    label: "About",
  },
  {
    url: `${stockCenterUrl}/contact/editable`,
    label: "Contact",
  },
]

const createFooterItems = ({
  frontPageUrl,
  stockCenterUrl,
}: CreateFooterItemsProperties) => [
  {
    url: `${frontPageUrl}/research/techniques/show`,
    label: "Techniques",
  },
  {
    url: `${frontPageUrl}/research/teach/show`,
    label: "Teaching Protocols",
  },
  {
    url: `${stockCenterUrl}`,
    label: "Dicty Stock Center",
  },
  {
    url: "http://dictybase.org/tools/jbrowse/?data=data%2Fjbrowse%2Fdiscoideum&loc=6%3A1..50022&tracks=reference%2Cgene%2Ctranscript&highlight=",
    label: "Genome Browser",
  },
  {
    url: "/dictyaccess",
    label: "DictyAccess",
  },
  {
    url: `${frontPageUrl}/community/conference/show`,
    label: "Conference",
  },
  {
    url: `${frontPageUrl}/community/labs/show`,
    label: "Labs",
  },
  {
    url: `${frontPageUrl}/about/show`,
    label: "About",
  },
  {
    url: `${stockCenterUrl}/contact/show`,
    label: "Contact",
  },
]

export { createAuthFooterItems, createFooterItems }
