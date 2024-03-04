/* eslint-disable dot-notation */
import { FooterItem } from "../types"

export const footerData: Array<FooterItem> = [
  {
    url: `${
      import.meta.env["VITE_APP_FRONTPAGE_URL"]
    }/research/techniques/show`,
    label: "Techniques",
  },
  {
    url: `${import.meta.env["VITE_APP_FRONTPAGE_URL"]}/research/teach/show`,
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
    }/community/conference/show`,
    label: "Conference",
  },
  {
    url: `${import.meta.env["VITE_APP_FRONTPAGE_URL"]}/community/labs/show`,
    label: "Labs",
  },
  {
    url: `${import.meta.env["VITE_APP_FRONTPAGE_URL"]}/about/show`,
    label: "About",
  },
  {
    url: `${
      import.meta.env["VITE_APP_STOCKCENTER_URL"]
    }/stockcenter/contact/show`,
    label: "Contact",
  },
]
