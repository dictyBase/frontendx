import { Box } from "@material-ui/core"
import { pipe } from "fp-ts/function"
import { map as Omap, getOrElse } from "fp-ts/Option"
import { fromChildren, composeChildren, Comp } from "@dictybase/functional"
import { LinksContainer } from "../components/LinksContainer"

type LinksProperties = { links: Array<Comp> }

const linksContainerWrapper = (children: Comp) => (
  <LinksContainer>{children}</LinksContainer>
)

const Links = ({ links }: LinksProperties) =>
  pipe(
    links,
    fromChildren,
    composeChildren,
    Omap(linksContainerWrapper),
    getOrElse(() => <Box>error in rendering</Box>),
  )

export { Links }
