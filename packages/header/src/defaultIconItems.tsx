/* eslint-disable dot-notation */
import { Add, Info, ArrowDownward as Download } from "@material-ui/icons"
import { v4 as uuid4 } from "uuid"
import { IconType } from "./types"

type IconItemProperty = {
  href: string
  title: string
  key: string
  Icon: IconType
}

const defaultIconItems: Array<IconItemProperty> = [
  {
    href: `${
      import.meta.env["VITE_APP_FRONTPAGE_URL"]
    }/community/citation/show`,
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
    href: `${import.meta.env["VITE_APP_FRONTPAGE_URL"]}/about/show`,
    title: "About dictybase",
    Icon: Info,
    key: uuid4(),
  },
]

export { defaultIconItems }
