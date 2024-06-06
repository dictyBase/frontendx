import { iconButtonPipe, createDefaultIconItems } from "@dictybase/header"
import { pipe } from "fp-ts/function"
import { Add, Info, ArrowDownward as Download } from "@material-ui/icons"
import { v4 as uuid4 } from "uuid"

const createAuthorizedIconItems = (frontPageUrl: string) => [
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
