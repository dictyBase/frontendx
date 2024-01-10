import { Add, Info, ArrowDownward as Download } from "@material-ui/icons"
import { v4 as uuid4 } from "uuid"
import { IconType } from "./types"

type IconItemProperty = {
  href: string
  title: string
  key: string
  Icon: IconType
}

const iconItems: Array<IconItemProperty> = [
  {
    href: "/community/citation",
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
  { href: "/about", title: "About dictybase", Icon: Info, key: uuid4() },
]

export { iconItems }
