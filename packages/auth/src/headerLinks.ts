import { iconButtonPipe, defaultIconItems } from "@dictybase/header"
import { Add, Info, ArrowDownward as Download } from "@material-ui/icons"
import { v4 as uuid4 } from "uuid"

const authorizedIconItems = [
  {
    href: "/community/citation/show",
    title: "Cite Us",
    Icon: Add,
    key: uuid4(),
  },
  {
    href: "/downloads",
    title: "Downloads",
    Icon: Download,
    key: uuid4(),
  },
  {
    href: "/about/show",
    title: "About dictybase",
    Icon: Info,
    key: uuid4(),
  },
]

const defaultHeaderLinks = iconButtonPipe(defaultIconItems)
const authorizedHeaderLinks = iconButtonPipe(authorizedIconItems)

export { defaultHeaderLinks, authorizedHeaderLinks }
