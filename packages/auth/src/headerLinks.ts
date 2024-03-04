/* eslint-disable dot-notation */
import { iconButtonPipe, defaultIconItems } from "@dictybase/header"
import { Add, Info, ArrowDownward as Download } from "@material-ui/icons"
import { v4 as uuid4 } from "uuid"

const authorizedIconItems = [
  {
    href: `${
      import.meta.env["VITE_APP_FRONTPAGE_URL"]
    }/community/citation/editable`,
    title: "Cite Us",
    Icon: Add,
    key: uuid4(),
  },
  {
    href: `${import.meta.env["VITE_APP_FRONTPAGE_URL"]}/downloads`,
    title: "Downloads",
    Icon: Download,
    key: uuid4(),
  },
  {
    href: `${import.meta.env["VITE_APP_FRONTPAGE_URL"]}/about/editable`,
    title: "About dictybase",
    Icon: Info,
    key: uuid4(),
  },
]

const defaultHeaderLinks = iconButtonPipe(defaultIconItems)
const authorizedHeaderLinks = iconButtonPipe(authorizedIconItems)

export { defaultHeaderLinks, authorizedHeaderLinks }
