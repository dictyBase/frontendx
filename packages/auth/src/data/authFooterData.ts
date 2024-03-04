/* eslint-disable dot-notation */
const authFooterItems = [
  {
    url: `${
      import.meta.env["VITE_APP_FRONTPAGE_URL"]
    }/research/techniques/editable`,
    label: "Techniques",
  },
  {
    url: `${import.meta.env["VITE_APP_FRONTPAGE_URL"]}/research/teach/editable`,
    label: "Teaching Protocols",
  },
  {
    url: `${import.meta.env["VITE_APP_STOCKCENTER_URL"]}/stockcenter`,
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
    url: `${
      import.meta.env["VITE_APP_FRONTPAGE_URL"]
    }/community/conference/editable`,
    label: "Conference",
  },
  {
    url: `${import.meta.env["VITE_APP_FRONTPAGE_URL"]}/community/labs/editable`,
    label: "Labs",
  },
  {
    url: `${import.meta.env["VITE_APP_FRONTPAGE_URL"]}/about/editable`,
    label: "About",
  },
  {
    url: `${
      import.meta.env["VITE_APP_STOCKCENTER_URL"]
    }/stockcenter/contact/editable`,
    label: "Contact",
  },
]

export { authFooterItems }
