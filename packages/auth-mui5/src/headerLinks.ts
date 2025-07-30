import { iconButtonPipe, createDefaultIconItems } from "@dictybase/header-mui5"
import { pipe } from "fp-ts/function"
import { Add, Info, ArrowDownward as Download } from "@mui/icons-material"
import { v4 as uuid4 } from "uuid"

const createAuthorizedIconItems: typeof createDefaultIconItems = (
  frontPageUrl: string,
) => [
  {
    href: `${frontPageUrl}/community/citation/editable`,
    title: "Cite Us",
    Icon: Add,
    key: uuid4(),
  },
  {
    href: `${frontPageUrl}/downloads`,
    title: "Downloads",
    Icon: Download,
    key: uuid4(),
  },
  {
    href: `${frontPageUrl}/about/editable`,
    title: "About dictybase",
    Icon: Info,
    key: uuid4(),
  },
]
const createDefaultHeaderIcons = (frontPageUrl: string) =>
  pipe(frontPageUrl, createDefaultIconItems, iconButtonPipe)

const createAuthorizedHeaderIcons = (frontPageUrl: string) =>
  pipe(frontPageUrl, createAuthorizedIconItems, iconButtonPipe)

export { createDefaultHeaderIcons, createAuthorizedHeaderIcons }
